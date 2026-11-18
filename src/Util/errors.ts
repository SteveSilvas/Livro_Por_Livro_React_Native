import { ApiError } from '../services/api/client';

/** Extrai uma mensagem amigável de qualquer erro (ApiError ou desconhecido). */
export function getErrorMessage(
    error: unknown,
    fallback = 'Ocorreu um erro. Tente novamente.',
): string {
    if (error instanceof ApiError) {
        return error.message;
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return fallback;
}
