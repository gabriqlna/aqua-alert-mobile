# 📂 Lista de Arquivos para Upload no GitHub

## ✅ Arquivos Essenciais (Upload obrigatório)

### Código Principal
- `lib/main.dart` - App principal
- `lib/models/neighborhood_model.dart` - Modelo de dados
- `lib/services/api_service.dart` - Integração com API
- `lib/providers/data_provider.dart` - Gerenciamento de estado
- `lib/screens/home_screen.dart` - Tela inicial
- `lib/screens/map_screen.dart` - Mapa interativo
- `lib/screens/report_screen.dart` - Sistema de denúncias
- `lib/screens/admin_screen.dart` - Painel administrativo

### Configurações
- `pubspec.yaml` - Dependências Flutter
- `pubspec.lock` - Versões fixas
- `README.md` - Documentação

### Build Automático
- `.github/workflows/build-apk.yml` - Compilação automática

### Android
- `android/app/src/main/AndroidManifest.xml` - Configurações do app
- `android/app/build.gradle` - Build Android
- `android/gradle.properties` - Propriedades Gradle

## 📱 Como Fazer Upload

### No GitHub App:
1. Crie novo repositório: `aqua-alert-mobile`
2. Toque "Upload files"
3. Selecione os arquivos listados acima
4. Commit: "AquaAlert Flutter App - Nova Cruz RN"

### Estrutura Final no GitHub:
```
aqua-alert-mobile/
├── .github/
│   └── workflows/
│       └── build-apk.yml
├── android/
│   ├── app/
│   └── gradle/
├── lib/
│   ├── models/
│   ├── providers/
│   ├── screens/
│   ├── services/
│   └── main.dart
├── pubspec.yaml
├── pubspec.lock
└── README.md
```

## 🚀 Após Upload

O GitHub Actions irá automaticamente:
1. Detectar o projeto Flutter
2. Compilar APK release
3. Disponibilizar download em "Actions" → "Artifacts"

Tempo estimado: 5-10 minutos para build completo.

## 📍 Coordenadas Incluídas

Nova Cruz, RN - Bairros mapeados:
- Centro: -5.6786, -35.4270
- Bairro Norte: -5.6750, -35.4250
- Bairro Sul: -5.6820, -35.4290
- Zona Rural: -5.6850, -35.4200