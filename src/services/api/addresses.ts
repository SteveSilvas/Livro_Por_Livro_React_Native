import {
    AddressType,
    CreateAddressDTO,
    UpdateAddressDTO,
} from '../../@Types/api';
import { api } from './client';

/** GET /addresses — lista todos os endereços. */
export function listAddresses(): Promise<AddressType[]> {
    return api.get<AddressType[]>('/addresses').then((res) => res.data);
}

/** GET /addresses/:uuid — detalhe de um endereço. */
export function getAddress(uuid: string): Promise<AddressType> {
    return api
        .get<AddressType>(`/addresses/${uuid}`)
        .then((res) => res.data);
}

/** POST /addresses — cria um endereço. */
export function createAddress(
    data: CreateAddressDTO,
): Promise<AddressType> {
    return api.post<AddressType>('/addresses', data).then((res) => res.data);
}

/** PUT /addresses/:uuid — atualiza um endereço. */
export function updateAddress(
    uuid: string,
    data: UpdateAddressDTO,
): Promise<AddressType> {
    return api
        .put<AddressType>(`/addresses/${uuid}`, data)
        .then((res) => res.data);
}

/** DELETE /addresses/:uuid — remove um endereço. */
export function deleteAddress(uuid: string): Promise<void> {
    return api.delete(`/addresses/${uuid}`).then(() => undefined);
}
