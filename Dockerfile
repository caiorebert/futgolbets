FROM node:18
# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app
# Copiar o arquivo package.json e package-lock.json
COPY package*.json ./
# Instalar as dependências
RUN npm install -g @nestjs/cli
RUN npm install
# Copiar o restante do código do projeto
COPY . .
# Expor a porta 3000
EXPOSE 3000
# Comando para rodar a aplicação
CMD ["npm", "run", "start:dev"]