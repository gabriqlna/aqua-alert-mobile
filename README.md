# 📱 AquaAlert Mobile - Nova Cruz, RN

Sistema de monitoramento de água em tempo real para Nova Cruz, Rio Grande do Norte.

## 🌊 Funcionalidades

- ✅ Mapa interativo com coordenadas reais de Nova Cruz, RN
- ✅ Monitoramento de status da água por bairro
- ✅ Sistema de denúncias georreferenciado
- ✅ Alertas em tempo real
- ✅ Interface Material Design 3
- ✅ Integração completa com API REST

## 🗺️ Bairros Monitorados

- **Centro**: -5.6786, -35.4270
- **Bairro Norte**: -5.6750, -35.4250  
- **Bairro Sul**: -5.6820, -35.4290
- **Zona Rural**: -5.6850, -35.4200

## 🚀 Como Compilar

### APK Automático (GitHub Actions)
Este repositório está configurado para gerar APK automaticamente:
1. Cada push/commit dispara o build
2. APK fica disponível na aba "Actions" → "Artifacts"
3. Baixe e instale no Android

### Build Local
```bash
flutter pub get
flutter build apk --release
```

## 📱 Instalação

1. Baixe o APK gerado
2. Habilite "Fontes desconhecidas" no Android
3. Instale o APK
4. Configure Google Maps API Key (opcional)

## 🔧 Configuração

Para funcionalidade completa do mapa:
1. Obtenha Google Maps API Key
2. Edite `android/app/src/main/AndroidManifest.xml`
3. Adicione: `<meta-data android:name="com.google.android.geo.API_KEY" android:value="SUA_API_KEY"/>`

## 🏗️ Arquitetura

- **Framework**: Flutter/Dart
- **Estado**: Provider pattern
- **API**: HTTP client com backend REST
- **Mapas**: Google Maps Flutter
- **UI**: Material Design 3

## 📞 Suporte

Projeto desenvolvido para a comunidade de Nova Cruz, RN.
Para reportar problemas, use o próprio sistema de denúncias do app.