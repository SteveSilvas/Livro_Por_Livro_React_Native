# syntax=docker/dockerfile:1

# Imagem do app Expo (React Native). Executa o servidor de desenvolvimento do Expo,
# útil para o alvo Web e para carregar o app em dispositivos via Expo Go.
FROM node:26-alpine
WORKDIR /app

ENV CI=1
ENV EXPO_NO_TELEMETRY=1

# Instala as dependências primeiro (melhor cache de camadas)
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do projeto
COPY . .

# Porta padrão do Metro bundler / servidor do Expo
EXPOSE 8081

# Inicia o Expo em modo web, acessível pela rede (host "lan")
CMD ["npx", "expo", "start", "--web", "--host", "lan"]
