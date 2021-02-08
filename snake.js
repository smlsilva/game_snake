let totalMacaAte = 0;
let totalDistanceTravelled = 0;

const containerPrincipal = document.getElementById("containerPrincipal");

const createGameBoardPixel = () => {
    // Preencha o div [#containerPrincipal] com pequenos div's que representam os pixels do jogo
    for (let i = 0; i <= 1600; i++){
        containerPrincipal.innerHTML = `${containerPrincipal.innerHTML} <div class="pixelDeTabuleiro" id="pixel${i}"></div>`;
    }
}
// Esta variável sempre contém a matriz atualizada de pixels do jogo criada por createGameBoardPixels ():
const pixelDeTabuleiro = document.getElementsByClassName("pixelDeTabuleiro");


let macaPosition = 0; // inicializado com 0
const createMaca = () => {
    // Remove Maca prevista
    pixelDeTabuleiro[macaPosition].classList.remove("maca")

    // criando uma nova maçã
    macaPosition = Math.random();
    macaPosition = Math.floor(macaPosition * 1600);
    pixelDeTabuleiro[macaPosition].classList.add("maca");
}

// Códigos de direção (Teclas do teclado)
const _DIR_ESQUERDA = 37;
const _DIR_CIMA = 38;
const _DIR_DIREITA = 39;
const _DIR_BAIXO = 40;

let direcaoAtual = _DIR_ESQUERDA;

const mudeDeDirecao = novaDirecao => {
    // Mudando a direção da Snake
    if(novaDirecao == direcaoAtual) return;
    if(novaDirecao == _DIR_ESQUERDA && direcaoAtual != _DIR_DIREITA){
        direcaoAtual = novaDirecao;
    }else if(novaDirecao == _DIR_CIMA && direcaoAtual != _DIR_BAIXO){
        direcaoAtual = novaDirecao
    }else if(novaDirecao == _DIR_DIREITA && direcaoAtual != _DIR_ESQUERDA){
        direcaoAtual = novaDirecao
    }else if(novaDirecao == _DIR_BAIXO && direcaoAtual != _DIR_CIMA){
        direcaoAtual = novaDirecao
    }
}

// Posição inicial da cobra no meio
let posicaoAtualCabecaDaCobra = 799;
let comprimentoDaCobra = 400; // Comprimento Inicial da Cobra

// Função de movimento da cobra repentinamente
const movimentoCobra = () => {
    switch(direcaoAtual){
        case _DIR_ESQUERDA:
            --posicaoAtualCabecaDaCobra;
            const cabecaCobraNoUltimoPixelDoTabuleiroParaEsquerda = posicaoAtualCabecaDaCobra % 60 == 69 || posicaoAtualCabecaDaCobra < 0;
            if(cabecaCobraNoUltimoPixelDoTabuleiroParaEsquerda){
                posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra + 40;
            }
            break;
        
        case _DIR_CIMA:
            posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra - 40;
            const cabecaCobraNoUltimoPixelDoTabuleiroParaCima = posicaoAtualCabecaDaCobra < 0;
            if(cabecaCobraNoUltimoPixelDoTabuleiroParaCima){
                posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra + 1600;
            }
            break;

        case _DIR_DIREITA:
            ++posicaoAtualCabecaDaCobra;
            const cabecaCobraNoUltimoPixelDoTabuleiroParaDireita = posicaoAtualCabecaDaCobra % 40 == 0;
            if(cabecaCobraNoUltimoPixelDoTabuleiroParaDireita){
                posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra - 40;
            }
            break;
        
        case _DIR_BAIXO:
            posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra + 40;
            const cabecaCobraNoUltimoPixelDoTabuleiroParaBaixo = posicaoAtualCabecaDaCobra > 1599;
            if(cabecaCobraNoUltimoPixelDoTabuleiroParaBaixo){
                posicaoAtualCabecaDaCobra = posicaoAtualCabecaDaCobra - 1600;
            }
            break;

        default:
            break;    
    }
    let proximoPixelDaCabecaCobra = pixelDeTabuleiro[posicaoAtualCabecaDaCobra];
    

    // Mate a cobra caso ela se morda
    if(proximoPixelDaCabecaCobra.classList.contains("snakeBodyPixel")){
        // Para o movimento da cobra
        clearInterval(moveSnakeInterval)
        alert(`Game Over!`)
        window.location.reload();
    }

    // Se não for morto adicione um corpo na cobra
    proximoPixelDaCabecaCobra.classList.add("snakeBodyPixel");

    setTimeout(() => {
        proximoPixelDaCabecaCobra.classList.remove("snakeBodyPixel");
    }, comprimentoDaCobra);


    // Atualizando distância total percorrido
    totalDistanceTravelled++;
    // Atualizando na UI
    document.getElementById("distanciaPercorrida").innerHTML =  totalDistanceTravelled;

    // Se cobra morder a comida
    if(posicaoAtualCabecaDaCobra == macaPosition){
        
        // Atualizando Maca
        totalMacaAte++
        
        // Atualizando na UI
        document.getElementById("pontos").innerHTML = totalMacaAte;
        
        // Aumentando a Snake
        comprimentoDaCobra += 100;

        // Criando nova maça
        createMaca()
    }
}

// Código para iniciar o jogo

createGameBoardPixel()
createMaca()

// A variável moveSnakeInterval é usada para parar a cobra quando ela morre
var moveSnakeInterval = setInterval(movimentoCobra, 80); 

// Função de mudança de direção
addEventListener("keydown", e => mudeDeDirecao(e.keyCode));

// Configuração de controles
const botaoEsquerdo = document.getElementById("BotaoEsquerdo");
const botaoDireito  = document.getElementById("BotaoDireito");
const botaoCima     = document.getElementById("BotaoCima");
const botaoBaixo    = document.getElementById("BotaoBaixo");

botaoEsquerdo.onclick = () => mudeDeDirecao(_DIR_ESQUERDA);
botaoDireito.onclick  = () => mudeDeDirecao(_DIR_DIREITA);
botaoCima.onclick     = () => mudeDeDirecao(_DIR_CIMA);
botaoBaixo            = () => mudeDeDirecao(_DIR_BAIXO)


