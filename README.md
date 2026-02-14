# Task Manager Backend

API RESTful completa para gerenciar tarefas, construída com **NestJS**, **Prisma** e **PostgreSQL**.

## 🚀 Tecnologias

- **NestJS ^11.0** - Framework Node.js moderno e escalável
- **Prisma ^7.4** - ORM type-safe com migrações
- **PostgreSQL** - Banco de dados relacional robusto
- **JWT** - Autenticação segura com tokens
- **Bcrypt** - Hashing seguro de senhas
- **Jest** - Framework de testes
- **Class Validator** - Validação declarativa de dados
- **TypeScript** - Tipagem estática completa

## 📋 Pré-requisitos

- **Node.js** >= 18.x
- **npm** ou **yarn**
- **PostgreSQL** >= 12

## 🔧 Instalação Rápida

### 1. Clone e navegue

```bash
git clone <seu-repositorio>
cd task-manager-backend
```

### 2. Instale dependências

```bash
npm install
```

### 3. Configure variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com seus dados:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_manager"
JWT_SECRET="chave-super-segura-mude-em-producao"
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### 4. Setup do banco de dados

```bash
# Criar/sincronizar banco
npm run prisma:push

# Ou com migration
npm run prisma:migrate
```

## 🚀 Iniciar Aplicação

### Desenvolvimento (com hot-reload)

```bash
npm run start:dev
```

Servidor rodará em `http://localhost:3000`

### Produção

```bash
npm run build
npm run start:prod
```

## 📚 API Endpoints

### **Autenticação**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/auth/register` | Criar nova conta | ❌ |
| POST | `/auth/login` | Login e obter token | ❌ |
| GET | `/auth/me` | Dados do usuário logado | ✅ |

### **Usuários**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/users` | Listar todos usuários | ✅ |
| GET | `/users/profile` | Perfil do usuário logado | ✅ |
| GET | `/users/:id` | Dados de um usuário | ✅ |
| PUT | `/users/:id` | Atualizar usuário | ✅ |
| DELETE | `/users/:id` | Deletar conta | ✅ |

### **Tarefas**

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/tasks` | Listar minhas tarefas | ✅ |
| GET | `/tasks/:id` | Detalhe de uma tarefa | ✅ |
| POST | `/tasks` | Criar nova tarefa | ✅ |
| PUT | `/tasks/:id` | Atualizar tarefa | ✅ |
| DELETE | `/tasks/:id` | Deletar tarefa | ✅ |

## 📦 Estrutura do Projeto

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   ├── register.dto.ts
│   │   └── index.ts
│   ├── guards/
│   │   └── jwt.guard.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── auth.service.spec.ts
│   └── jwt.strategy.ts
├── users/
│   ├── dto/
│   │   ├── user.dto.ts
│   │   ├── update-user.dto.ts
│   │   └── index.ts
│   ├── users.controller.ts
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.service.spec.ts
├── tasks/
│   ├── dto/
│   │   ├── task.dto.ts
│   │   ├── create-task.dto.ts
│   │   ├── update-task.dto.ts
│   │   └── index.ts
│   ├── tasks.controller.ts
│   ├── tasks.module.ts
│   ├── tasks.service.ts
│   └── tasks.service.spec.ts
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── app.controller.ts
├── app.module.ts
└── main.ts
```

## 🔐 Autenticação JWT

### Fluxo de autenticação:

1. **Registrar**: `POST /auth/register`
2. **Login**: `POST /auth/login` → Recebe `access_token`
3. **Usar token**: Adicione header `Authorization: Bearer <TOKEN>`

### Exemplo com cURL:

```bash
# 1. Registrar
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "name": "Seu Nome",
    "password": "senha123"
  }'

# Resposta:
# {
#   "access_token": "eyJhbGc...",
#   "user": {
#     "id": "cuid...",
#     "email": "usuario@example.com",
#     "name": "Seu Nome"
#   }
# }

# 2. Acessar rota protegida
curl -X GET http://localhost:3000/auth/me \
  -H "Authorization: Bearer eyJhbGc..."
```

## 🧪 Testes

### Testes unitários

```bash
npm test
```

### Com coverage

```bash
npm run test:cov
```

### Testes E2E

```bash
npm run test:e2e
```

## 🌐 Deploy na Vercel

### 1. Conecte ao repositório

1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu GitHub/GitLab
3. Selecione o repositório

### 2. Configure variáveis de ambiente

Na página do projeto → Settings → Environment Variables:

```
DATABASE_URL = postgresql://...
JWT_SECRET = seu-secret-bem-seguro
FRONTEND_URL = https://seu-frontend.vercel.app
NODE_ENV = production
```

### 3. Deploy automático

Cada push para `main` fará deploy automático.

Para fazer deploy manual:

```bash
npm run build
```

## 🐛 Troubleshooting

### Erro: `Can't reach database server`

```bash
# Verifique se PostgreSQL está rodando
# Linux/Mac:
brew services start postgresql

# Verifique DATABASE_URL em .env
psql $DATABASE_URL
```

### Erro: `JWT malformed` ou `invalid token`

- Certifique-se que o token está no header: `Authorization: Bearer TOKEN`
- Verifique se `JWT_SECRET` é igual em dev e produção

### Erro: `CORS error`

Aumentar `FRONTEND_URL` em `.env`:

```env
FRONTEND_URL=http://localhost:3001
```

## 📊 Monitoramento

### Prisma Studio (visualizar dados)

```bash
npm run prisma:studio
```

Acesse `http://localhost:5555`

## ✨ Features

- ✅ Autenticação JWT completa
- ✅ Validação de dados com class-validator
- ✅ Criptografia de senhas com bcrypt
- ✅ CORS configurável
- ✅ Testes unitários
- ✅ Prisma migrations
- ✅ Pronto para Vercel
- ✅ Documentação Swagger ready

## 📄 Licença

MIT © Fernando
