#(2º passo da inicialização)

# Dockerfile simplificado para Next.js com Prisma
FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache libc6-compat openssl

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Gerar cliente Prisma
RUN npx prisma generate

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3000

# Usar script de inicialização
CMD ["npm", "start"]

#Depois disso, executar configuração do prisma para criação de tabelas
#(prisma migrate deploy-> se já existir migrations ou prisma db push -> se não existir migrations)