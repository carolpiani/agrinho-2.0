const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

for (let i = 0; i < botoes.length; i++) {
    botoes[i].onclick = function () {
        for (let j = 0; j < botoes.length; j++) {
            botoes[j].classList.remove("ativo");
            textos[j].classList.remove("ativo");
        }

        botoes[i].classList.add("ativo");
        textos[i].classList.add("ativo");
    };
}

const tempos = [
    new Date("2026-11-30T00:00:00"),
    new Date("2026-12-05T00:00:00"),
    new Date("2026-12-18T00:00:00"),
    new Date("2026-12-31T00:00:00")
];

function calculaTempo(tempoObjetivo) {
    const agora = new Date();
    const diferenca = tempoObjetivo - agora;

    if (diferenca <= 0) {
        return [0, 0, 0, 0];
    }

    let segundos = Math.floor(diferenca / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    segundos %= 60;
    minutos %= 60;
    horas %= 24;

    return [dias, horas, minutos, segundos];
}

function atualizaCronometro() {

    for (let i = 0; i < tempos.length; i++) {

        const tempo = calculaTempo(tempos[i]);

        document.getElementById(`dias${i}`).textContent = tempo[0];
        document.getElementById(`horas${i}`).textContent = tempo[1];
        document.getElementById(`min${i}`).textContent = tempo[2];
        document.getElementById(`seg${i}`).textContent = tempo[3];
    }

}

atualizaCronometro();
setInterval(atualizaCronometro, 1000);