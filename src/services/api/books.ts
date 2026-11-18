import {
    BookQuery,
    BookType,
    CreateBookDTO,
    Paged,
    UpdateBookDTO,
} from '../../@Types/api';
import { api } from './client';

/** GET /books — catálogo público (busca, filtros, ordenação e paginação). */
export function listBooks(query: BookQuery = {}): Promise<Paged<BookType>> {
    return api
        .get<Paged<BookType>>('/books', { params: query })
        .then((res) => res.data);
}

/** GET /books/:uuid — detalhe de um livro. */
export function getBook(uuid: string): Promise<BookType> {
    return api.get<BookType>(`/books/${uuid}`).then((res) => res.data);
}

/** GET /users/me/books — estante do próprio usuário (todos os status). */
export function listMyBooks(query: BookQuery = {}): Promise<Paged<BookType>> {
    return api
        .get<Paged<BookType>>('/users/me/books', { params: query })
        .then((res) => res.data);
}

/** GET /users/:uuid/books — estante pública de outro usuário. */
export function listBooksByOwner(
    uuid: string,
    query: BookQuery = {},
): Promise<Paged<BookType>> {
    return api
        .get<Paged<BookType>>(`/users/${uuid}/books`, { params: query })
        .then((res) => res.data);
}

/** POST /books — cadastra um livro na própria estante. */
export function createBook(data: CreateBookDTO): Promise<BookType> {
    return api.post<BookType>('/books', data).then((res) => res.data);
}

/** PUT /books/:uuid — atualiza um livro (só o dono). */
export function updateBook(
    uuid: string,
    data: UpdateBookDTO,
): Promise<BookType> {
    return api.put<BookType>(`/books/${uuid}`, data).then((res) => res.data);
}

/** DELETE /books/:uuid — remove um livro (só o dono). */
export function deleteBook(uuid: string): Promise<void> {
    return api.delete(`/books/${uuid}`).then(() => undefined);
}
