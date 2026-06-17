//Importa a conexão com o banco de dados
const conexao = require("../config/database");

//Função responsavel por cadastrar um novo usuario
async function cadastrarUsuario(req, res) {
    try{
        //Captura os dados vindos do formulario de cadastro
        const {nome, email, senha}= req.body;

        //Valida se todos os campos foram preenchidos
        if(!nome || !email||!senha){
            return res.send(`<h1>Erro ao realizar cadastro</h1>
                <p>Preencha todos os campos</p>
                <a href="/cadastro.html">Voltar</a>`)
        };
        //Valida se já existe um usuario com o mesmo e-mail
        const [usuarioExistente] = await conexao.query(
            'SELCT *FROM usuario WHERW email = ?', [email]
        );

        //Se o usuario já existir, redireciona para cadastro com mensagem de erro
        if(usuarioExistente.length>0){
             return res.redirect("/cadastro.html?erro=email");
        }

        //Cadastra o usuario no banco de dados
        await conexao.query(
            'INSERT INTO usuario(nome, email, senha) VALUES(?,?,?)',
            [nome, email, senha]
        );
        //Redireciona para a tela de login com o aviso de cadastro bem sucedido
        res.redirect("/login.html?cadastro=sucesso")
    } catch(erro){
        console.log("Erro oa cadastrar usuario", erro);
        res.send("erro ao cadastrae usuario");
    }
}

//Função para realizar o login de usuario
async function realizarLogin(req, res){
    try{
        //Captura os dados vindo do corpo da requisição(formulario)
        const {email, senha} = req.body;

        //Busca o usuario no banco de dados com base no e-mail e senha informados na tela de Login
        const[usuarios] = await conexao.query(
            'SELECT * FROM usuario WHERE email = ? AND senha =?'
            [email,senha]
        );

        //Se não encontrar usuario, redireciona a pagina de login com a mensagem de erro
        if(usuarios.length === 0){
            return res.redirect("/login.html?erro=login");
        }
        //Pega o usuario encontrado, caso exista.
        const usuario = usuarios[0];
        
        //Redireciona para a pagina de sucesso
        res.redirect(`/sucesso?=nome${usuario.nome}`);
    } catch(erro){
        console.log("Erro ao realizar o login", erro);
        res.send("Erro ao realizar o login");
    }
}
//Função responsável por exibir a pagina de sucesso
function exibirSucesso(req, res){
    const nome= req.query.nome;
     res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login realizado</title>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <main class="container">
        <section class="card">
          <h1>Login realizado com sucesso!</h1>
          <p>Bem-vindo(a), ${nome}.</p>
          <a class="link-button" href="/login.html">Voltar para o login</a>
        </section>
      </main>
    </body>
    </html>
  `);

}
module.exports = {
    cadastrarUsuario,
    realizarLogin,
    exibirSucesso
};