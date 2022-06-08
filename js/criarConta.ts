const nomeUsuario = document.querySelector("#criar-username") as HTMLInputElement;
const passwordUsuario = document.querySelector("#criart-password") as HTMLInputElement;
const passwordConfirmacao = document.querySelector("#confirmar-password") as HTMLInputElement;

const recuperarLocalStorage = (): Array<any> => {
    const usuarios = JSON.parse(
      localStorage.getItem("usuarios") || "[]"
    ) as Array<any>;
  
    return usuarios;
  };
  
  const atualizarLocalStorage = (usuarios: Array<any>) => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };
  

function criarNovoUsuario() {
    const nome = nomeUsuario.value;
    const password = passwordUsuario.value;
    const confirmacao = passwordConfirmacao.value;
    let repetido:boolean = false;

    if (!nome || !password || !confirmacao) {
        alert("Preencher todos os campos obrigatorios!!")
        return;
    }

    if (password !== confirmacao){
        alert("Senhas não conferem!")
        return;
    }

    const contas = recuperarLocalStorage();

    contas.forEach((conta)=>{
      if (conta.nome === nome){
        repetido = true;
        alert("usuario repetido")
        return;
      }
    })

    if (!repetido){  
    contas.push({
      nome,
      password,
    });
  
    atualizarLocalStorage(contas);

    alert("Usuario cadastrado");

    location.href = "index.html";
    }
}



