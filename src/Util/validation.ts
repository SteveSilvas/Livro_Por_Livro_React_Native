/**
 * Validações de formulário no cliente, espelhando as regras da API
 * (Books_Barter_Node/src/utils/validation.ts) para dar feedback imediato
 * sem depender de uma ida ao servidor.
 */

// Mesmo formato aceito pelo backend.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

/** Nome não vazio. */
export function isValidName(name: string): boolean {
    return name.trim().length > 0;
}

/** E-mail em formato válido. */
export function isValidEmail(email: string): boolean {
    return EMAIL_REGEX.test(email.trim());
}

/** Senha com o comprimento mínimo exigido pela aplicação. */
export function isValidPassword(pass: string): boolean {
    return pass.length >= MIN_PASSWORD_LENGTH;
}

/** Data no formato AAAA-MM-DD que representa uma data real e não futura. */
export function isValidBirthDate(value: string): boolean {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
    if (!match) {
        return false;
    }
    const [, year, month, day] = match;
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    if (Number.isNaN(date.getTime())) {
        return false;
    }
    // Rejeita datas "normalizadas" pelo JS (ex.: 2024-02-31 -> 2024-03-02).
    const normalized = date.toISOString().slice(0, 10);
    if (normalized !== `${year}-${month}-${day}`) {
        return false;
    }
    return date.getTime() <= Date.now();
}

/** Converte uma data AAAA-MM-DD para ISO, ou `null` quando vazia/inválida. */
export function toIsoDate(value: string): string | null {
    if (!isValidBirthDate(value)) {
        return null;
    }
    return new Date(`${value.trim()}T00:00:00.000Z`).toISOString();
}

/** Data AAAA-MM-DD a partir de um ISO vindo da API (para preencher o form). */
export function toDateInputValue(value: string | Date | null | undefined): string {
    if (!value) {
        return '';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return '';
    }
    return date.toISOString().slice(0, 10);
}
