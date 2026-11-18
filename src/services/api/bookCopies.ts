import {
    BookCopyType,
    CreateBookCopyDTO,
    UpdateBookCopyDTO,
} from '../../@Types/api';
import { api } from './client';

/** GET /book-copies — lista todos os exemplares. */
export function listBookCopies(): Promise<BookCopyType[]> {
    return api.get<BookCopyType[]>('/book-copies').then((res) => res.data);
}

/** GET /book-copies/:uuid — detalhe de um exemplar. */
export function getBookCopy(uuid: string): Promise<BookCopyType> {
    return api
        .get<BookCopyType>(`/book-copies/${uuid}`)
        .then((res) => res.data);
}

/** POST /book-copies — cria um exemplar. */
export function createBookCopy(
    data: CreateBookCopyDTO,
): Promise<BookCopyType> {
    return api
        .post<BookCopyType>('/book-copies', data)
        .then((res) => res.data);
}

/** PUT /book-copies/:uuid — atualiza um exemplar. */
export function updateBookCopy(
    uuid: string,
    data: UpdateBookCopyDTO,
): Promise<BookCopyType> {
    return api
        .put<BookCopyType>(`/book-copies/${uuid}`, data)
        .then((res) => res.data);
}

/** DELETE /book-copies/:uuid — remove um exemplar. */
export function deleteBookCopy(uuid: string): Promise<void> {
    return api.delete(`/book-copies/${uuid}`).then(() => undefined);
}
