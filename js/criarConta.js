"use strict";
const nomeUsuario = document.querySelector("#criar-username");
const passwordUsuario = document.querySelector("#criart-password");
const passwordConfirmacao = document.querySelector("#confirmar-password");
const btnINput = document.querySelector('#botao-input');
const recuperarLocalStorage = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios;
};
const atualizarLocalStorage = (usuarios) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};
function criarNovoUsuario() {
    const nome = nomeUsuario.value;
    const password = passwordUsuario.value;
    const confirmacao = passwordConfirmacao.value;
    let repetido = false;
    if (!nome || !password || !confirmacao) {
        alert("Preencher todos os campos obrigatorios!!");
        return;
    }
    if (password !== confirmacao) {
        alert("Senhas não conferem!");
        return;
    }
    const contas = recuperarLocalStorage();
    contas.forEach((conta) => {
        if (conta.nome === nome) {
            repetido = true;
            alert("usuario repetido");
            return;
        }
    });
    if (repetido === false) {
        contas.push({
            nome,
            password,
        });
        atualizarLocalStorage(contas);
        alert("Usuario cadastrado");
        location.href = "index.html";
    }
}
