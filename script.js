/*************************** Criação das variáveis utilziadas no código ***************************/
var canvas, context,
    barraWidth, barraHeigth,
    jogadorPosX, jogadorPosY,
    jogadorBPosX, jogadorBPosY,
    teclaCimaPressionada, teclaBaixoPressionada,
    teclaCimaPressionadaB, teclaBaixoPressionadaB,
    bolaRaio,
    bolaPosX, bolaPosY,
    bolaParaDireita,
    bolaAngulo,
    bolaTempo,
    velocidadeJogador, velocidadeJogadorB,
    pontosJogador, pontosOponente;

function iniciarJogo() {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    

    //Configurações de largura, tamanho e posicionamento da barra
    barraWidth = 30;
    barraHeigth = 90;
    jogadorPosX = 0;
    jogadorPosY = (canvas.height - barraHeigth) / 2;
    teclaBaixoPressionada = false;
    teclaCimaPressionada = false;
    teclaBaixoPressionadaB = false;
    teclaCimaPressionadaB = false;
    

    jogadorBPosX = canvas.width - barraWidth;
    jogadorBPosY = 0;
    oponenteParaCima = false;

    //Configuração da dimensão e posicionamento inicial da bola
    bolaRaio = 10;
    bolaPosX = canvas.width / 2;
    bolaPosY = canvas.height / 2;

    bolaParaDireita = false;
    bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
    bolaTempo = 0;
    velocidadeJogador = 15;
    velocidadeJogadorB = 15;
    pontosJogador = 0;
    pontosOponente = 0;

    //Mantém a tecla como "falso" para não realizar ação
    document.addEventListener('keyup', keyUp, false);
    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUpJogadorB, false);
    document.addEventListener('keydown', keyDownJogadorB, false);

    setInterval(loopGame, 30);
}
// JOGADOR  A
//Verificação - Pressionando as teclas (Consulte as keys)
function keyUp(e) {
    if (e.keyCode == 81) {
        teclaCimaPressionada = false;
    } else if (e.keyCode == 65) {
        teclaBaixoPressionada = false;
    }
}

function keyDown(e) {
    if (e.keyCode == 81) {
        teclaCimaPressionada = true;
    } else if (e.keyCode == 65) {
        teclaBaixoPressionada = true;
    }
}
// Jogador B
function keyUpJogadorB(e){
    if (e.keyCode == 38){
    teclaCimaPressionadaB = false;
    }
    else if (e.keyCode == 40) {
    teclaBaixoPressionadaB = false;
    }
    }
function keyDownJogadorB(e){
    if(e.keyCode == 38) {
    teclaCimaPressionadaB = true;
    }
    else if(e.keyCode == 40) {
    teclaBaixoPressionadaB = true;
    }
    }

