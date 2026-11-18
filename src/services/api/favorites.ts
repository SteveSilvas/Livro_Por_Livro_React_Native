import {
    FavoriteBookType,
    ListParams,
    Paged,
    PublicUserType,
} from '../../@Types/api';
import { api } from './client';

/** POST /users/:uuid/favorite — favorita a estante do usuário. */
export function favoriteShelf(uuid: string): Promise<void> {
    return api.post(`/users/${uuid}/favorite`).then(() => undefined);
}

/** DELETE /users/:uuid/favorite — desfavorita a estante do usuário. */
export function unfavoriteShelf(uuid: string): Promise<void> {
    return api.delete(`/users/${uuid}/favorite`).then(() => undefined);
}

/** POST /books/:uuid/favorite — favorita o livro. */
export function favoriteBook(uuid: string): Promise<void> {
    return api.post(`/books/${uuid}/favorite`).then(() => undefined);
}

/** DELETE /books/:uuid/favorite — desfavorita o livro. */
export function unfavoriteBook(uuid: string): Promise<void> {
    return api.delete(`/books/${uuid}/favorite`).then(() => undefined);
}

/** GET /users/me/favorites/shelves — estantes favoritadas (paginado). */
export function listFavoriteShelves(
    params: ListParams = {},
): Promise<Paged<PublicUserType>> {
    return api
        .get<Paged<PublicUserType>>('/users/me/favorites/shelves', { params })
        .then((res) => res.data);
}

/** GET /users/me/favorites/books — livros favoritados (paginado). */
export function listFavoriteBooks(
    params: ListParams = {},
): Promise<Paged<FavoriteBookType>> {
    return api
        .get<Paged<FavoriteBookType>>('/users/me/favorites/books', { params })
        .then((res) => res.data);
}
