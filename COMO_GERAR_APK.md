# Como Gerar o APK do AquaAlert Mobile

## Pré-requisitos
1. **Android Studio** instalado
2. **Flutter SDK** configurado
3. **Google Maps API Key** válida

## Passos para gerar o APK:

### 1. Configure o Google Maps API Key
```bash
# Edite o arquivo android/app/src/main/AndroidManifest.xml
# Adicione sua API key:
<meta-data android:name="com.google.android.geo.API_KEY"
           android:value="SUA_API_KEY_AQUI"/>
```

### 2. Gere o APK de debug
```bash
cd mobile/
flutter build apk --debug
```

### 3. Gere o APK de produção
```bash
cd mobile/
flutter build apk --release
```

## Localização do APK
Após o build, o APK estará em:
- Debug: `build/app/outputs/flutter-apk/app-debug.apk`
- Release: `build/app/outputs/flutter-apk/app-release.apk`

## Funcionalidades do App
✅ Mapa interativo de Nova Cruz, RN
✅ Coordenadas reais dos bairros
✅ Sistema de alertas em tempo real
✅ Interface Material Design 3
✅ Integração completa com API REST
✅ Sistema de denúncias
✅ Painel administrativo

## Testando no Web (Disponível agora)
```bash
cd mobile/
python3 serve-web.py
```

Acesse: http://localhost:8080