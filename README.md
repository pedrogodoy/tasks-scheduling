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
#### Coleções para testar (opcional)
Caso você utilize algum programa como o [Insomnia](https://insomnia.rest/download) ou [Postman](https://www.postman.com/downloads/) para testar os endpoints, você pode importar o arquivo `insomnia_export.json` com todos os endpoints do projeto para teste.

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

<br><br>
PS: A rotina de notificação faz apenas uma simulação de envio das tarefas pendentes enviando o id do usuário e a descrição da tarefa no horário. Com o serviço implementado, podemos fazer futuras implementações de acordo com o cliente (push notification, email, SMS, etc):

<img width="639" alt="image" src="https://github.com/pedrogodoy/tasks-scheduling/assets/25281604/71957102-678f-4aa9-b246-6bf18f9d3835">
