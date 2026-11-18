import { FollowUserType, ListParams, Paged } from '../../@Types/api';
import { api } from './client';

/** POST /users/:uuid/follow — segue o usuário. */
export function follow(uuid: string): Promise<void> {
    return api.post(`/users/${uuid}/follow`).then(() => undefined);
}

/** DELETE /users/:uuid/follow — deixa de seguir o usuário. */
export function unfollow(uuid: string): Promise<void> {
    return api.delete(`/users/${uuid}/follow`).then(() => undefined);
}

/** GET /users/:uuid/followers — seguidores do usuário (paginado). */
export function listFollowers(
    uuid: string,
    params: ListParams = {},
): Promise<Paged<FollowUserType>> {
    return api
        .get<Paged<FollowUserType>>(`/users/${uuid}/followers`, { params })
        .then((res) => res.data);
}

/** GET /users/:uuid/following — quem o usuário segue (paginado). */
export function listFollowing(
    uuid: string,
    params: ListParams = {},
): Promise<Paged<FollowUserType>> {
    return api
        .get<Paged<FollowUserType>>(`/users/${uuid}/following`, { params })
        .then((res) => res.data);
}
