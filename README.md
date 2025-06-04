# API de Gerenciamento de Tarefas

API de gerenciamento de tarefas desenvolvida com Node.js, TypeScript e Express. Permite o cadastro, listagem, atualização e remoção de tarefas, além de autenticação via JWT.

## Funcionalidades

- Cadastrar tarefas
- Listar todas as tarefas
- Atualizar o status de uma tarefa
- Remover uma tarefa
- Autenticação de usuários usando JWT

## Requisitos

- Node.js (v16+)
- NPM

## Como rodar a aplicação localmente

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm start`

O servidor estará rodando em `http://localhost:3005`.

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

## Exemplo de uso com curl

### 1. Registrar usuário

```bash
curl -X POST http://localhost:3002/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario", "password": "senha123"}'
```

### 2. Login

```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "usuario", "password": "senha123"}'
```

Guarde o token retornado para usar nas próximas requisições.

### 3. Criar uma tarefa

```bash
curl -X POST http://localhost:3002/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"title": "Estudar TypeScript", "description": "Aprender os conceitos básicos", "status": "TODO"}'
```

### 4. Listar tarefas

```bash
curl -X GET http://localhost:3002/api/tasks \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 5. Atualizar status da tarefa

```bash
curl -X PUT http://localhost:3002/api/tasks/ID_DA_TAREFA/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"status": "IN_PROGRESS"}'
```

### 6. Remover uma tarefa

```bash
curl -X DELETE http://localhost:3002/api/tasks/ID_DA_TAREFA \
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

Os testes utilizam mocks do Mongoose, não sendo necessário um banco de dados real para rodá-los.
