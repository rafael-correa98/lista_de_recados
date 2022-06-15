const btnEntrar = document.querySelector('#botao_input') as HTMLButtonElement;
const formEntrar = document.querySelector('#form_entrar') as HTMLFormElement;
  
const recuperarLS = (): Array<any> => {
  const usuarios = JSON.parse(
    localStorage.getItem("usuarios") || "[]"
  ) as Array<any>;

  return usuarios;
};

const validarUsuario = () => {
  const listaUsuarios = recuperarLS();
  const nome = formEntrar.entrar_usuario.value;
  const password = formEntrar.entrar_password.value;

  if (!nome || !password) {
    alert("Preencher todos os campos obrigatorios!!")
    return;
}

  const usuarioAtual = listaUsuarios.find((usuario) => {
    return usuario.nome === formEntrar.entrar_usuario.value && usuario.password === formEntrar.entrar_password.value
  })

  if (usuarioAtual) {
    sessionStorage.setItem("usuarioCorrente", JSON.stringify(usuarioAtual.nome))
    location.href = "../public/meusRecados.html";
  } else {
    alert("Usuario ou senha invalido!")
  }

}

btnEntrar.addEventListener("click", validarUsuario)

