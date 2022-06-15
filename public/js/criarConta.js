"use strict";
const btnCriar = document.querySelector('#btn_criar');
const formCriar = document.querySelector('#criar_conta');
const recuperarLocalStorage = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios;
};
const atualizarLocalStorage = (usuarios) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
};
function criarNovoUsuario() {
    const nome = formCriar.criar_usuario.value;
    const password = formCriar.criar_password.value;
    const confirmacao = formCriar.confirmar_password.value;
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
    if (!repetido) {
        contas.push({
            nome,
            password,
        });
        atualizarLocalStorage(contas);
        alert("Usuario cadastrado");
        location.href = "../public/index.html";
    }
}
btnCriar.addEventListener("click", criarNovoUsuario);
