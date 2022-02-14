let nome = prompt("Qual o seu nome?");

entrarNaSala ()

function entrarNaSala () {
    
    //let nome = prompt("Qual o seu nome?");

    const objeto = {
        name: nome
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objeto);

    promise.then(buscarMensagens)
    
    promise.catch(nomeInvalido);
}

function nomeValido(response) {
  console.log(response.data)
}

function nomeInvalido(erro) {
    const statusCode = erro.response.status
    console.log(statusCode)
    alert("deu ruim, esse nome ja foi cadastradado");
    entrarNaSala ()
}

//Função para limpar as mensagens de 3 em 3 segundos (evitar travamento)//

function limparMensagens (){
    const section = document.querySelector(".mensagens")
    section.innerHTML = " ";
}

//Função para buscar as mensagens da API//

function buscarMensagens () {

    const promise = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages")

    promise.then(imprimirMensagens)
}

function mostrarRespostarDoServidor(response) {
    console.log(response.data)
}

//Função para imprimir na tela as mensagens vindas do servidos//

function imprimirMensagens (response) {
    let mensagens = response.data
    limparMensagens ()
    for (let i = 0; i < mensagens.length; i++) {
        const mensagem = mensagens[i]
        const section = document.querySelector(".mensagens")

        section.innerHTML += `<div class="mensagem ${mensagem.type}">
        <p class="horario">${mensagem.time}</p>
        <p class="nome">${mensagem.from}</p>
        <p class="para">para</p>
        <p class="nome">${mensagem.to}</p>
        <p class="texto">${mensagem.text}</p>
        </div>`
        
    }
    const atualizar = document.querySelector(".mensagens:last-child");
    atualizar.scrollIntoView({block: "end", behavior: "smooth"});
}

//Função para checar se o usuário está online ou off //

function checarStatus () {

    const objeto = {
        name: nome
    };

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", objeto);

    promise.then(statusOk)
    promise.catch(statusOff)
}

function statusOk (response) {
    console.log(response.data)
}

function statusOff (erro) {
    console.log(erro.response)
     window.location.reload()
     alert("Você está Offline e foi desconectado da sala!")
}

function enviarMensagem () {
    let enviarTexto = document.querySelector("input").value

    let postagem = {
        from: nome,
        to: "Todos",
        text: enviarTexto,
        type: "message"
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages", postagem);

    promise.then(enviarMensagemoK)
    promise.catch(enviarMensagemErro)
    
    buscarMensagens ()
    //limparInput ()
    
}

function enviarMensagemoK () {
    console.log("Tudo Certo");
    limparInput ()
}

function enviarMensagemErro (erro) {
   console.log(erro.response)
   alert("Algo deu errado, tente novamente, você pode ter sido desconectado!")
}

function limparInput () {
    let enviarTexto = document.querySelector("input")

    enviarTexto.value = "";
}

 /*Atualizar Mensagens*/

let intervaloMensagens = setInterval(buscarMensagens, 3000);
let intervaloChecagem = setInterval(checarStatus, 5000)

/*Atualizar Menasgens*/
