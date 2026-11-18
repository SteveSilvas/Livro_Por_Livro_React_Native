/**
 * Tipos que espelham os DTOs da API (Books_Barter_Node / escambo-literario-api).
 * Mantidos em um único módulo para servir de contrato entre os serviços e as telas.
 */

/* ------------------------------------------------------------------ */
/* Envelope de paginação                                               */
/* ------------------------------------------------------------------ */

export interface PageMeta {
    limit: number;
    offset: number;
    total: number;
    count: number;
    hasMore: boolean;
}

/** Envelope padrão das listagens paginadas. */
export interface Paged<T> {
    data: T[];
    meta: PageMeta;
}

/** Parâmetros de paginação/ordenação aceitos pelas listagens. */
export interface ListParams {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

/* ------------------------------------------------------------------ */
/* Erro da API                                                         */
/* ------------------------------------------------------------------ */

/** Corpo devolvido pelo errorHandler do backend. */
export interface ApiErrorBody {
    status: number;
    message: string;
}

/* ------------------------------------------------------------------ */
/* Status                                                              */
/* ------------------------------------------------------------------ */

export interface StatusResponse {
    status: string;
    message: string;
}

/* ------------------------------------------------------------------ */
/* Usuários e autenticação                                             */
/* ------------------------------------------------------------------ */

export type AuthProvider = 'local' | 'google';

/** Perfil do próprio usuário autenticado. */
export interface UserType {
    Uuid: string;
    Name: string;
    Birth: Date | null;
    Email: string;
    Provider: AuthProvider;
    createdAt?: Date;
    updatedAt?: Date;
}

/** Perfil público de terceiros (sem e-mail). */
export interface PublicUserType {
    Uuid: string;
    Name: string;
    Provider: AuthProvider;
    followersCount?: number;
    followingCount?: number;
}

export interface CreateUserDTO {
    Name: string;
    Birth: string | Date | null;
    Email: string;
    Pass: string;
}

export interface UpdateUserDTO {
    Name?: string;
    Birth?: string | Date | null;
    Email?: string;
    Pass?: string;
    CurrentPass?: string;
}

export interface LoginType {
    Email: string;
    Pass: string;
}

export interface GoogleLoginType {
    idToken: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    data: {
        Uuid: string;
        Name: string;
        Email: string;
    };
}

/* ------------------------------------------------------------------ */
/* Categorias                                                          */
/* ------------------------------------------------------------------ */

export interface CategoryType {
    Uuid: string;
    Description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateCategoryDTO {
    Description: string;
}

export interface UpdateCategoryDTO {
    Description?: string;
}

/* ------------------------------------------------------------------ */
/* Livros                                                              */
/* ------------------------------------------------------------------ */

export type BookStatusName = 'available' | 'reserved' | 'traded';

export interface BookCategoryType {
    Uuid: string;
    Description: string;
}

export interface BookOwnerType {
    Name: string;
}

export interface BookStatusType {
    Name: BookStatusName;
    Description: string;
}

export interface BookType {
    Uuid: string;
    Title: string;
    Autor: string;
    Category?: BookCategoryType;
    Owner?: BookOwnerType;
    Status?: BookStatusType;
    CreationDate?: Date | null;
    CreationLocality?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateBookDTO {
    Title: string;
    Autor: string;
    CategoryUuid: string;
    Status?: BookStatusName;
    CreationDate?: Date | null;
    CreationLocality?: string | null;
}

export interface UpdateBookDTO {
    Title?: string;
    Autor?: string;
    CategoryUuid?: string;
    Status?: BookStatusName;
    CreationDate?: Date | null;
    CreationLocality?: string | null;
}

/** Filtros aceitos pelo catálogo/estante. */
export interface BookQuery extends ListParams {
    title?: string;
    categoryUuid?: string;
    ownerUuid?: string;
    status?: BookStatusName;
}

/* ------------------------------------------------------------------ */
/* Exemplares de livros (BookCopy)                                     */
/* ------------------------------------------------------------------ */

export interface BookCopyType {
    Uuid: string;
    ISBN?: string | null;
    Editora: string;
    TypePrint: string;
    PublicationDate: Date;
    PublicationLocality?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateBookCopyDTO {
    ISBN?: string | null;
    Editora: string;
    TypePrint: string;
    PublicationDate: Date;
    PublicationLocality?: string | null;
}

export interface UpdateBookCopyDTO {
    ISBN?: string | null;
    Editora?: string;
    TypePrint?: string;
    PublicationDate?: Date;
    PublicationLocality?: string | null;
}

/* ------------------------------------------------------------------ */
/* Endereços                                                           */
/* ------------------------------------------------------------------ */

export interface AddressType {
    Uuid: string;
    Rua: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    Cep: number;
    Cidade: string;
    Estado: string;
    Pais: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateAddressDTO {
    Rua: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    Cep: number;
    Cidade: string;
    Estado: string;
    Pais: string;
}

export interface UpdateAddressDTO {
    Rua?: string;
    Numero?: string;
    Complemento?: string;
    Bairro?: string;
    Cep?: number;
    Cidade?: string;
    Estado?: string;
    Pais?: string;
}

/* ------------------------------------------------------------------ */
/* Recursos sociais (seguir/favoritar)                                 */
/* ------------------------------------------------------------------ */

export type FollowUserType = PublicUserType;

/** Livro favoritado, com a data em que foi favoritado. */
export interface FavoriteBookType extends BookType {
    FavoritedAt: Date;
}
