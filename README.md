### API de agendamento de tarefas

#### Tecnologias utilizadas
- NestJs
- TypeORM
- SQLite
- Swagger
<br><br>

#### Setup
Para executuar o projeto, você precisar ter o [Node](https://nodejs.org) instalado e executar os seguintes comandos:
<br><br>

Instalando as dependências
```console
  npm install
```

Executando os testes
```console
  npm run test
```

Executando a aplicação
```console
  npm run start
```

<br><br>
#### Documentação da API
A documentação da API é feita via Swagger, para verificar os endpoints disponíveis, basta acessar [http://localhost:3000/api](http://localhost:3000/api) com a api em execução.

<br><br>
#### Requisitos
##### 1. Modelo de Dados e Banco de Dados:
[✔️] - Criar um modelo de dados para as tarefas, que inclua campos como descrição, data e hora de conclusão.
<br><br>

##### 2. Criação e Armazenamento de Tarefas:
[✔️] - Implementar um endpoint na API que permita aos usuários criar tarefas.

[✔️] - Assegurar que as informações das tarefas sejam armazenadas no banco de dados.
<br><br>

##### 3. Exclusão de Tarefas:
[✔️] - Implementar um endpoint na API que permita aos usuários excluir tarefas pendentes.

[✔️] - Garantir que ao excluir uma tarefa, ela seja removida do banco de dados e que qualquer notificação agendada relacionada a essa tarefa seja cancelada.
<br><br>

##### 4. Autenticação e Segurança:
[✔️] - Implementar um sistema de autenticação para que os usuários possam fazer login de forma segura (por exemplo, utilizando tokens JWT ou OAuth 2.0).

[✔️] - Assegurar que apenas usuários autenticados possam criar, visualizar e excluir suas próprias tarefas.
<br><br>

##### 5. Framework:
[✔️] - Utilizar Nestjs
