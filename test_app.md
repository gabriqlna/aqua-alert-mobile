# Como Testar o App AquaAlert Mobile

## Opção 1: Usando Flutter Web (Mais Fácil)

1. **Instalar Flutter** (se não tiver):
   ```bash
   # No Windows/Mac/Linux - siga as instruções em https://flutter.dev
   ```

2. **Executar como web app**:
   ```bash
   cd mobile
   flutter pub get
   flutter run -d web-server --web-port 8080
   ```

3. **Abrir no navegador**:
   - http://localhost:8080
   - **Nota**: O mapa não funcionará na web sem configuração adicional, mas você pode testar o resto da interface

## Opção 2: Gerando APK (Completo)

### Pré-requisitos
- Android Studio instalado
- Flutter SDK instalado
- Google Maps API Key

### Passos

1. **Configurar API Key**:
   - Abra `mobile/android/app/src/main/AndroidManifest.xml`
   - Substitua `YOUR_GOOGLE_MAPS_API_KEY_HERE` pela sua API key do Google Maps

2. **Configurar URL da API**:
   - Abra `mobile/lib/services/api_service.dart`
   - Substitua a URL pelo domínio do seu Replit:
   ```dart
   static const String _baseUrl = 'https://seu-replit-domain.replit.app/api';
   ```

3. **Gerar APK**:
   ```bash
   cd mobile
   flutter pub get
   flutter build apk --debug
   ```

4. **Instalar no Android**:
   - APK estará em: `mobile/build/app/outputs/flutter-apk/app-debug.apk`
   - Transfira para o celular e instale
   - Ou use: `flutter install` se o celular estiver conectado via USB

## Opção 3: Emulador Android

1. **Abrir Android Studio**
2. **Criar/Iniciar um emulador Android**
3. **Executar o app**:
   ```bash
   cd mobile
   flutter pub get
   flutter run
   ```

## Funcionalidades para Testar

✅ **Tela Inicial**:
- Status geral da água
- Lista de alertas recentes
- Botões para navegação

✅ **Mapa**:
- Mapa do Google Maps centrado em Nova Cruz, RN
- Marcadores coloridos por bairro
- Verde = água disponível
- Vermelho = sem água
- Laranja = manutenção
- Clique nos marcadores para ver detalhes

✅ **Denúncias**:
- Formulário completo
- Seleção de bairro
- Tipos de problema
- Descrição e contato opcional

✅ **Admin**:
- Simulador de mudança de status
- Simulação de emergência
- Atualização em tempo real

## Coordenadas dos Bairros em Nova Cruz

O app usa coordenadas reais de Nova Cruz, RN:

- **Centro**: -5.6786, -35.4270
- **Bairro Norte**: -5.6750, -35.4250  
- **Bairro Sul**: -5.6820, -35.4290
- **Zona Rural**: -5.6850, -35.4200

## Problemas Comuns

### Mapa não carrega
- Verifique se a Google Maps API Key está configurada
- Certifique-se que a Maps SDK for Android está habilitada no Google Cloud

### Erro de rede
- Verifique se o backend está rodando
- Confirme a URL da API no arquivo `api_service.dart`
- Para teste local, use a URL: `http://10.0.2.2:5000/api` (emulador Android)

### APK não instala
- Habilite "Fontes desconhecidas" nas configurações do Android
- Use APK debug para testes (não precisa assinar)

## Recursos do App Mobile

🎯 **Interface nativa** com Material Design 3
🗺️ **Mapa interativo** do Google Maps
📍 **Geolocalização** precisa dos bairros
🚨 **Sistema de alertas** em tempo real
📱 **Design responsivo** otimizado para mobile
🔄 **Sincronização** automática com backend
⚡ **Performance** otimizada para dispositivos móveis