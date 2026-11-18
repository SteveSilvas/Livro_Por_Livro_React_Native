import { StatusResponse } from '../../@Types/api';
import { api } from './client';

/** GET /status — verificação de disponibilidade da API. */
export function getStatus(): Promise<StatusResponse> {
    return api.get<StatusResponse>('/status').then((res) => res.data);
}
