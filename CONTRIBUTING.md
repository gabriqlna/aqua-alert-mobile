# Guia de Contribuição - AquaAlert

Obrigado por seu interesse em contribuir com o AquaAlert! Este guia ajudará você a entender como contribuir efetivamente para o projeto.

## 🚀 Como Contribuir

### 1. Setup do Ambiente de Desenvolvimento

```bash
# Clone o repositório
git clone <repository-url>
cd aquaalert

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### 2. Processo de Desenvolvimento

1. **Crie uma issue** descrevendo o bug ou feature
2. **Faça fork** do repositório
3. **Crie uma branch** a partir da `main`:
   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```
4. **Desenvolva sua solução**
5. **Teste localmente**
6. **Commit suas mudanças**
7. **Abra um Pull Request**

### 3. Padrões de Código

#### TypeScript
- Use TypeScript strict mode
- Defina tipos explícitos quando necessário
- Use interfaces para objetos complexos

#### React
- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Use React.memo() para otimização quando apropriado

#### Styling
- Use Tailwind CSS para estilização
- Siga o sistema de design existente
- Use variáveis CSS para cores personalizadas

#### Backend
- Validação de entrada com Zod
- Tratamento de erros adequado
- Documentação das rotas da API

### 4. Padrões de Commit

Use o formato conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Tipos válidos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação, missing semi colons, etc
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Tarefas de manutenção

**Exemplos:**
```
feat(dashboard): add water status indicator
fix(api): handle neighborhood not found error
docs(readme): update installation instructions
```

### 5. Pull Request Guidelines

#### Antes de Submeter
- [ ] Código compila sem erros
- [ ] Testes passam (quando aplicável)
- [ ] Funcionalidade testada manualmente
- [ ] Documentação atualizada
- [ ] Changelog atualizado (para mudanças significativas)

#### Template do PR
Use o template automático que aparece ao criar o PR.

### 6. Estrutura do Projeto

```
client/src/
├── components/     # Componentes reutilizáveis
├── hooks/         # Custom hooks
├── lib/           # Utilitários e configurações
├── pages/         # Páginas da aplicação
└── App.tsx        # Componente principal

server/
├── index.ts       # Servidor Express
├── routes.ts      # Definições de rotas
└── storage.ts     # Interface de dados

shared/
└── schema.ts      # Esquemas compartilhados
```

### 7. Funcionalidades Principais

#### Dashboard
- Status geral da cidade
- Lista de alertas recentes
- Navegação rápida

#### Mapa
- Visualização por bairros
- Legenda de status
- Interface responsiva

#### Sistema de Denúncias
- Formulário validado
- Seleção de bairro
- Feedback ao usuário

#### Admin
- Alteração de status
- Interface intuitiva
- Confirmações visuais

### 8. Testing

#### Testes Manuais
1. Navegue entre todas as telas
2. Teste formulários com dados válidos e inválidos
3. Verifique responsividade em diferentes tamanhos
4. Teste funcionalidades offline (quando aplicável)

#### Cenários de Teste
- **Dashboard**: Verificar cálculo correto do status geral
- **Mapa**: Confirmar cores corretas por status
- **Denúncia**: Validação de formulário e envio
- **Admin**: Alteração de status e propagação

### 9. Documentação

#### Código
- Comente código complexo
- Use JSDoc para funções públicas
- Mantenha README atualizado

#### API
- Document novos endpoints
- Inclua exemplos de request/response
- Atualize esquemas quando necessário

### 10. Review Process

#### O que Revisamos
- Qualidade do código
- Aderência aos padrões
- Funcionalidade correta
- Experiência do usuário
- Performance
- Segurança

#### Timeframe
- Reviews são feitos normalmente em 2-3 dias úteis
- Mudanças críticas podem ser priorizadas

### 11. Releases

#### Versionamento
Seguimos [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): Novas features compatíveis
- **Patch** (0.0.1): Bug fixes

#### Release Notes
- Incluir todas as mudanças significativas
- Mencionar breaking changes
- Creditar contribuidores

### 12. Contato

- **Issues**: Para bugs e feature requests
- **Discussions**: Para perguntas gerais
- **Email**: Para questões sensíveis

---

**Lembre-se**: Toda contribuição, por menor que seja, é valiosa! Obrigado por ajudar a melhorar o AquaAlert! 🚰