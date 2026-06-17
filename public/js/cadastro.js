//Esta constante armazenará os parametros encontrado através da URL
const parametros = new URLSearchParams(window.location.search);

//Esta constante irá armazenar o valor que vier junto a chave "erro" na URL
const erro = parametros.get('erro');

//Caso, em nossa URL, a chave e valor se presentem como: erro=email, quer dizer qeue o e-mail do usuario ja esta presente no banco de dados
//Desta forma, o usuario receberá um aviso visual, acima do formulario de cadastro, informando que o e-mail já está cadastrado
if(erro === "email"){
    document.getElementById("mensagem").innerHTML = `
    <div class="mensagem-erro">
        Este e-mail já está cadastrado
    </div>`;
}