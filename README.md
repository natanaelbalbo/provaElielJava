# Clever Task Manager - Sistema Completo

Um sistema completo de gerenciamento de tarefas desenvolvido com:
- **Backend**: Node.js, TypeScript, Express e SQLite 
- **Frontend**: React, TypeScript, Vite e Shadcn/UI

O sistema permite cadastro de usuários, autenticação segura via JWT, e gerenciamento completo de tarefas (criação, listagem, atualização de status e remoção).

## Arquitetura do Sistema

O sistema segue uma arquitetura cliente-servidor:

### Backend
- **Express**: Framework web para Node.js
- **TypeScript**: Linguagem de programação tipada
- **Sequelize**: ORM para comunicação com o banco de dados SQLite
- **JWT**: Para autenticação e autorização de usuários
- **Arquitetura em Camadas**: Controllers, Services, Models e Middlewares

### Frontend
- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Para tipagem estática
- **Vite**: Como bundler e ferramenta de desenvolvimento
- **Shadcn/UI**: Para componentes de interface prontos e estéticos
- **Fetch API**: Para comunicação com o backend

## Funcionalidades

- Cadastro e login de usuários
- Gerenciamento de tarefas:
  - Criação de novas tarefas
  - Listagem de todas as tarefas do usuário
  - Atualização do status (TODO, IN_PROGRESS, DONE)
  - Remoção de tarefas

## Requisitos

- Node.js (v16+)
- NPM ou Yarn

## Como rodar o sistema completo

### Backend

1. Navegue até a pasta raiz do projeto
   ```bash
   cd provaElielJava
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Inicie o servidor backend
   ```bash
   npm run start
   ```
   O servidor estará rodando em `http://localhost:3005`

### Frontend

1. Navegue até a pasta do frontend
   ```bash
   cd clever-task-manager-front-main
   ```

2. Instale as dependências
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento
   ```bash
   npm run dev
   ```
   O frontend estará acessível em `http://localhost:8080`

## Endpoints

### Autenticação

#### Registrar usuário

```
POST /api/auth/register
Content-Type: application/json

{
    "username": "seu_usuario",
    "password": "sua_senha"
}
```

Resposta de sucesso (201 Created):
```json
{
    "id": "uuid-gerado",
    "username": "seu_usuario",
    "createdAt": "2025-05-07T20:00:00.000Z"
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
    "username": "seu_usuario",
    "password": "sua_senha"
}
```

Resposta de sucesso (200 OK):
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Tarefas (Endpoints Protegidos)

Todos os endpoints abaixo requerem autenticação JWT. Inclua o cabeçalho `Authorization: Bearer <seu_token>` em todas as requisições.

#### Criar uma nova tarefa

```
POST /api/tasks
Authorization: Bearer <seu_token>
Content-Type: application/json

{
    "title": "Título da Tarefa",
    "description": "Descrição da tarefa",
    "status": "TODO"
}
```

Resposta de sucesso (201 Created):
```json
{
    "id": "uuid-gerado",
    "title": "Título da Tarefa",
    "description": "Descrição da tarefa",
    "status": "TODO",
    "createdAt": "2025-05-07T20:00:00.000Z",
    "updatedAt": "2025-05-07T20:00:00.000Z"
}
```

#### Listar todas as tarefas

```
GET /api/tasks
Authorization: Bearer <seu_token>
```

Resposta de sucesso (200 OK):
```json
[
    {
        "id": "uuid-1",
        "title": "Tarefa 1",
        "description": "Descrição da tarefa 1",
        "status": "TODO",
        "createdAt": "2025-05-07T20:00:00.000Z",
        "updatedAt": "2025-05-07T20:00:00.000Z"
    },
    {
        "id": "uuid-2",
        "title": "Tarefa 2",
        "description": "Descrição da tarefa 2",
        "status": "IN_PROGRESS",
        "createdAt": "2025-05-07T20:00:00.000Z",
        "updatedAt": "2025-05-07T20:00:00.000Z"
    }
]
```

