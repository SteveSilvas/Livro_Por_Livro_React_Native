import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from 'react';
import { LoginType, UpdateUserDTO, UserType } from '../@Types/api';
import { setAuthToken } from '../services/api/client';
import * as usersApi from '../services/api/users';
import { clearToken, loadToken, saveToken } from '../services/session';

interface AuthContextData {
    /** Usuário autenticado (perfil próprio), ou `null` quando deslogado. */
    user: UserType | null;
    /** JWT atual, ou `null` quando deslogado. */
    token: string | null;
    isLoggedIn: boolean;
    /** Indica uma operação de autenticação em andamento. */
    loading: boolean;
    /** `true` enquanto a sessão persistida é restaurada na abertura do app. */
    restoring: boolean;
    login: (data: LoginType) => Promise<void>;
    loginWithGoogle: (idToken: string) => Promise<void>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
    updateProfile: (data: UpdateUserDTO) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [restoring, setRestoring] = useState<boolean>(true);

    // Mantém o token do cliente HTTP sincronizado com o estado de auth.
    useEffect(() => {
        setAuthToken(token);
    }, [token]);

    // Restaura a sessão persistida na abertura do app.
    useEffect(() => {
        let active = true;

        (async () => {
            const stored = await loadToken();
            if (!active || !stored) {
                if (active) {
                    setRestoring(false);
                }
                return;
            }

            setAuthToken(stored);
            try {
                const profile = await usersApi.getMe();
                if (active) {
                    setToken(stored);
                    setUser(profile);
                }
            } catch {
                // Token expirado/inválido: descarta a sessão salva.
                setAuthToken(null);
                await clearToken();
            } finally {
                if (active) {
                    setRestoring(false);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, []);

    const applySession = useCallback(async (jwt: string): Promise<void> => {
        setAuthToken(jwt);
        try {
            const profile = await usersApi.getMe();
            setToken(jwt);
            setUser(profile);
            await saveToken(jwt);
        } catch (error) {
            // Não deixa o cliente HTTP com um token de uma sessão incompleta.
            setAuthToken(null);
            throw error;
        }
    }, []);

    const login = useCallback(
        async (data: LoginType): Promise<void> => {
            setLoading(true);
            try {
                const response = await usersApi.login(data);
                await applySession(response.token);
            } finally {
                setLoading(false);
            }
        },
        [applySession],
    );

    const loginWithGoogle = useCallback(
        async (idToken: string): Promise<void> => {
            setLoading(true);
            try {
                const response = await usersApi.loginWithGoogle({ idToken });
                await applySession(response.token);
            } finally {
                setLoading(false);
            }
        },
        [applySession],
    );

    const logout = useCallback((): void => {
        setToken(null);
        setUser(null);
        setAuthToken(null);
        void clearToken();
    }, []);

    const refreshProfile = useCallback(async (): Promise<void> => {
        if (!token) {
            return;
        }
        const profile = await usersApi.getMe();
        setUser(profile);
    }, [token]);

    const updateProfile = useCallback(
        async (data: UpdateUserDTO): Promise<void> => {
            const profile = await usersApi.updateMe(data);
            setUser(profile);
        },
        [],
    );

    const value = useMemo<AuthContextData>(
        () => ({
            user,
            token,
            isLoggedIn: Boolean(token),
            loading,
            restoring,
            login,
            loginWithGoogle,
            logout,
            refreshProfile,
            updateProfile,
        }),
        [
            user,
            token,
            loading,
            restoring,
            login,
            loginWithGoogle,
            logout,
            refreshProfile,
            updateProfile,
        ],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

/** Hook de conveniência para consumir o contexto de autenticação. */
export function useAuth(): AuthContextData {
    return useContext(AuthContext);
}

