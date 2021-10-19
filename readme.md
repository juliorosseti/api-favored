<p align="center">
  <img src="http://abneroliveira.eti.br/wp-content/uploads/2020/01/nodejs-logo-png-node-js-development-296.png" height="150" alt="NodeJS logo">
</p>

---

API desenvolvida para fins de estudo/teste, onde é necessário gerenciar uma base de Favorecidos em REST.

A aplicação foi estruturada com padrões SOLID e organizada com modelo `package by feature`.

A linguagem usada para o desenvolvimento foi Node, utilizando o framework Express. Também foi utilizado TypeScript & MySQL como database.

## Exemplos

### Listar todos os registros

```bash
curl --request GET \
     --url 'http://localhost:3333/favoreds?page=1&orderByKey=cpf&orderBy=DESC' \
     --header 'Content-Type: application/json'
```

### Busca informações dos registros

> Campos de busca: "Nome", "CNPJ/CPF", "Agência" ou "Conta corrente"

```bash
curl --request GET \
     --url 'http://localhost:3333/favoreds?search=julio' \
     --header 'Content-Type: application/json'
```

### Adiciona um novo registro

```bash
curl --request POST \
     --url http://localhost:3333/favoreds \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "julio",
         "email": "julio@rosseti.xyz",
         "cnpj": 12345678912345,
         "status": "draft",
         "bankCompe": "237",
         "bankAgency": "1",
         "bankAgencyDigit": "",
         "bankAccountType": "CONTA_POUPANCA",
         "bankAccountNumber": "1234555",
         "bankAccountDigit": "2"
     }'
```

### Atualiza um registro existente

```bash
curl --request PUT \
     --url http://localhost:3333/favoreds/20a2bbfc-3e5c-43e1-9191-4870f6ae167e \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "julio",
         "email": "juliorosseti@gmail.com",
         "cnpj": 12345678912345,
         "status": "draft",
         "bankCompe": "001",
         "bankAgency": "313",
         "bankAgencyDigit": "4",
         "bankAccountType": "CONTA_POUPANCA",
         "bankAccountNumber": "1234",
         "bankAccountDigit": "2"
     }'
```

### Deleta um registro existente

```bash
curl --request DELETE \
     --url http://localhost:3333/favoreds \
     --header 'Content-Type: application/json' \
     --data '{
         "uuid": ["8f116857-5110-4cbb-ba75-208ff096e134"]
     }'
```

## Pré configuração

A aplicação utiliza conexão com o banco de dados MySQL, por esse motivo, é necessário duplicar o arquivo `.env.local` para `.env` e alterar as configurações necessárias.

## Configuração

A aplicação utiliza o [`Yarn`](https://yarnpkg.com/) para gerenciamento de suas dependências.

Você pode instalar o Yarn através do comando abaixo:

```bash
npm i -g yarn
```

> Necessário Node >= 16

Após a instalação e [configuração da API](#pré-configuração), realize a instalação das dependências da aplicação.

Utilize o comando abaixo para realizar a instalação das dependências

```bash
yarn install
```

Criando a estrutura no banco:

```bash
npx sequelize db:migrate
```

Adicionando registros 'fakes' para popular a base com 30 registros

```bash
npx sequelize db:seed:all
```

## Scripts disponíveis

### Executar a aplicação em modo de desenvolvimento

Uma janela do navegador se abrirá com a aplicação rodando no endereço [http://localhost:3333](http://localhost:3333).

Toda alteração executada no código resultará no recarregamento da página.

```bash
yarn start
```

### Executar a suíte de testes

Executa a suíte de testes da aplicação em modo iterativo. (ainda não finalizado)

```bash
yarn test:watch
```
