# API de Posts - Documentação Técnica

## 1. Visão Geral

Esta aplicação consiste em uma API REST desenvolvida em Node.js utilizando Express para gerenciamento de posts. ( Para apresentação de desafio técnico fase 2 FIAP)

A API permite:

* Listar posts;
* Buscar post por identificador;
* Pesquisar posts por texto;
* Criar posts;
* Atualizar posts;
* Remover posts logicamente.

A aplicação possui uma regra de negócio onde somente usuários com perfil de professor podem criar posts.

Regra:

```
tipo_perfil = P
```

Usuários com:

```
tipo_perfil = A
```

não possuem permissão para criação.

---

# 2. Tecnologias Utilizadas

## Backend

* Node.js
* Express
* PostgreSQL
* Docker
* Docker Compose

## Documentação

* Swagger/OpenAPI

## Testes

* Jest

## CI/CD

* GitHub Actions

---

# 3. Arquitetura

A aplicação utiliza arquitetura em camadas:

```
Cliente
   |
   v
Routes
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
PostgreSQL
```

Cada camada possui uma responsabilidade específica.

---

# 4. Estrutura do Projeto

```
App
|
├── src
│
├── config
│   ├── database.js
│   ├── container.js
│   └── swagger.js
│
├── controllers
│   └── post.controller.js
│
├── services
│   └── post.service.js
│
├── repositories
│   ├── post.repository.js
│   └── pessoa.repository.js
│
├── models
│   ├── post.model.js
│   └── pessoa.model.js
│
├── mappers
│   └── post.mapper.js
│
├── middlewares
│   └── error-handler.js
│
├── routes
│   └── posts.routes.js
│
└── server.js
```

---

# 5. Configuração Inicial

## Pré-requisitos

Necessário possuir instalado:

* Node.js
* Docker
* Docker Compose

---

# 6. Variáveis de Ambiente

Criar arquivo:

```
.env
```

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=post_app
```

---

# 7. Banco de Dados

O banco PostgreSQL é executado utilizando Docker Compose.

Subir o banco:

```bash
docker compose up -d
```

Configuração:

```yaml
postgres:
  image: postgres:17
```

O script inicial:

```
src/config/database-init.sql
```

é executado automaticamente na criação do container.

---

# 8. Instalação

Entrar na aplicação:

```bash
cd App
```

Instalar dependências:

```bash
npm install
```

---

# 9. Executar Aplicação

Executar:

```bash
npm start
```

API disponível em:

```
http://localhost:3000
```

---

# 10. Swagger

A documentação interativa está disponível em:

```
http://localhost:3000/api-docs
```

Permite:

* Visualizar endpoints;
* Testar requisições;
* Consultar modelos;
* Validar respostas.

---

# 11. Endpoints

## Listar Posts

```
GET /api/posts
```

---

## Buscar Post

```
GET /api/posts/:id
```

Exemplo:

```
GET /api/posts/1
```

---

## Pesquisar Posts

```
GET /api/posts/search?text=node
```

---

## Criar Post

```
POST /api/posts
```

Body:

```json
{
 "titulo":"Novo post",
 "conteudo":"Conteúdo",
 "criadoPor":1
}
```

Regra:

O usuário informado em `criadoPor` precisa possuir:

```
tipo_perfil = P
```

Caso contrário:

HTTP 403

Resposta:

```json
{
 "success":false,
 "message":"Apenas professores podem criar posts. :)"
}
```

---

## Atualizar Post

```
PUT /api/posts/:id
```

Body:

```json
{
 "titulo":"Novo título",
 "conteudo":"Novo conteúdo"
}
```

---

## Remover Post

```
DELETE /api/posts/:id
```

A remoção é lógica.

O campo:

```
is_deleted
```

é alterado para:

```
true
```

---

# 12. Tratamento de Erros

Todos os erros seguem o padrão:

```json
{
 "success":false,
 "message":"Mensagem do erro"
}
```

Erros conhecidos utilizam:

```
AppError
```

Exemplos:

404:

```json
{
 "success":false,
 "message":"Post não encontrado"
}
```

403:

```json
{
 "success":false,
 "message":"Apenas professores podem criar posts. :)"
}
```

---

# 13. Organização das Dependências

O arquivo:

```
src/config/container.js
```

é responsável pela criação das dependências.

Fluxo:

```
Repository
     |
     v
Service
     |
     v
Controller
```

Benefícios:

* Menor acoplamento;
* Facilita testes;
* Organização das responsabilidades.

---

# 14. Testes

Framework utilizado:

```
Jest
```

Executar:

```bash
npm test
```

Os testes validam regras da camada Service.

---

# 15. GitHub Actions

Workflow:

```
.github/workflows/tests.yml
```

Executa:

1. Checkout do código;
2. Configuração do Node.js;
3. Instalação das dependências;
4. Execução dos testes.

Fluxo:

```
git push
   |
GitHub Actions
   |
npm test
```

---

# 16. Boas Práticas Aplicadas

* Separação de responsabilidades;
* Repository Pattern;
* Service Layer;
* Mapper Pattern;
* Variáveis de ambiente;
* Docker para ambiente local;
* Tratamento centralizado de erros;
* Swagger;
* Testes automatizados;
* Integração contínua.

---

# 17. Possíveis Evoluções

* Autenticação JWT;
* Middleware de autorização;
* Testes de integração;
* Logs estruturados;
* Deploy automatizado;
* Paginação em retornos;