function loopGame() {

   /****************************** DESENHO DA TELA *****************************/  
   context.clearRect(0, 0, canvas.width, canvas.height); // limpar a tela antes de desenhar
   

   /****************************** JOGADOR & OPONENTE *****************************/  
   context.fillRect(jogadorPosX, jogadorPosY, barraWidth, barraHeigth); // desenha jogador
   context.fillRect(jogadorBPosX, jogadorBPosY, barraWidth, barraHeigth); // desenha oponente


   /****************************** BOLA *****************************/  
   context.beginPath(); // modo desenho 
   context.arc(bolaPosX, bolaPosY, bolaRaio, 0, Math.PI * 2, true); // desenha o circulo com coordenadas no centro
   context.closePath(); // finaliza o caminho / não é obrigatório
   //context.fillStyle = "#ffffff";
   context.fill();


    /****************************** JOGADOR A*****************************/  
    if (teclaCimaPressionada != teclaBaixoPressionada) { // se o usuário precionar para cima
        if (teclaCimaPressionada) { // se for para cima pressionado
            if (jogadorPosY > 0) { // se a bola não sair da tela
                jogadorPosY -= velocidadeJogador; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorPosY += velocidadeJogador; // muda posição
            }
        }
    }

    /****************************** JOGADOR B*****************************/  
    if (teclaCimaPressionadaB != teclaBaixoPressionadaB) { // se o usuário precionar para cima
        if (teclaCimaPressionadaB) { // se for para cima pressionado
            if (jogadorBPosY > 0) { // se a bola não sair da tela
                jogadorBPosY -= velocidadeJogadorB; // muda posição do jogador
            }
        }
        else { // se for para baixo 
            if (jogadorBPosY < (canvas.height - barraHeigth)) { // se a bola não saiu da tela
                jogadorBPosY += velocidadeJogadorB; // muda posição
            }
        }
    }


    /****************************** BOLA *****************************/  
    if (bolaTempo <= 0) // caso a bola estiver em jogo, o tempo  e zerado apos marcar ponto, abola ficará invisivel por um tempo
    {
        if ((bolaPosX - bolaRaio) <= (jogadorPosX + barraWidth)) { // caso o jogador encoste na bola no eixo X
            
            if ((bolaPosY + bolaRaio > jogadorPosY) && (bolaPosY - bolaRaio < jogadorPosY + barraHeigth)) { // caso o jogador encoste na bola no eixo Y
                bolaParaDireita = true;
             

                if (teclaBaixoPressionada) { // se o usuário estiver indo para baixo e tocar na bola
                    bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                    rebote.play()
                }
                else {
                    bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                    rebote.play()
                }
            }
        }
        else {
            if ((bolaPosX + bolaRaio) >= jogadorBPosY) { // se o oponente encostar na bola no eixo X
               
                if ((bolaPosY + bolaRaio) > jogadorBPosY && (bolaPosY - bolaRaio < jogadorBPosY + barraHeigth)) { // se o oponente encostar na bola no eixo Y
                    bolaParaDireita = false;
                    if (teclaCimaPressionadaB) { // caso oponetne estiver indo para cima ao tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10) - 9; // manda bola para diagonal para cima
                        rebote.play()
                    }
                    else { // caso o oponente estiver indo para baixo quando tocar na bola
                        bolaAngulo = Math.floor(Math.random() * 10); // manda bola para diagonal para baixo
                        rebote.play()
                    }
                }
            }
        }

        if ((bolaPosY - bolaRaio <= 0) || (bolaPosY + bolaRaio > canvas.height)) { // se a bola estiver indo para cima ou para baixo na tela
            bolaAngulo = bolaAngulo * -1; // multiplicamos por - 1 para inverter a direção da bola no eixo y
        }
        bolaPosY += bolaAngulo; // move bola para cima ou para baixo de acordo com o calculo acima

        if (bolaParaDireita) {
            bolaPosX += velocDif; // move a bola para direita
        }
        else {
            bolaPosX -= velocDif; // move a bola para esquerda
        }
    }

    if ((bolaPosX <= -bolaRaio) || (bolaPosX > canvas.width)) { // se a bola saiu da tela
       
        if (bolaTempo >= 50) { // se o tempo de deixar a bola invisível passou 
            if (bolaPosX <= - bolaRaio) { // se bola saiu na esquerda 
                pontosOponente++;
                perda.play()
            }
            else { // se bola saiu na direita 
                pontosJogador++;
                perda.play()
            }

            bolaPosX = canvas.width / 2; // coloca bola no centro da tela
            bolaPosY = canvas.height / 2; // coloca bola no centro da tela

            bolaParaDireita = false;
            bolaAngulo = Math.floor(Math.random() * 21) - 10; // faz bola ir para uma direção aleatória.
            bolaTempo = 0; // zera o tempo de deixar a bola invisível e coloca novamente em jogo
        }
        else { // caso o tempo de deixar a bola invisível não acabou 
            bolaTempo++;
        }
    }


    /****************************** PLACAR *****************************/  
    var pontosA = pontosJogador; // variéveis temporarias para alterar pontuação
    var pontosB = pontosOponente;
    

    if (pontosA < 10) { // coloca zero a esquerda se for menor que 10 a pontuação 
        pontosA = "0" + pontosA;
       }
       else if(pontosJogador >= 10){
        setTimeout(function(){ 
            alert("O jogador A venceu") ; }, 400);
            
    }
    
    if (pontosB < 10) { // coloca zero a esquerda se for menor que 10 a pontuação 
        pontosB = "0" + pontosB;
       
    }
    else if(pontosOponente >= 10) {
        setTimeout(function(){ 
            alert("O jogador B venceu"); }, 400);
            }
    
    
 


    context.font = "43pt Calibri"; // tamanho e fonte
    context.fillStyle = "#28024b"; //Seleciona a cor
    context.fillText(pontosA + "  " + pontosB, (canvas.width / 2) - 70, 50); // escrevendo texto no centro da tela no top

    
    /****************************** LINHA DIVISÓRIA *****************************/ 
    context.beginPath();
    context.moveTo(canvas.width / 2, 0); // arrumar lápis para fazere a escrita da linha
    context.lineTo(canvas.width / 2, canvas.height);// faz risco na tela no centro
    context.strokeStyle = "#ffffff";
    context.stroke();
    context.closePath();
}
/****************************** DIFICULDADE *****************************/ 
var dific=prompt("Digite o nível de dificuldade de 1 a 9");
var velocDif;
if (dific>=1 && dific<=9){
    var velocidadeBola = 5;
    velocDif=dific*velocidadeBola;
}
/****************************** SONS *****************************/ 
var rebote = new Audio('somPongRebate.mp3');
var perda = new Audio('SomPongPerda.mp3');

 
    
/****************************** FUNÇÃO DO JQUERY *****************************/ 
$(function () {
    iniciarJogo();
});