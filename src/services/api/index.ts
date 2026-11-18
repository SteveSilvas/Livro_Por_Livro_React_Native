/**
 * Ponto único de acesso à API. Reexporta o cliente e os serviços de cada
 * recurso, espelhando as rotas expostas pelo backend (Books_Barter_Node).
 *
 * Uso:
 *   import { api, users, books } from '../services/api';
 *   const { token } = await users.login({ Email, Pass });
 */

export * from './client';
export * as status from './status';
export * as users from './users';
export * as follows from './follows';
export * as favorites from './favorites';
export * as books from './books';
export * as categories from './categories';
export * as bookCopies from './bookCopies';
export * as addresses from './addresses';
