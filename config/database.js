//aqui criamos a conexão com o banco de dados

//importa o mysql
const mysql = require('mysql2/promise');

//carrega as variaveis do .env
require("dotenv").config();

//Criando a conexão com o banco
const conexao = mysql.createPool({
    //Estamos pegando od dados do arquivo .env
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Exporta a conexão 
module.exports = conexao