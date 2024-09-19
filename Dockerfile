# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Instalar dependências necessárias para a build
COPY package*.json ./
RUN npm install --production=false

# Copiar o restante do código da aplicação
COPY . .

# Gerar o build da aplicação Next.js
RUN npm run build

# Remover dependências de desenvolvimento
RUN npm prune --production

# Etapa 2: Imagem final, otimizada para produção
FROM node:18-alpine

# Definir o diretório de trabalho para a aplicação
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./

# Definir a variável de ambiente NODE_ENV como produção
ENV NODE_ENV production

# Expor a porta padrão
EXPOSE 3000

# Comando para iniciar a aplicação em modo produção
CMD ["npm", "start"]
