//Importa o express
const express = require('express');

//Importa o modulo Path
const path = require('path');

//Carrega as variaveis do arquivo .env
require("dotenv").config();

//Importa as funções do controller
const{
    cadastrarUsuario,
    realizarLogin,
    exibirSucesso} = require("./controllers/authController");

//Cria a aplicação express
const app = express();

//Importa a conexão do banco de dados
const conexao = require("./config/database");

//Testa a conexão com o banco de dados
conexao.getConnection()
.then(() => {
console.log("banco de dados conectado com sucesso");
})
.catch((erro) =>{
    console.log("Erro ao conectar o banco de dados", erro)
});

//Define a porta do servidor
const PORT = process.env.PORT || 3000

//Middleware para ler dados enviados por formularios HTML
app.use(express.urlencoded({extended: true}));

//Middleware para ler dados em JSON
app.use(express.json());

//Middleware para servir arquivos estaticos da pasta public
app.use(express.static(path.join(__dirname, "public")));

//Rota inicial: redireciona o usuario para a tela de login
app.get("/",(req, res) =>{
    res.redirect("/login.html");
});

//Definição dos Endpoints
app.post("/cadastro", cadastrarUsuario);
app.post("/login", realizarLogin);
app.get("/sucesso", exibirSucesso);

//Inicialização do servidor
app.listen(PORT, () =>{
    console.log(`Servidor rodandi em http://localhost:${PORT}`);
});