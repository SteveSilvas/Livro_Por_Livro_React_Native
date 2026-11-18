import {
    CreateUserDTO,
    GoogleLoginType,
    LoginResponse,
    LoginType,
    PublicUserType,
    UpdateUserDTO,
    UserType,
} from '../../@Types/api';
import { api } from './client';

/* ------------------------------------------------------------------ */
/* Autenticação                                                        */
/* ------------------------------------------------------------------ */

/** POST /users — cadastro de usuário (retorna o perfil criado). */
export function createUser(data: CreateUserDTO): Promise<UserType> {
    return api.post<UserType>('/users', data).then((res) => res.data);
}

/** POST /users/login — login por e-mail/senha (retorna o JWT). */
export function login(data: LoginType): Promise<LoginResponse> {
    return api.post<LoginResponse>('/users/login', data).then((res) => res.data);
}

/** POST /users/google — login com Google (recebe o ID token). */
export function loginWithGoogle(
    data: GoogleLoginType,
): Promise<LoginResponse> {
    return api
        .post<LoginResponse>('/users/google', data)
        .then((res) => res.data);
}

/* ------------------------------------------------------------------ */
/* Perfil próprio                                                      */
/* ------------------------------------------------------------------ */

/** GET /users/me — perfil do usuário autenticado. */
export function getMe(): Promise<UserType> {
    return api.get<UserType>('/users/me').then((res) => res.data);
}

/** PUT /users/me — edição do próprio perfil. */
export function updateMe(data: UpdateUserDTO): Promise<UserType> {
    return api.put<UserType>('/users/me', data).then((res) => res.data);
}

/* ------------------------------------------------------------------ */
/* Usuários públicos                                                   */
/* ------------------------------------------------------------------ */

/** GET /users — lista de usuários (dados públicos). */
export function listUsers(): Promise<PublicUserType[]> {
    return api.get<PublicUserType[]>('/users').then((res) => res.data);
}

/** GET /users/:uuid — perfil público de um usuário. */
export function getUserByUuid(uuid: string): Promise<PublicUserType> {
    return api
        .get<PublicUserType>(`/users/${uuid}`)
        .then((res) => res.data);
}

/** GET /users/email/:email — busca usuário pelo e-mail. */
export function getUserByEmail(email: string): Promise<UserType> {
    return api
        .get<UserType>(`/users/email/${encodeURIComponent(email)}`)
        .then((res) => res.data);
}

/* ------------------------------------------------------------------ */
/* Edição/remoção restritas ao dono                                    */
/* ------------------------------------------------------------------ */

/** PUT /users/:uuid — atualiza outro usuário (só o próprio dono). */
export function updateUser(
    uuid: string,
    data: UpdateUserDTO,
): Promise<UserType> {
    return api.put<UserType>(`/users/${uuid}`, data).then((res) => res.data);
}

/** DELETE /users/:uuid — remove a conta (só o próprio dono). */
export function deleteUser(uuid: string): Promise<void> {
    return api.delete(`/users/${uuid}`).then(() => undefined);
}
