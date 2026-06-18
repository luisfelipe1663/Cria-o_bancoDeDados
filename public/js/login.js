//Constante que buscara as informações na URL para erro, sucesso e outros processos
const parametros = new URLSearchParams(window.location.search);

//Caso ele receba "erro" vindo da URL
const erro = parametros.get('erro');

//Caso ele receba "cadastro" vindo da URL
const cadastro = parametros.get('cadastro');

//"erro" e "cadastro", serão as CHAVES. Agora precisamos testar as condições dos valores para cada uma delas.

//Aqui, caso em nossa URL apareça o query param =cadastro=sucesso,
//O usuario verá uma mensagem acima do formulario de login, dizendo que ele já pode fazer a realização do login, confirmando o cadastro bem sucedido.
if (cadastro === "sucesso"){
    document.getElementById("mensagem").innerHTML = `
    <div class="mensagem-sucesso">
    Cadastro realizado com sucesso!Faça login para continuar.
    </div>
    `;
}
//Neste caso, se ao realizar o login, o usuario digitar a senha incorreta, a URL recebera a chave e valor como erro=login, indicando falha nesta etapa.
//Desta forma, aparecerá uma mensagem informando o erro, acima do formulario de login
if(erro ==="login"){
    document.getElementById("mensagem").innerHTML = `
    <div class="mensagem-erro">
    E-mail ou senha invalidos</div>`
}