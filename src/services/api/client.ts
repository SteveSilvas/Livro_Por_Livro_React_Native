import axios, { AxiosError, AxiosInstance } from 'axios';

/**
 * URL base da API. Pode ser configurada em tempo de build pela variável
 * `EXPO_PUBLIC_API_URL` (padrão do Expo para expor variáveis ao bundle).
 */
const DEFAULT_API_URL = 'http://127.0.0.1:3000';

export const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL;

/** Erro normalizado com a mensagem e o status devolvidos pela API. */
export class ApiError extends Error {
    public readonly status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

/**
 * Token JWT atual. Fica em memória e é injetado em toda requisição pelo
 * interceptor. O `AuthContext` é quem define/limpa esse valor.
 */
let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
    authToken = token;
}

export function getAuthToken(): string | null {
    return authToken;
}

/** Converte qualquer erro do axios no `ApiError` padronizado da aplicação. */
function toApiError(error: AxiosError): ApiError {
    const body = error.response?.data as { message?: string } | undefined;
    const status = error.response?.status ?? 0;
    const message =
        body?.message ??
        (status === 0
            ? 'Não foi possível conectar à API. Verifique sua conexão.'
            : `Erro inesperado (HTTP ${status}).`);
    return new ApiError(message, status);
}

export const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => Promise.reject(toApiError(error)),
);
