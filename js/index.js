"use strict";
const entrarUsuario = document.querySelector("#entrar-usuario");
const entrarPassword = document.querySelector("#entrar-password");
const btnEntrar = document.querySelector('#botao-input');
const recuperarLS = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios;
};
const validarUsuario = () => {
    const listaUsuarios = recuperarLS();
    const nome = entrarUsuario.value;
    const password = entrarPassword.value;
    if (!nome || !password) {
        alert("Preencher todos os campos obrigatorios!!");
        return;
    }
    const usuarioAtual = listaUsuarios.find((usuario) => {
        return usuario.nome === entrarUsuario.value && usuario.password === entrarPassword.value;
    });
    if (usuarioAtual) {
        sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioAtual.nome));
        location.href = "meusRecados.html";
    }
    else {
        alert("Usuario ou senha invalido!");
    }
};
