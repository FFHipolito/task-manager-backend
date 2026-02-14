# 🚀 Deployment na Vercel

Guia completo para fazer deploy do Task Manager na Vercel.

## Pré-requisitos

- Conta no GitHub/GitLab (com os repositórios criados)
- Conta na Vercel (https://vercel.com)
- Conta no Neon ou outro provedor PostgreSQL na cloud

## 📦 Preparação

### 1. Banco de dados na nuvem

#### Opção A: Neon (Recomendado)
- Acesse https://neon.tech
- Crie uma conta gratuita
- Crie um novo projeto PostgreSQL
- Copie a connection string

#### Opção B: Supabase
- Acesse https://supabase.com
- Crie um novo projeto
- Vá para Settings → Database
- Copie a connection string

#### Opção C: AWS RDS
- Crie uma instância PostgreSQL
- Configure security groups
- Copie a connection string

### 2. Prepare os repositórios

```bash
# Backend
cd task-manager-backend
git init
git add .
git commit -m "Initial commit: complete NestJS backend"
git branch -M main
git remote add origin https://github.com/seu-usuario/task-manager-backend.git
git push -u origin main

# Frontend
cd ../task-manager-frontend
git init
git add .
git commit -m "Initial commit: complete Next.js frontend"
git branch -M main
git remote add origin https://github.com/seu-usuario/task-manager-frontend.git
git push -u origin main
```

## 📝 Deploy do Backend

### 1. Acesse Vercel
- https://vercel.com
- Clique em "New Project"
- Selecione o repositório `task-manager-backend`

### 2. Configure o projeto

**Framework Preset:** Next.js (vai detectar como Node.js)

**Build Command:**
```bash
npm run build
```

**Output Directory:** `dist`

**Install Command:**
```bash
npm install
```

### 3. Adicione variáveis de ambiente

Na página do projeto → Settings → Environment Variables, adicione:

```
DATABASE_URL=postgresql://user:password@host:5432/task_manager
JWT_SECRET=sua-chave-super-secreta-muito-segura-mude-isto
NODE_ENV=production
FRONTEND_URL=https://seu-frontend.vercel.app
```

### 4. Deploy

Clique em "Deploy" e aguarde a conclusão.

**URL do backend:** Será fornecida após o deploy (ex: `https://task-manager-backend.vercel.app`)

## 📝 Deploy do Frontend

### 1. Acesse Vercel
- https://vercel.com
- Clique em "New Project"
- Selecione o repositório `task-manager-frontend`

### 2. Configure o projeto

**Framework Preset:** Next.js

**Build Command:**
```bash
npm run build
```

**Output Directory:** `.next`

**Install Command:**
```bash
npm install
```

### 3. Adicione variáveis de ambiente

Na página do projeto → Settings → Environment Variables, adicione:

```
NEXT_PUBLIC_API_URL=https://task-manager-backend.vercel.app
```

**Importante:** A variável precisa ter o prefixo `NEXT_PUBLIC_` para ficar acessível no navegador.

### 4. Deploy

Clique em "Deploy" e aguarde a conclusão.

**URL do frontend:** Será fornecida após o deploy (ex: `https://task-manager-frontend.vercel.app`)

## ✅ Verificação pós-deploy

### Teste o Backend
```bash
# Registrar novo usuário
curl -X POST https://task-manager-backend.vercel.app/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "name": "Teste",
    "password": "senha123"
  }'

# Fazer login
curl -X POST https://task-manager-backend.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "password": "senha123"
  }'
```

### Teste o Frontend
- Acesse a URL do frontend
- Tente criar uma conta
- Tente fazer login
- Crie uma tarefa
- Verifique se está funcionando

## 🔄 Atualizações futuras

### Atualizar Backend
```bash
cd task-manager-backend
# Faça suas alterações
git add .
git commit -m "Fix: descrição das mudanças"
git push origin main  # Vercel fará deploy automaticamente
```

### Atualizar Frontend
```bash
cd task-manager-frontend
# Faça suas alterações
git add .
git commit -m "feat: descrição das mudanças"
git push origin main  # Vercel fará deploy automaticamente
```

## 🐛 Troubleshooting

### Erro: "Database connection failed"
- Verifique se a `DATABASE_URL` está correta
- Verifique se o IP da Vercel está na whitelist do banco
- Testecone localmente: `psql $DATABASE_URL`

### Erro: "CORS error"
- Adicione a URL do frontend em `FRONTEND_URL` no backend
- Reinicie o deploy do backend

### Erro: "Can't reach API"
- Verifique se `NEXT_PUBLIC_API_URL` está correto
- Verifique se o backend está rodando
- Verifique se o frontend consegue acessar a URL do backend

### Erro: "Token inválido"
- Certifique-se que `JWT_SECRET` é igual em dev e prod
- Limpe o localStorage no navegador

## 📊 Monitoramento

### Logs do Vercel
1. Acesse o projeto no Vercel
2. Vá para "Deployments"
3. Clique no deployment
4. Vá para "Logs"

### Monitoring
- Use o console de erro do navegador (F12)
- Verifique os logs do Vercel
- Use ferramentas como Sentry para monitorar erros

## 🔐 Segurança

### Checklist de Segurança
- ✅ JWT_SECRET é diferente da chave local
- ✅ DATABASE_URL usa credenciais seguras
- ✅ CORS está configurado corretamente
- ✅ Senhas são hasheadas com bcrypt
- ✅ Variáveis sensíveis não estão no git
- ✅ HTTPS está ativado (Vercel faz automaticamente)

### Variáveis Sensíveis
Nunca commite:
- DATABASE_URL
- JWT_SECRET
- API_KEYS
- Credenciais de terceiros

## 📈 Performance

### Dicas de otimização

#### Backend
- Use caching com Redis
- Implemente rate limiting
- Otimize queries do banco
- Use compressão gzip

#### Frontend
- Lazy load de componentes
- Image optimization
- Code splitting
- Cache busting

## 🎯 Checklist Final

- [ ] Backend deployado na Vercel
- [ ] Frontend deployado na Vercel
- [ ] Banco de dados na nuvem rodando
- [ ] Variáveis de ambiente configuradas
- [ ] CORS funcionando
- [ ] Login/Register funcionando
- [ ] CRUD de tarefas funcionando
- [ ] Testes passando
- [ ] Documentação atualizada

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs da Vercel
2. Verifique o console do navegador
3. Teste localmente primeiro
4. Consulte a documentação oficial

---

**Parabéns! Seu Task Manager está na nuvem! 🎉**
