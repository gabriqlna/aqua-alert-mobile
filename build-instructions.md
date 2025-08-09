# Instruções para Build do AquaAlert Mobile

## Pré-requisitos

1. **Flutter SDK**: Versão 3.16.0 ou superior
   ```bash
   flutter --version
   ```

2. **Android Studio**: Com Android SDK instalado

3. **Google Maps API Key**: 
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um projeto ou use um existente
   - Habilite a "Maps SDK for Android"
   - Crie uma API Key
   - Adicione restrições para Android se necessário

## Configuração

### 1. Instalar dependências
```bash
cd mobile
flutter pub get
```

### 2. Configurar Google Maps API Key

Edite o arquivo `android/app/src/main/AndroidManifest.xml` e substitua `YOUR_GOOGLE_MAPS_API_KEY_HERE` pela sua API key:

```xml
<meta-data android:name="com.google.android.geo.API_KEY"
           android:value="sua_api_key_aqui"/>
```

### 3. Configurar URL da API

No arquivo `lib/services/api_service.dart`, atualize a URL base:

```dart
static const String _baseUrl = 'https://seu-dominio.replit.app/api';
```

## Build

### APK Debug
```bash
flutter build apk --debug
```

### APK Release
```bash
flutter build apk --release
```

### Android App Bundle (para Google Play)
```bash
flutter build appbundle --release
```

## Assinatura do APK (para publicação)

### 1. Gerar keystore
```bash
keytool -genkey -v -keystore ~/aqua-alert-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias aqua_alert
```

### 2. Configurar gradle

Crie o arquivo `android/key.properties`:
```
storePassword=sua_senha
keyPassword=sua_senha
keyAlias=aqua_alert
storeFile=/caminho/para/aqua-alert-key.jks
```

### 3. Editar `android/app/build.gradle`

Adicione antes do bloco `android`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

E dentro do bloco `android`:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}
```

## Teste

### Em dispositivo
```bash
flutter run --release
```

### Em emulador
```bash
flutter emulators --launch <emulator_id>
flutter run
```

## Localização dos APKs gerados

- **Debug**: `build/app/outputs/flutter-apk/app-debug.apk`
- **Release**: `build/app/outputs/flutter-apk/app-release.apk`
- **Bundle**: `build/app/outputs/bundle/release/app-release.aab`

## Funcionalidades do App

- ✅ Mapa interativo do Google Maps com Nova Cruz, RN
- ✅ Marcadores coloridos por status da água
- ✅ Interface Material Design 3
- ✅ Integração completa com API REST
- ✅ Sistema de denúncias georreferenciado
- ✅ Painel administrativo para simulações
- ✅ Alertas em tempo real
- ✅ Design responsivo otimizado para mobile

## Troubleshooting

### Erro de Maps API
- Verifique se a API key está correta
- Confirme que a Maps SDK for Android está habilitada
- Teste a key em um browser: `https://maps.googleapis.com/maps/api/js?key=SUA_KEY`

### Erro de Rede
- Confirme que o backend está rodando
- Verifique a URL da API no arquivo `api_service.dart`
- Teste a API manualmente: `curl https://seu-dominio.replit.app/api/neighborhoods`

### Build falhando
```bash
flutter clean
flutter pub get
flutter build apk --debug
```