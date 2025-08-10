# Guia de Deploy - AquaAlert

Este documento fornece instruções detalhadas para deploy da aplicação AquaAlert em diferentes ambientes.

## 🚀 Opções de Deploy

### 1. Replit (Recomendado para Prototipagem)

#### Setup Inicial
1. **Clone/Upload** do projeto para Replit
2. **Instalar dependências**:
   ```bash
   npm install
   ```
3. **Configurar variáveis de ambiente** no painel Secrets do Replit
4. **Executar**:
   ```bash
   npm run dev  # Desenvolvimento
   npm run build && npm start  # Produção
   ```

#### Configuração de Produção no Replit
- Use o botão "Deploy" no Replit para criar um deployment automático
- Configure domínio customizado se necessário
- Monitor logs através do console do Replit

### 2. Vercel (Frontend) + Railway/Render (Backend)

#### Frontend (Vercel)
1. **Conecte** seu repositório no GitHub ao Vercel
2. **Configure build**:
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`
3. **Variáveis de ambiente**:
   ```
   VITE_API_URL=https://seu-backend.railway.app
   ```

#### Backend (Railway/Render)
1. **Conecte** repositório ao Railway ou Render
2. **Configure**:
   - Start Command: `npm start`
   - Build Command: `npm run build`
3. **Variáveis de ambiente**:
   ```
   NODE_ENV=production
   PORT=5000
   DATABASE_URL=sua-connection-string
   ```

### 3. Docker

#### Dockerfile
```dockerfile
# Frontend build
FROM node:18-alpine as frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY client/ ./client/
COPY shared/ ./shared/
COPY *.config.ts ./
RUN npm run build

# Backend build
FROM node:18-alpine as backend-builder
WORKDIR /app
COPY package*.json ./
COPY server/ ./server/
COPY shared/ ./shared/
COPY tsconfig.json ./
RUN npm ci
RUN npm run build

# Production
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=backend-builder /app/dist ./dist
COPY --from=frontend-builder /app/client/dist ./client/dist
EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@db:5432/aquaalert
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: aquaalert
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 4. AWS (Production)

#### Arquitetura Recomendada
- **S3 + CloudFront**: Frontend estático
- **Elastic Beanstalk**: Backend API
- **RDS**: Banco de dados PostgreSQL
- **Route 53**: DNS e domínio

#### Steps
1. **Frontend**:
   ```bash
   npm run build
   aws s3 sync client/dist/ s3://seu-bucket-frontend
   ```

2. **Backend**:
   - Package: `npm run build && zip -r app.zip dist/ package.json package-lock.json`
   - Deploy via Elastic Beanstalk console

### 5. DigitalOcean App Platform

1. **Conecte** repositório GitHub
2. **Configure componente Web**:
   - Source: `/`
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - HTTP Port: `5000`

## 🔐 Variáveis de Ambiente

### Desenvolvimento
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://localhost:5432/aquaalert_dev
```

### Produção
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=sua-connection-string-producao
SESSION_SECRET=seu-session-secret-forte
CORS_ORIGIN=https://seu-dominio.com
```

## 🗄️ Database Setup

### PostgreSQL (Produção)
1. **Criar banco**:
   ```sql
   CREATE DATABASE aquaalert;
   CREATE USER aquaalert_user WITH PASSWORD 'senha-forte';
   GRANT ALL PRIVILEGES ON DATABASE aquaalert TO aquaalert_user;
   ```

2. **Executar migrações**:
   ```bash
   npm run db:push
   ```

### Providers Recomendados
- **Neon**: PostgreSQL serverless
- **Supabase**: PostgreSQL com features extras
- **AWS RDS**: Para deploy enterprise
- **PlanetScale**: MySQL alternativo

## 🚦 Health Checks

### Endpoint de Saúde
```javascript
// Adicionar em server/routes.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});
```

### Monitoramento
- **Uptime Robot**: Monitoramento básico
- **DataDog**: Monitoramento avançado
- **New Relic**: APM completo

## 🔄 CI/CD

### GitHub Actions (Já Configurado)
O projeto inclui workflows para:
- ✅ Testes automatizados
- ✅ Build validation
- ✅ Security audit
- ✅ Deploy automático

### Deploy Triggers
- **Push to main**: Deploy automático para produção
- **Pull Request**: Deploy para staging
- **Manual**: Via workflow_dispatch

## 🐛 Troubleshooting

### Problemas Comuns

#### Build Errors
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar tipos
npx tsc --noEmit
```

#### Memory Issues
```javascript
// package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' npm run build"
}
```

#### Database Connection
```bash
# Testar conexão
npm run db:push
```

### Logs
```bash
# Produção
npm start 2>&1 | tee app.log

# Development
npm run dev
```

## 📊 Performance

### Otimizações
- **Code Splitting**: Vite automatically splits bundles
- **Tree Shaking**: Remove unused code
- **Compression**: Enable gzip/brotli
- **CDN**: Serve static assets from CDN

### Monitoring
- **Core Web Vitals**: Monitor via Google PageSpeed
- **Bundle Size**: Use `npm run analyze`
- **API Performance**: Monitor response times

## 🔒 Segurança

### Checklist Produção
- [ ] HTTPS configurado
- [ ] Variáveis de ambiente seguras
- [ ] Headers de segurança configurados
- [ ] Rate limiting implementado
- [ ] Audit de dependências executado
- [ ] Backup do banco configurado

### Headers Recomendados
```javascript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

---

Para dúvidas específicas sobre deploy, consulte a documentação do provider escolhido ou abra uma issue no projeto.