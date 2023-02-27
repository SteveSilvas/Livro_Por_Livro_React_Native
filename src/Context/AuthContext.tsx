import React, { createContext, useState, ReactNode } from 'react';
import { LoginType } from '../@Types/LoginType';

interface AuthContextProps {
    auth: LoginType;
    setAuth: React.Dispatch<React.SetStateAction<LoginType>>;
}

const loginNull: LoginType = { Email: "", Pass: "", LoggedIn: false };

export const AuthContext = createContext<AuthContextProps>({ auth: loginNull, setAuth: () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<LoginType>(loginNull);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

