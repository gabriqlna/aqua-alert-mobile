# Como Instalar o AquaAlert no Android

## Opção 1: Versão Web (Disponível Agora)
Como o app Flutter foi compilado para web, você pode acessá-lo pelo navegador do Android:

### No seu celular Android:
1. Abra o **Chrome** ou navegador padrão
2. Digite o endereço: `http://localhost:5000` (se estiver no mesmo WiFi)
3. Ou acesse via link do Replit quando disponível
4. O app funcionará como um Progressive Web App (PWA)

### Para criar atalho na tela inicial:
1. No Chrome, toque nos **3 pontos** (menu)
2. Selecione **"Adicionar à tela inicial"**
3. Digite "AquaAlert" como nome
4. Agora terá um ícone do app na tela inicial

## Opção 2: APK Real (Precisa gerar primeiro)
Para ter o app nativo Android, você precisa:

### Pré-requisitos:
- Computador com Android Studio
- Google Maps API Key
- Projeto Flutter (já criado aqui)

### Passos:
1. **Baixar o projeto:**
   - Copie toda pasta `mobile/` para seu computador

2. **Instalar ferramentas:**
   ```bash
   # Instale Flutter SDK
   # Instale Android Studio
   # Configure emulador ou conecte celular
   ```

3. **Configurar API Key:**
   - Edite `android/app/src/main/AndroidManifest.xml`
   - Adicione sua Google Maps API Key

4. **Gerar APK:**
   ```bash
   cd mobile/
   flutter build apk --release
   ```

5. **Instalar no celular:**
   - Copie o APK gerado para o celular
   - Habilite "Fontes desconhecidas" nas configurações
   - Toque no arquivo APK para instalar

## Funcionalidades Disponíveis:
✅ Mapa interativo de Nova Cruz, RN
✅ Monitoramento de água por bairro
✅ Sistema de denúncias
✅ Alertas em tempo real
✅ Interface Material Design

## Coordenadas dos Bairros:
- **Centro**: -5.6786, -35.4270
- **Bairro Norte**: -5.6750, -35.4250  
- **Bairro Sul**: -5.6820, -35.4290
- **Zona Rural**: -5.6850, -35.4200