# 🗺️ Roadmap — LivroPorLivro (app)

Plano de evolução do aplicativo mobile (Android / iOS / Web). Este documento registra **o que já foi
feito** (linha de base) e **o que falta** para o app entregar, de ponta a ponta, as regras de negócio
já implementadas na API [`Books_Barter_Node`](../Books_Barter_Node/README.md).

> A API é a referência de contrato: toda rota exposta lá tem um serviço correspondente em
> `src/services/api/`. O que falta não é integração, e sim **telas e fluxos** que usem esses serviços.

Legenda de status:

* ✅ **Concluído** — implementado e consumido por uma tela.
* 🟡 **Parcial** — o serviço existe e funciona, mas nenhuma tela (ou apenas parte dela) o usa.
* 🔴 **Pendente** — ainda não iniciado.
* 🧱 **Transversal** — não é regra de negócio, mas sustenta a entrega.

---

## ✅ Linha de base (o que já foi feito)

| Item | Status | Referência |
|------|--------|-----------|
| Expo SDK 58 (último SDK) com React Native 0.88, React 19 e TypeScript 6 `strict` | ✅ | `package.json`, `tsconfig.json` |
| Alinhamento de dependências verificado (`expo install --check`, `expo-doctor` 20/20) | ✅ | — |
| Navegação por estado de sessão: `public.routes` (Login/Registro) e `app.routes` (tabs) | ✅ | `src/Routes`, `src/Screen/Index` |
| Cliente Axios com `baseURL` por `EXPO_PUBLIC_API_URL`, injeção de JWT e `ApiError` normalizado | ✅ | `src/services/api/client.ts` |
| Sessão persistida em `AsyncStorage` (token restaurado no boot e validado com `GET /users/me`) | ✅ | `src/services/session.ts`, `AuthContext` |
| `AuthContext` com `login`, `loginWithGoogle`, `logout`, `refreshProfile`, `updateProfile` | ✅ | `src/Context/AuthContext.tsx` |
| **Serviço para todas as rotas da API** (8 módulos de recurso + cliente HTTP) | ✅ | `src/services/api/*` |
| Tipos compartilhados espelhando os DTOs do backend | ✅ | `src/@Types/api.ts` |
| Componentes de UI reutilizáveis (Button, Input, BookCard, modais) | ✅ | `src/UI` |
| Checagem de tipos (`tsc --noEmit`) e export web (`expo export --platform web`) verdes | ✅ | — |

### Cobertura das rotas da API

Todas as rotas têm serviço pronto. A coluna **Tela** mostra o que o usuário já consegue fazer hoje.

| Rota da API | Serviço | Tela |
|-------------|---------|------|
| `POST /users`, `POST /users/login` | `users.createUser`, `users.login` | ✅ Register / Login |
| `GET /users/me`, `PUT /users/me` | `users.getMe`, `users.updateMe` | ✅ Profile |
| `GET /users`, `GET /users/:uuid`, `GET /users/email/:email` | `users.listUsers`, `getUserByUuid`, `getUserByEmail` | 🟡 serviço apenas |
| `PUT /users/:uuid`, `DELETE /users/:uuid` | `users.updateUser`, `deleteUser` | 🟡 serviço apenas |
| `POST /users/google` | `users.loginWithGoogle` (via `AuthContext`) | 🟡 sem botão na UI |
| `GET /books`, `GET /books/:uuid` | `books.listBooks`, `getBook` | 🟡 Search usa só `title`; sem tela de detalhe |
| `GET /users/me/books` | `books.listMyBooks` | ✅ Home |
| `GET /users/:uuid/books` | `books.listBooksByOwner` | 🟡 serviço apenas |
| `POST /books`, `PUT /books/:uuid`, `DELETE /books/:uuid` | `books.createBook`, `updateBook`, `deleteBook` | 🟡 só criação (Home) |
| `GET /categories` | `categories.listCategories` | ✅ Home / Settings |
| `POST/PUT/DELETE /categories` | `categories.create/update/delete` | 🟡 serviço apenas |
| `GET/POST/PUT/DELETE /book-copies` | `bookCopies.*` | 🟡 serviço apenas |
| `GET/POST/PUT/DELETE /addresses` | `addresses.*` | 🟡 serviço apenas |
| `POST/DELETE /users/:uuid/follow`, `GET .../followers`, `GET .../following` | `follows.*` | 🟡 serviço apenas |
| `POST/DELETE /books/:uuid/favorite`, `POST/DELETE /users/:uuid/favorite` | `favorites.favoriteBook`, `unfavoriteBook`, `favoriteShelf`, `unfavoriteShelf` | 🟡 serviço apenas |
| `GET /users/me/favorites/books`, `GET /users/me/favorites/shelves` | `favorites.listFavoriteBooks`, `listFavoriteShelves` | ✅ Settings |
| `GET /status` | `status.getStatus` | 🟡 serviço apenas |

---

## 🎯 Pendências por fase

### Fase 0 — Fundação do app 🧱 ✅

- [x] Cliente HTTP único com token, `baseURL` por ambiente e erros normalizados.
- [x] Sessão persistida e restaurada com validação do token no boot.
- [x] Navegação condicionada ao estado de autenticação.
- [x] Serviços cobrindo todas as rotas da API.

**Pendência desta fase:** nenhuma.

---

### Fase 1 — Estante digital ✅

- [x] Home lista a estante privada (`GET /users/me/books`).
- [x] Cadastro de livro com título, autor e categoria (`POST /books` + `GET /categories`).
- [x] Estado de carregamento e mensagens de erro amigáveis.

**Aceite:** o usuário vê a própria estante e cadastra livros nela.

