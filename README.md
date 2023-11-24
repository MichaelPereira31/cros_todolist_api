
<h1 align="center">Cros todolist API</h1>

<h3>Pré-requisitos</h3>
<ul>
  <li>Docker</li>
  <li>Docker Compose</li>
  <li>Passos para Executar</li>
</ul>

<h3>Passos para Executar</h3>

<h4>Clonar o Repositório</h4>
    
 > git clone https://github.com/MichaelPereira31/cros_todolist_api.git

<h4>Configurar as Variáveis de Ambiente</h4>
 - Copie o arquivo .env.example para .env e adicione as configurações necessárias.

<h4>Rodar o Docker Compose</h4>
 > docker-compose up --build # ou docker compose up --build

<h4>Rodando os Testes</h4>
 > npm test # ou yarn test

<h4>Documentação da API</h4>
 <p> A documentação da API está disponível no seguinte endpoint:</p>
 - http://localhost:3333/api/docs

