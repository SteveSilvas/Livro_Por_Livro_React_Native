# 📱 LivroPorLivro — App de Escambo de Livros

Aplicativo mobile (Android / iOS / Web) do projeto **Books Barter / EscamboLiterário**. Consome a
[API `Books_Barter_Node`](https://github.com/SteveSilvas/Books_Barter_Node) para autenticação,
estante digital e recursos sociais.

> Proposta do produto e regras de negócio: veja o [README do repositório principal](../README.md).

---

## 🛠️ Tecnologias

* **React Native 0.88** com **Expo SDK 58**
* **React 19** e **TypeScript 6** (`strict: true`)
* **React Navigation 7** (`native-stack` + `bottom-tabs`)
* **Axios** para chamadas HTTP
* **react-native-vector-icons** (ícones das abas)
* **react-native-svg** + **react-native-svg-transformer** (importação de SVGs)

---

## ✅ Pré-requisitos

* **Node.js** (recomendado 20+) e **npm**
* Para rodar no celular: o app **Expo Go** (Android/iOS) **ou** um emulador Android / simulador iOS
* A **API** acessível (ver seção [Integração com a API](#-integração-com-a-api))

---

## 🚀 Como rodar

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento do Expo:**

   ```bash
   npm start
   ```

   Isso abre o Metro bundler. A partir dele você pode:

   * pressionar **`a`** para abrir no Android;
   * pressionar **`i`** para abrir no iOS;
   * pressionar **`w`** para abrir no navegador (Web);
   * ou escanear o QR Code com o app **Expo Go**.

   Alternativamente, use os scripts diretos:

   | Comando | Descrição |
   |---------|-----------|
   | `npm start` | Abre o Expo (Metro bundler) |
   | `npm run android` | Abre direto no Android (`expo start --android`) |
   | `npm run ios` | Abre direto no iOS (`expo start --ios`) |
   | `npm run web` | Abre no navegador (`expo start --web`) |

3. **(Opcional) Checagem de tipos:**

   ```bash
   npx tsc --noEmit
   ```

---

## 🔌 Integração com a API

O app fala com a API REST (`Books_Barter_Node`) por meio de uma camada de serviços
centralizada em `src/services/api/`:

* `client.ts` — instância Axios com `baseURL`, injeção do **JWT** (interceptor de request)
  e normalização de erros em `ApiError` (interceptor de response).
* `index.ts` — barrel que reexporta o cliente e os serviços por recurso.
* Um módulo por recurso, espelhando as rotas do backend:
  `status`, `users`, `books`, `categories`, `bookCopies`, `addresses`, `follows`, `favorites`.

### URL base

A URL base vem da variável de ambiente `EXPO_PUBLIC_API_URL` (embutida no bundle pelo Expo).
Se não for definida, o app usa o padrão `http://127.0.0.1:3000`.

1. Copie o arquivo de exemplo e ajuste o valor:

   ```bash
   cp .env.example .env
   ```

2. Defina a URL conforme o alvo:

   * **Web / iOS Simulator**: `http://127.0.0.1:3000`
   * **Emulador Android**: `http://10.0.2.2:3000` (`localhost` aponta para o próprio emulador)
   * **Dispositivo físico (Expo Go)**: `http://<ip-da-máquina>:3000`

> ℹ️ Variáveis `EXPO_PUBLIC_*` são resolvidas em tempo de build. Após alterar o `.env`,
> reinicie o servidor do Expo.

### Autenticação

O `AuthContext` (`src/Context/AuthContext.tsx`) guarda o usuário e o token, e expõe
`login`, `loginWithGoogle`, `logout`, `refreshProfile` e `updateProfile`. O token é
injetado em todas as requisições autenticadas pelo interceptor do `client.ts`.

---

## 📁 Estrutura do projeto

```
.
├── App.tsx                 # Raiz: envolve a navegação no AuthProvider
├── app.json                # Configuração do Expo (nome, ícones, permissões)
├── babel.config.js         # Presets do Expo
├── metro.config.js         # Metro + svg-transformer
├── tsconfig.json           # TypeScript (strict)
├── .env.example            # Exemplo de configuração (EXPO_PUBLIC_API_URL)
└── src
    ├── Screen              # Telas
    │   ├── Index           # Decide entre rotas públicas e do app (via AuthContext)
    │   ├── Login           # Login
    │   ├── Register        # Cadastro
    │   └── App             # Home, Search, Profile, Settings, Logout
    ├── Routes
    │   ├── public.routes   # Stack de Login/Registro
    │   └── app.routes      # Tabs do app autenticado
    ├── Context             # AuthContext (usuário + token)
    ├── services/api        # Cliente Axios e serviços por recurso da API
    ├── UI                  # Componentes (Button, Input, MessageModal, ConfirmModal, BookCard)
    ├── @Types              # Tipos compartilhados (api.ts espelha os DTOs do backend)
    └── Util                # Utilitários (formatação de data, mensagens de erro)
```

---

## 🧭 Navegação

O estado de autenticação vive no `AuthContext`. O componente `Index` decide:

* **não autenticado** → `PublicRoutes` (stack com **Login** e **Register**);
* **autenticado** → `AppRoutes` (tabs: **Home**, **Search**, **Profile**, **Settings**, **Logout**).

### Telas e rotas consumidas

| Tela | Rotas da API consumidas |
|------|--------------------------|
| **Login** | `POST /users/login`, `GET /users/me` |
| **Register** | `POST /users`, `POST /users/login` |
| **Home** (estante) | `GET /users/me/books`, `POST /books`, `GET /categories` |
| **Search** (catálogo) | `GET /books` (filtros: `title`, `categoryUuid`, `status`, paginação) |
| **Profile** | `GET /users/me`, `PUT /users/me` |
| **Settings** | `GET /categories`, `GET /users/me/favorites/books`, `GET /users/me/favorites/shelves` |
| **Logout** | limpa o token no `AuthContext` |

Os demais endpoints (CRUD de `books`, `categories`, `book-copies`, `addresses`, `follows`
e `favorites`) estão disponíveis como serviços em `src/services/api/` para uso nas telas.

---

## 🐳 Docker

O projeto inclui um `Dockerfile` que executa o Expo (útil para o alvo **Web** e para o servidor de
desenvolvimento):

```bash
# build
docker build -t books-barter-app .

# run (Metro bundler na porta 8081)
docker run --rm -p 8081:8081 books-barter-app
```

Para testar em um dispositivo físico, garanta que a porta `8081` esteja acessível na rede.

---

## 📄 Licença

Licença **ISC**, conforme o repositório principal.
