# OnlyCifra (GsusPlay)

> Aplicativo mobile completo para músicos, ministérios de louvor e bandas. Gerenciamento e transposição de cifras em tempo real, organização de repertórios/playlists, gestão de equipes e sincronização em nuvem.

---

## Visão Geral

O **OnlyCifra** (também identificado como **GsusPlay**) foi desenvolvido para solucionar as dores de músicos e líderes de bandas/ministérios de louvor no palco e nos ensaios. 

Com ele, o músico pode:
- **Visualizar e Transpor Cifras:** Troca imediata de tom musical com cálculo harmônico automático sem quebrar a métrica da letra.
- **Gerenciar Repertórios / Playlists:** Montagem de listas de músicas individuais ou compartilhadas com o time da apresentação.
- **Gestão de Grupos e Ministérios:** Criação de grupos com código de convite seguro, com papéis de acesso (**Admin** e **Membro**).
- **Planos e Limites de Assinatura:** Regras de negócio que controlam a quantidade de grupos e recursos por plano.
- **Sincronização em Tempo Real:** Dados sincronizados instantaneamente entre os integrantes utilizando o ecossistema Google Firebase.

---

## Tecnologias e Bibliotecas

| Categoria | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Core Framework** | [React Native](https://reactnative.dev/) + [Expo 54](https://expo.dev/) | Desenvolvimento multiplataforma moderno com Nova Arquitetura ativada |
| **Roteamento** | [Expo Router v6](https://docs.expo.dev/router/introduction/) | Navegação estruturada e tipada baseada no sistema de arquivos |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | Tipagem estática, interfaces e contratos de dados sólidos |
| **Estilização** | [NativeWind v4](https://www.nativewind.dev/) (TailwindCSS) | Estilização ágil utilitária, responsiva e com suporte a temas |
| **Componentes UI** | [React Native Paper](https://callstack.github.io/react-native-paper/) | Componentes Material Design, temas consistentes e acessibilidade |
| **Backend & BaaS** | [Google Firebase](https://firebase.google.com/) | Autenticação, Cloud Firestore e Cloud Functions |
| **Serverless Backend** | [Firebase Cloud Functions v2](https://firebase.google.com/docs/functions) | Regras de negócio sensíveis em Node 22 (transações, convites, permissões) |
| **Gerenciamento de Estado** | React Context API + [Zustand](https://github.com/pmndrs/zustand) | Controle global de sessão, autenticação e permissões do usuário |
| **Criptografia & Utils** | `bcryptjs`, `uuid`, `dayjs`, `expo-crypto` | Hashing seguro de senhas, UUIDs e manipulação de datas |

---

## Arquitetura do Projeto

O projeto segue padrões de **Domain-Driven Design (DDD)** e arquitetura em camadas, separando regras de domínio, serviços de infraestrutura e interfaces de usuário.

```text
OnlyCifra/
├── app/                           # Telas e Rotas da aplicação (Expo Router)
│   ├── (auth)/                    # Fluxo de Autenticação
│   │   ├── index.tsx              # Tela de Login com e-mail/senha
│   │   ├── register.tsx           # Cadastro de usuário com validação completa
│   │   └── forgotPassWord.tsx     # Recuperação de senha via e-mail
│   ├── (menu)/                    # Telas secundárias acessadas via menu
│   │   ├── chordDetailsScreen.tsx # Visualização expandida da cifra
│   │   ├── groupScreen.tsx        # Administração e membros do grupo
│   │   ├── tutorialScreen.tsx     # Guia prático de utilização
│   │   └── userProfileScreen.tsx  # Edição de dados do perfil
│   ├── (tabs)/                    # Telas principais na barra inferior de abas
│   │   ├── _layout.tsx            # Layout das abas de navegação
│   │   ├── index.tsx              # Dashboard inicial (visão geral, atalhos)
│   │   ├── songsList.tsx          # Biblioteca geral de músicas/cifras
│   │   └── playListTeam.tsx       # Playlists e repertórios da equipe
│   ├── chord/
│   │   └── [id].tsx               # Visualizador interativo de cifra (transposição de tom)
│   ├── editChord/
│   │   └── [id].tsx               # Editor de cifras, letras e acordes
│   ├── favoriteList/
│   │   └── [id].tsx               # Músicas marcadas como favoritas
│   ├── userProfile/
│   │   └── [id].tsx               # Perfil público de integrantes
│   └── _layout.tsx                # Provedor raiz (Tema, AuthContext, PaperProvider)
│
├── components/                    # Componentes visuais modulares e reutilizáveis
│   ├── chordData/                 # Formulários e metadados de cifra
│   ├── chordDetails/              # Visualizador com controle de rolagem e tom
│   ├── confirmationModal/         # Diálogos modais de confirmação
│   ├── customButton/              # Botões estilizados padronizados
│   ├── dashboardButton/           # Cartões de ação rápida da Home
│   ├── infoRow/                   # Linhas de exibição de dados de perfil
│   ├── loading/                   # Feedback visual de carregamento
│   ├── playlistRadiusModal/       # Seleção e vinculação de playlists
│   ├── profile/                   # Avatar, informações e redes sociais
│   ├── searchBar/                 # Barra de busca com debounce
│   └── selectModal/               # Modais de seleção múltipla ou única
│
├── context/                       # Provedores de contexto globais
│   ├── AuthContext.tsx            # Estado da sessão Firebase (token, usuário ativo, logout)
│   ├── PermissionContext.tsx      # Controle de permissões baseado no papel (Admin / Membro)
│   └── CredentialsContext.tsx     # Armazenamento seguro de credenciais
│
├── functions/                     # Backend Serverless (Firebase Cloud Functions v2)
│   ├── src/
│   │   └── index.ts               # Lógica segura de grupos: createGroup, inviteToGroup, etc.
│   ├── package.json
│   └── tsconfig.json
│
├── libs/                          # Camada de Negócio e Domínio da Aplicação
│   ├── domain/                    # Modelos orientados a objetos
│   │   ├── Chord/                 # Entidade Cifra (título, tom original, estrofes, autor)
│   │   ├── Group/                 # Entidade Grupo (nome, integrantes, código de convite)
│   │   ├── PlayList/              # Entidade Repertório/Lista de músicas
│   │   ├── Plan/                  # Entidade Plano de Assinatura (regras e limites)
│   │   ├── Audit/                 # Registro de auditoria de alterações
│   │   ├── users/                 # Entidades User e Member (com hash de senha)
│   │   └── GenericCrud/           # Abstração genérica para operações Firestore
│   ├── enuns/                     # Enumerações de regras de negócio
│   │   ├── Role.ts                # Papéis de acesso (ADMIN, MEMBER)
│   │   ├── Plan.ts                # Níveis de assinatura
│   │   ├── PlayListType.ts        # Tipos de lista (INDIVIDUAL, GROUP)
│   │   └── Tones.ts               # Escala cromática de tons musicais
│   └── utils/                     # Motores utilitários
│       ├── ChordUtils.ts          # Algoritmo de transposição harmônica de tons
│       ├── StringUtils.ts         # Sanitização e máscaras de texto
│       ├── ColorUtils.ts          # Paleta e contraste visual
│       └── formatDateBr.ts        # Padronização de datas no formato pt-BR
│
├── service/                       # Camada de Integração com Firebase
│   ├── firebase.ts                # Inicialização do Firebase Client com variáveis de ambiente
│   ├── auth-service.ts            # Métodos de login, logout e sessão
│   ├── UserService.ts             # Persistência de usuários no Firestore
│   ├── ChordService.ts            # Operações de cifras (busca, inclusão, edição)
│   ├── GroupService.ts            # Gestão de grupos e membros
│   ├── PlayListService.ts         # Operações de playlists
│   └── createGroupOnClient.ts     # Invocação das Cloud Functions
│
├── assets/                        # Ícones, splash screens e logotipos do app
├── .env.example                   # Modelo público das variáveis de ambiente necessárias
├── app.json                       # Manifesto de configuração do Expo
├── tailwind.config.js             # Configurações de design e cores do NativeWind
└── tsconfig.json                  # Configurações do compilador TypeScript
```

---

## Configuração e Instalação

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 20 LTS ou 22 recomendada)
- Gerenciador de pacotes `npm` ou `yarn`
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- Dispositivo físico com aplicativo **Expo Go** ou emulador Android/iOS configurado

### 2. Clonando o Repositório
```bash
git clone https://github.com/SEU_USUARIO/OnlyCifra.git
cd OnlyCifra
```

### 3. Instalando as Dependências
```bash
npm install
```

### 4. Configurando as Variáveis de Ambiente
Copie o arquivo [.env.example](file:///F:/TECHNOSOU/App%20Mobiles/OnlyCifra/.env.example) para `.env`:
```bash
cp .env.example .env
```

Preencha as variáveis com as chaves do seu projeto Firebase no console:
```env
# Firebase Client SDK
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSy...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Configurações do App
EXPO_PUBLIC_NAME_APP=GsusPlay
EXPO_PUBLIC_SUPPORT_NAME=Suporte
EXPO_PUBLIC_SUPPORT_PHONE=21999999999
```

---

## 🏃 Como Executar

### Iniciar o servidor de desenvolvimento
```bash
npx expo start
```

No terminal, pressione:
- `a` para abrir no emulador **Android**
- `i` para abrir no simulador **iOS** (macOS)
- `w` para abrir a versão **Web**
- Ou escaneie o **QR Code** no aplicativo Expo Go no seu celular.

### Executar as Cloud Functions (Localmente)
Caso deseje testar as funções serverless localmente:
```bash
cd functions
npm install
npm run serve
```

---

## Segurança e Boas Práticas

- **Zero Chaves Hardcoded:** Todas as credenciais de Firebase, tokens de ReCaptcha e URLs dinâmicas são carregadas via variáveis protegidas `EXPO_PUBLIC_*`.
- **Git Ignore Blindado:** Arquivos `.env`, `.firebaserc`, pastas nativas geradas (`android/`, `ios/`), keystores e arquivos de debug do Firebase estão estritamente ignorados no [.gitignore](file:///F:/TECHNOSOU/App%20Mobiles/OnlyCifra/.gitignore).
- **Transações Atômicas:** Operações críticas de grupos e adesão de membros usam transações no Firestore com verificação de plano ativo para evitar inconsistências.

---

## Licença

Este projeto é de uso privado. Todos os direitos reservados à equipe de desenvolvimento.
