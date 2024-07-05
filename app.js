let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // aqui se define a lingua e a velocidade da voz com rate
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial() {
    exibirTextoNaTela('h1' , 'Jogo do número secreto');
    exibirTextoNaTela('p' , 'Escolha um número entre 1 e 10');
}

exibirMsgInicial();

function verificarChute() {
    // .value para pegar o valor do input
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? ' tentativas' : ' tentativa';
        let mensagemTentativas = 'Você descobriu o número secreto com ' + tentativas + palavraTentativa + '!';
        exibirTextoNaTela('p', mensagemTentativas);
        // getElemntById pega o elemento pelo id inserido no HTML
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p' , 'O número secreto é menor!');
        }else {
            exibirTextoNaTela('p' , 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    // length mostra o tamanho da total da lista
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // includes verifica se o elemento está na lista e se tiver é verdadeiro
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        // pop remove o último item da lista
        // push adiciona item no final da lista
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    // o get seleciona o campo e o set define um novo atributo ao campo, estando habilitado ou não (true ou false)
    document.getElementById('reiniciar').setAttribute('disabled', true);
}