#### Atualizar o status de uma tarefa

```
PUT /api/tasks/:id/status
Authorization: Bearer <seu_token>
Content-Type: application/json

{
    "status": "IN_PROGRESS"
}
```

Resposta de sucesso (200 OK):
```json
{
    "id": "uuid-1",
    "title": "Tarefa 1",
    "description": "Descrição da tarefa 1",
    "status": "IN_PROGRESS",
    "createdAt": "2025-05-07T20:00:00.000Z",
    "updatedAt": "2025-05-07T20:15:00.000Z"
}
```

#### Remover uma tarefa

```
DELETE /api/tasks/:id
Authorization: Bearer <seu_token>
```

Resposta de sucesso (204 No Content)

## Integração entre Frontend e Backend

A integração entre o frontend e o backend é realizada através de requisições HTTP, utilizando a Fetch API no frontend para comunicação com a API REST do backend.

### Configuração CORS

O backend está configurado para aceitar requisições do frontend através da configuração CORS:

```typescript
this.express.use(cors({
    origin: 'http://localhost:8080', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
```

### Autenticação

Toda a comunicação entre frontend e backend que requer autenticação utiliza tokens JWT:

1. O usuário se autentica através da rota `/api/auth/login`
2. O backend gera um token JWT
3. O frontend armazena o token no localStorage
4. Requisições subsequentes incluem o token no header `Authorization: Bearer <token>`

## Estrutura de Diretórios

### Backend

```
src/
├── controllers/      # Controladores que recebem requisições e retornam respostas
├── middlewares/      # Middlewares para processar requisições (ex: autenticação)
├── models/           # Definições de modelos do banco de dados
├── routes/           # Definição das rotas da API
├── services/         # Lógica de negócios
├── schema/           # Esquemas de validação
├── types/            # Definições de tipos TypeScript
├── app.ts            # Configuração da aplicação Express
├── database.ts       # Configuração da conexão com o banco de dados
├── routes.ts         # Registro central de rotas
└── server.ts         # Ponto de entrada da aplicação
```

### Frontend

```
src/
├── components/       # Componentes React reutilizáveis
├── contexts/         # Contextos React para gerenciamento de estado
├── hooks/            # Hooks personalizados
├── lib/              # Bibliotecas e utilitários
├── pages/            # Componentes de página
├── services/         # Serviços para comunicação com API
├── App.tsx           # Componente raiz da aplicação
└── main.tsx          # Ponto de entrada
```

## Exemplo de uso com curl

### 1. Registrar usuário

```bash
curl -X POST http://localhost:3005/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario", "password": "senha123"}'
```

### 2. Login

```bash
curl -X POST http://localhost:3005/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario", "password": "senha123"}'
```

Guarde o token retornado para usar nas próximas requisições.

### 3. Criar uma tarefa

```bash
curl -X POST http://localhost:3005/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"title": "Estudar TypeScript", "description": "Aprender os conceitos básicos", "status": "TODO"}'
```

### 4. Listar tarefas

```bash
curl -X GET http://localhost:3005/api/tasks \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 5. Atualizar status da tarefa

```bash
curl -X PUT http://localhost:3005/api/tasks/ID_DA_TAREFA/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"status": "IN_PROGRESS"}'
```

### 6. Remover uma tarefa

```bash
curl -X DELETE http://localhost:3005/api/tasks/ID_DA_TAREFA \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## Testes Automatizados

O projeto possui testes unitários para as principais regras de negócio dos serviços de tarefas, usuários e categorias, utilizando Jest.

### Como rodar os testes

1. Instale as dependências (caso ainda não tenha feito):
   ```bash
   npm install
   ```
2. Execute os testes:
   ```bash
   npm test
   ```

Os testes cobrem:
- Criação, listagem, busca, atualização e remoção de tarefas
- Registro e listagem de usuários
- Criação e listagem de categorias

Os testes utilizam mocks do Sequelize, não sendo necessário um banco de dados real para rodá-los.
