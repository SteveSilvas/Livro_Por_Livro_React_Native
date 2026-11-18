import {
    CategoryType,
    CreateCategoryDTO,
    UpdateCategoryDTO,
} from '../../@Types/api';
import { api } from './client';

/** GET /categories — lista todas as categorias. */
export function listCategories(): Promise<CategoryType[]> {
    return api.get<CategoryType[]>('/categories').then((res) => res.data);
}

/** GET /categories/:uuid — detalhe de uma categoria. */
export function getCategory(uuid: string): Promise<CategoryType> {
    return api
        .get<CategoryType>(`/categories/${uuid}`)
        .then((res) => res.data);
}

/** POST /categories — cria uma categoria. */
export function createCategory(
    data: CreateCategoryDTO,
): Promise<CategoryType> {
    return api.post<CategoryType>('/categories', data).then((res) => res.data);
}

/** PUT /categories/:uuid — atualiza uma categoria. */
export function updateCategory(
    uuid: string,
    data: UpdateCategoryDTO,
): Promise<CategoryType> {
    return api
        .put<CategoryType>(`/categories/${uuid}`, data)
        .then((res) => res.data);
}

/** DELETE /categories/:uuid — remove uma categoria. */
export function deleteCategory(uuid: string): Promise<void> {
    return api.delete(`/categories/${uuid}`).then(() => undefined);
}