---

### Fase 2 — Catálogo e visibilidade 🟡

Hoje o catálogo público é uma busca simples por título, sem detalhe nem paginação.

- [ ] **Tela de detalhe do livro** (`GET /books/:uuid`), com dono, categoria e status.
- [ ] **Filtros do catálogo**: categoria (`categoryUuid`), status e dono (`ownerUuid`) — os
      parâmetros já existem em `BookQuery` e no backend.
- [ ] **Paginação real** (`limit`/`offset` + `meta`): hoje todas as telas pedem `limit: 50` e
      descartam o restante. Implementar scroll infinito com `onEndReached`.
- [ ] **Ordenação** (`sort`/`order`, allowlist do backend) na lista do catálogo.
- [ ] **Estante pública de terceiros** (`GET /users/:uuid/books`) acessível ao tocar no dono.
- [ ] **Editar e remover livro** da própria estante (`PUT`/`DELETE /books/:uuid`), com confirmação
      (`ConfirmModal` já existe).
- [ ] **Alterar status do livro** (`available`/`reserved`/`traded`).

**Aceite:** o usuário navega pelo catálogo com filtros e paginação, abre um livro, e gerencia
(edita, remove, muda status) os seus próprios.

---

### Fase 3 — Recursos sociais 🟡

Os serviços de seguir e favoritar estão prontos, mas nenhuma tela dispara essas ações.

- [ ] **Favoritar/desfavoritar livro** a partir do cartão e do detalhe (`favorites.favoriteBook`).
- [ ] **Favoritar/desfavoritar estante** no perfil de outro usuário (`favorites.favoriteShelf`).
- [ ] **Seguir/deixar de seguir** no perfil público (`follows.follow` / `unfollow`).
- [ ] **Tela de perfil público** (`GET /users/:uuid`): nome, contadores de seguidores/seguindo,
      estante pública e botões de seguir/favoritar.
- [ ] **Listas de seguidores e seguindo** (`GET /users/:uuid/followers|following`), paginadas.
- [ ] **Favoritos na Settings**: hoje só lista; falta remover e navegar para o item.

**Aceite:** o usuário segue outros leitores, favorita livros e estantes, e consulta essas listas.

---

### Fase 4 — Chat de negociação 🔴

Bloqueada no backend: a regra 7 (conversa/mensagens) ainda não existe na API — ver
[ROADMAP do backend](../Books_Barter_Node/ROADMAP.md#fase-4--chat-de-negociação-regra-7-).

- [ ] Definir contrato de `Conversation`/`Message` junto com o backend.
- [ ] Tela de conversas e de mensagens.
- [ ] Atualização em tempo real (WebSocket/SSE) ou *polling* como primeira versão.

**Aceite:** dois usuários conversam sobre um livro dentro do app.

---

### Fase 5 — Perfil e conta 🟡

- [ ] **Troca de senha** na tela de perfil: a API exige `CurrentPass` + `Pass` (`UpdateUserDTO`), e
      hoje a UI não tem esse fluxo.
- [ ] **Exclusão de conta** (`DELETE /users/:uuid`), com confirmação explícita.
- [ ] **Login com Google** na tela de Login: `AuthContext.loginWithGoogle` existe, mas não há botão
      nem integração com o SDK do Google.
- [ ] **Endereços** (`/addresses`): telas de listagem e cadastro, hoje só serviço.

**Aceite:** o usuário gerencia credenciais, entra com Google e mantém seus endereços.

---

## 🧱 Dívidas técnicas e melhorias transversais

- [ ] **Testes automatizados no app** — hoje não há Jest nem Testing Library; nenhuma tela tem teste.
- [ ] **Lint e formatação** — não há ESLint/Prettier configurados.
- [ ] **CI (GitHub Actions)** — rodar `tsc --noEmit`, lint, testes e `expo-doctor` em cada PR.
- [ ] **Tratamento de 401 global** — o interceptor hoje só normaliza o erro; falta deslogar e
      redirecionar quando o token expira no meio da sessão.
- [ ] **Refresh token / renovação de sessão** — depende do backend, que ainda não expõe refresh.
- [ ] **Build de produção (EAS Build/Submit)** — hoje só existe o Dockerfile de desenvolvimento.
- [ ] **Acessibilidade** (`accessibilityLabel`, contraste) e **estados vazios** nas listas.
- [ ] **Feedback de carregamento padronizado** (hoje cada tela repete `ActivityIndicator` + modal).

---

## 📐 Definition of Done (por entrega)

Uma tarefa só é considerada concluída quando:

1. A tela usa o serviço existente em `src/services/api/` (sem duplicar chamadas HTTP).
2. Tipos em `src/@Types/api.ts` refletem o contrato real da API.
3. Estados de carregando / vazio / erro estão tratados.
4. `npx tsc --noEmit` e `npx expo export --platform web` passam.
5. `npx expo install --check` e `npx expo-doctor` continuam sem pendências.
6. README e este roadmap atualizados quando houver mudança de comportamento.

---

## 🔭 Visão de sequência

```
Fase 0 (fundação) ✅ → Fase 1 (estante) ✅
                              │
                              ├─→ Fase 2 (catálogo) ─→ Fase 3 (social)
                              │                            │
                              └─→ Fase 5 (perfil/conta)    └─→ Fase 4 (chat)*
```

\* A Fase 4 depende do backend implementar a regra 7.

As fases 0 e 1 estão concluídas. A **Fase 2** é o próximo passo natural: é o que transforma o app de
"estante pessoal" em catálogo navegável. As fases 3 e 5 podem correr em paralelo; a Fase 4 depende do
backend implementar a regra 7.
