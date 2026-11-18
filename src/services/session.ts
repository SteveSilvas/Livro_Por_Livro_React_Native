import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Persistência do JWT entre sessões do app. O token é gravado no
 * AsyncStorage para que o usuário continue logado após reabrir o app.
 */
const TOKEN_KEY = '@books-barter/token';

export async function saveToken(token: string): Promise<void> {
    try {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch {
        // Falha de armazenamento não deve impedir o uso do app na sessão atual.
    }
}

export async function loadToken(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

export async function clearToken(): Promise<void> {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
    } catch {
        // Ignora falhas de limpeza; o token em memória já foi descartado.
    }
}
