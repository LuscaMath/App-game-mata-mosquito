var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {

    criaMosquitoTempo = 1500

} else if (nivel === 'dificil'){

    criaMosquitoTempo = 1000

} else if (nivel === 'lusca') {

    criaMosquitoTempo = 750

}

function ajustaTamanhoDoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log (largura, altura)
}

ajustaTamanhoDoJogo()

var cronometro = setInterval(function() {
    
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'

    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }    

}, 1000)

function posicaoRandomica () {

    //remover o mosquito caso ele exista
    if (document.getElementById('mosquito')) {
            document.getElementById('mosquito').remove()
            
            if (vidas > 3) {

                window.location.href = 'game_over.html'

            } else {

                document.getElementById('v'+ vidas).src = "imagens/coracao_vazio.png"

                vidas++

            }
            
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //criação dos elementos html
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = "mosquito"
    mosquito.onclick = function () {
        this.remove()
    }

    document.body.appendChild(mosquito)

    //fim
}

document.getElementById('cronometro').innerHTML = tempo


var criaMosquito = setInterval(function() {
    posicaoRandomica()
}, criaMosquitoTempo)



function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'    
    }
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {

        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }
}

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value

    if (nivel === '') {
        alert('Selecione o nível de jogo para iniciar')
        return false
    }

    window.location.href = "app.html?" + nivel

}

