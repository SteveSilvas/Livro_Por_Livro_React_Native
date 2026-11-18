/**
 * Declarações de ambiente para variáveis expostas pelo Expo/Metro no bundle.
 * As variáveis `EXPO_PUBLIC_*` são substituídas em tempo de build.
 */
declare const process: {
    env: {
        EXPO_PUBLIC_API_URL?: string;
        [key: string]: string | undefined;
    };
};
