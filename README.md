# O que foi feito

Ler [PDF sobre a ideia](ideia.pdf).

## Setup

Uma variável ambiente chamada `POSTGRES_URL` com a connection string do banco de dados Postgres para rodar a aplicação.
Localmente, para rodar a aplicação, instalar o PostgreSQL e se a senha do banco local for 1234 nenhuma configuração adicional é necessária.

## Stack

Foi usado TypeScript no código e PostgreSQL como banco de dados. Kysely foi usado como ORM.

## 1. Migrations

Criada uma sub aplicação para fazer as migrations do banco de dados. É possível rodar ela usando `npm run db:migrate`, esse comando roda as migrations e também gera as classes de acordo com a base de dados gerada.

## 2. Repository

Foi usado o design de repository para comunicação com o banco de dados.

### 2.1. Eventos

Eventos representam ações do usuário dentro do sistema.

- [x] Registrar evento pra um usuário
- [x] Ler evento
- [x] Listar eventos de usuário

### 2.2. Conquistas

As conquista são as metas a serem atingidas.

- [x] Criar conquista
    - Conquistas podem ser incrementais ou não
    - Conquistas podem ser secretas ou não
- [x] Ler conquista
- [x] Editar conquista
- [x] Apagar conquista
- [x] Listar conquistas
- [x] Desbloquear conquista
- [x] Incrementar conquista
- [x] Pegar progresso de conquista de usuário
- [x] Listar progresso de conquistas do usuário

## 3. Endpoints

Foi criado somente alguns endpoints bem limitados para testar os controladores.

- [x] `POST /api/achievement` cria uma nova conquista
- [x] `GET /api/achievement` lista todas as conquistas criadas
- [x] `GET /api/achievement/:id` le a conquista referente ao id passado
- [x] `GET /api/achievement/:id` le a conquista referente ao id passado
- [x] `GET /api/me` lista as conquistas do usuário e seus progressos
- [x] `POST /api/reading` registra o progresso incremental de 1 na conquista de ID 1

## 4. Front

Foi criada uma única página de front que lista as conquistas disponíveis e as últimas conquistas do usuário.