# Como Conseguir APK Nativo Sem Computador

## Opção 1: Serviços Online de Build
Existem plataformas que compilam Flutter na nuvem:

### Codemagic (Recomendado)
1. Acesse: https://codemagic.io
2. Conecte sua conta GitHub
3. Faça upload do projeto Flutter
4. Configure build automático para Android
5. Baixe o APK gerado

### GitHub Actions (Gratuito)
1. Suba o projeto para GitHub
2. Configure workflow de build automático
3. APK será gerado automaticamente
4. Baixe das releases

## Opção 2: Usar Termux no Android
Instale ferramentas de desenvolvimento direto no celular:

### Passos:
1. **Instalar Termux** (F-Droid ou Play Store)
2. **Instalar Flutter:**
   ```bash
   pkg install git nodejs-lts
   git clone https://github.com/flutter/flutter.git
   export PATH="$PATH:`pwd`/flutter/bin"
   ```
3. **Compilar APK:**
   ```bash
   flutter build apk --release
   ```

⚠️ **Limitação:** Pode ser lento e usar muita bateria

## Opção 3: Pedir Ajuda na Comunidade
Poste o projeto em:
- **r/Flutter** (Reddit)
- **Grupos Flutter** (Telegram/WhatsApp)
- **Flutter Brasil** (Facebook)

Peça para alguém compilar o APK para você.

## Opção 4: Usar um PC Emprestado
- Bibliotecas públicas com computadores
- Lan houses
- Computador de amigos/família
- Universidades/escolas

## Por Enquanto: Versão Web
Use a versão web que já está funcionando:
1. Abra Chrome no celular
2. Acesse a URL do projeto
3. Adicione à tela inicial
4. Funciona como app nativo

## Arquivos Necessários para Build
O projeto completo está em `mobile/` com:
- Código fonte Flutter
- Configurações Android
- Dependências configuradas
- Coordenadas de Nova Cruz, RN
- Integração com API