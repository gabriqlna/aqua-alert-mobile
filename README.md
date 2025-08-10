# AquaAlert - Sistema de Monitoramento de Água Nova Cruz

Um Progressive Web App (PWA) moderno para monitoramento e exibição do status do fornecimento de água por bairros na cidade fictícia de Nova Cruz.

## 🚀 Características

- **Dashboard**: Status geral da cidade calculado automaticamente baseado no status dos bairros
- **Mapa Interativo**: Visualização dos bairros com códigos de cores (verde=disponível, vermelho=indisponível, laranja=manutenção)
- **Sistema de Denúncias**: Formulário para cidadãos reportarem problemas no fornecimento
- **Painel Administrativo**: Interface para atualização do status dos bairros
- **Design Mobile-First**: Interface otimizada para dispositivos móveis com navegação inferior
- **Atualizações em Tempo Real**: Estados sincronizados usando React Query

## 🏗️ Arquitetura

### Frontend
- **React 18** com TypeScript
- **Tailwind CSS** + shadcn/ui para interface
- **TanStack React Query** para gerenciamento de estado servidor
- **React Hook Form** + Zod para validação de formulários
- **Navegação baseada em estado** sem roteamento tradicional

### Backend
- **Node.js** + Express.js
- **API RESTful** com validação de esquemas
- **Armazenamento em memória** com interface para futura integração com banco de dados
- **TypeScript** end-to-end

## 📦 Estrutura do Projeto

```
├── client/               # Frontend React
│   ├── src/
│   │   ├── components/   # Componentes UI reutilizáveis
│   │   ├── hooks/        # Hooks customizados para API
│   │   ├── lib/          # Utilitários e tipos
│   │   ├── pages/        # Páginas principais da aplicação
│   │   └── main.tsx      # Ponto de entrada
│   └── index.html
├── server/               # Backend Express
│   ├── index.ts          # Servidor principal
│   ├── routes.ts         # Definições de rotas API
│   ├── storage.ts        # Interface de dados
│   └── vite.ts           # Integração Vite
├── shared/               # Esquemas compartilhados
│   └── schema.ts         # Definições de tipos Zod/Drizzle
└── .github/              # GitHub Actions
    └── workflows/
```

## 🛠️ Desenvolvimento

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:5000`

### Scripts Disponíveis
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run check        # Verificação de tipos TypeScript
```

## 🚀 Deploy

### GitHub Actions
O projeto inclui workflows do GitHub Actions para:
- **CI/CD Pipeline** (`.github/workflows/ci.yml`)
  - Testes automatizados
  - Verificação de tipos
  - Auditoria de segurança
  - Build automático
- **Deploy** (`.github/workflows/deploy.yml`)
  - Deploy automático em releases
  - Deploy manual para staging/produção

### Deploy Manual
```bash
# Build da aplicação
npm run build

# Os arquivos estão em dist/ (backend) e client/dist/ (frontend)
# Deploy os arquivos para seu provedor preferido
```

### Deploy no Replit
1. Faça upload dos arquivos para o Replit
2. Execute `npm ci --production`
3. Configure as variáveis de ambiente necessárias
4. Execute `npm start`

## 🗃️ Dados Iniciais

O sistema vem com dados mockados para 4 bairros:
- **Centro**: Água disponível
- **Bairro Norte**: Sem água  
- **Bairro Sul**: Em manutenção
- **Zona Rural**: Água disponível

## 🔮 Integração Futura com Firebase

O projeto está preparado para integração com Firebase:

1. **Instalar dependências do Firebase**:
```bash
npm install firebase
```

2. **Configurar Firebase** (`firebase.config.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Sua configuração
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

3. **Substituir MemStorage** por implementação Firestore em `server/storage.ts`

## 📱 PWA Features

- **Instalável**: Pode ser instalado como app nativo
- **Responsivo**: Interface adaptada para mobile
- **Offline-ready**: Preparado para funcionalidade offline
- **App-like**: Navegação e UX similares a aplicativos nativos

## 🔒 Segurança

- Validação de entrada com Zod
- Sanitização de dados
- Auditoria automática de dependências
- Headers de segurança (para implementar em produção)

## 🤝 Contribuindo

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Lucide Icons](https://lucide.dev/)