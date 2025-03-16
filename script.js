const celulas = document.querySelectorAll('.celula');
const statusDisplay = document.getElementById('status');
const jogador1Img = './imgs/o.png';
const jogador2Img = './imgs/x.png';
let jogadorAtual = 'jogador1';
let tabuleiro = Array(9).fill(null);
let jogoAtivo = true;
const reiniciar = document.getElementById('btnReiniciar');

const condicoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function verificarVencedor() {
    for (let i = 0; i < condicoesVitoria.length; i++) {
        const [a, b, c] = condicoesVitoria[i];
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            jogoAtivo = false;
            statusDisplay.textContent = `O ${tabuleiro[a]} venceu!`;
            return;
        }
    }

    if (!tabuleiro.includes(null)) {
        jogoAtivo = false;
        statusDisplay.textContent = 'Empate!';
    }
}

function clicarCelula(evento) {
    const celula = evento.target;
    const indiceCelula = celula.getAttribute('data-indice');

    if (tabuleiro[indiceCelula] || !jogoAtivo) {
        return;
    }

    tabuleiro[indiceCelula] = jogadorAtual;
    celula.classList.add('ocupada');
    const img = document.createElement('img');
    img.src = jogadorAtual === 'jogador1' ? jogador1Img : jogador2Img;
    celula.appendChild(img);

    verificarVencedor();

    jogadorAtual = jogadorAtual === 'jogador1' ? 'jogador2' : 'jogador1';
}

celulas.forEach(celula => {
    celula.addEventListener('click', clicarCelula);
});

function reiniciarJogo() {
    tabuleiro = Array(9).fill(null);
    jogadorAtual = 'jogador1';
    jogoAtivo = true;
    statusDisplay.textContent = '';
    
    celulas.forEach(celula =>{
        celula.innerHTML = '';
        celula.classList.remove('ocupada');
    });
}

reiniciar.addEventListener('click', reiniciarJogo);