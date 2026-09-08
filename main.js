// Seleção dos elementos do DOM
const campoSenha = document.querySelector('#campo-senha');
const botaoDiminuir = document.querySelectorAll('.parametro-senha__botao')[0];
const botaoAumentar = document.querySelectorAll('.parametro-senha__botao')[1];
const tamanhoTexto = document.querySelector('.parametro-senha__texto');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const forcaBarra = document.querySelector('.forca');

// Conjuntos de caracteres
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

let tamanhoSenha = 12;

// Atualiza a exibição da quantidade de caracteres
tamanhoTexto.textContent = tamanhoSenha;

// Eventos para ajustar o tamanho da senha
botaoDiminuir.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

botaoAumentar.addEventListener('click', () => {
    if (tamanhoSenha < 30) {
        tamanhoSenha++;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

// Evento para atualizar a senha quando qualquer checkbox for alterado
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', gerarSenha);
});

// Função principal que gera a senha
function gerarSenha() {
    let alfabeto = '';

    if (document.querySelector('#maiusculo').checked) alfabeto += letrasMaiusculas;
    if (document.querySelector('#minusculo').checked) alfabeto += letrasMinusculas;
    if (document.querySelector('#numero').checked) alfabeto += numeros;
    if (document.querySelector('#simbolo').checked) alfabeto += simbolos;

    // Se nenhuma opção for selecionada, limpa o campo
    if (alfabeto === '') {
        campoSenha.value = '';
        atualizarForca(0);
        return;
    }

    let senha = '';
    for (let i = 0; i < tamanhoSenha; i++) {
        const numeroAleatorio = Math.floor(Math.random() * alfabeto.length);
        senha += alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    calcularForca();
}

// Calcula e exibe visualmente a força da senha
function calcularForca() {
    let pontos = 0;

    if (document.querySelector('#maiusculo').checked) pontos++;
    if (document.querySelector('#minusculo').checked) pontos++;
    if (document.querySelector('#numero').checked) pontos++;
    if (document.querySelector('#simbolo').checked) pontos++;

    // Bônus pelo tamanho da senha
    if (tamanhoSenha >= 12) pontos += 2;
    else if (tamanhoSenha >= 8) pontos += 1;

    atualizarForca(pontos);
}

function atualizarForca(pontos) {
    // Reseta as classes de força
    forcaBarra.classList.remove('fraca', 'media', 'forte');

    if (pontos <= 2) {
        forcaBarra.classList.add('fraca');
    } else if (pontos <= 4) {
        forcaBarra.classList.add('media');
    } else {
        forcaBarra.classList.add('forte');
    }
}

// Gera a primeira senha ao carregar a página
gerarSenha();