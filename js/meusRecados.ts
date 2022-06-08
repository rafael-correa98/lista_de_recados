const descricaoUsusario = document.querySelector("#descricao") as HTMLInputElement;
const detalhamentoUsuario = document.querySelector("#detalhamento") as HTMLInputElement;

const btnSalvar = document.querySelector('#botao-salvar') as HTMLButtonElement;

const tBody = document.querySelector('#tbody') as HTMLElement;

interface Recado {
    descricao: string;
    detalhamento: string;
}

let estaEditando = false;
let indiceEditar = 0;

const usuarioCorrente = JSON.parse(
    sessionStorage.getItem("usuarioCorrente") || ""
  );

  const recuperarOLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem(usuarioCorrente) || "[]");
    return recados;
};

const salvarRecado = () => {
    const descricao = descricaoUsusario.value;
    const detalhamento = detalhamentoUsuario.value;
    const listaDeRecados = recuperarOLocalStorage();

    if (!descricao || !detalhamento) {
        alert("Preencher todos os campos obrigatorios!!")
        return;
    }
    
    if (estaEditando){
        listaDeRecados[indiceEditar].descricao = descricao
        listaDeRecados[indiceEditar].detalhamento = detalhamento
        estaEditando = false
    } else {
        const recado = {
            descricao,
            detalhamento,
        };
        listaDeRecados.push(recado);
    }
    localStorage.setItem(usuarioCorrente, JSON.stringify(listaDeRecados));
    descricaoUsusario.value = "";
    detalhamentoUsuario.value = "";

    montarTabela();
}

const montarTabela = () => {
    const listaDeRecados = recuperarOLocalStorage();
    tBody.innerHTML = "";
    listaDeRecados.forEach((recado: Recado, indice: number) => {
        tBody.innerHTML += `
        <tr>
          <th>${indice + 1}</th>
          <th>${recado.descricao}</th>
          <th>${recado.detalhamento}</th>
          <th><button type="button" onclick="apagaRecado(${indice})" class="button red">Apagar</button>
          <button type="button" onclick="editaRecado(${indice})" class="button green">Editar</button></th>
        </tr>
        `
    });
}

const apagaRecado = (indice: number) => {
    const confirmar = confirm("Deseja excluir o recado?");
    if(confirmar){
        const listaDeRecados = recuperarOLocalStorage();
        listaDeRecados.splice(indice, 1);
        localStorage.setItem(usuarioCorrente, JSON.stringify(listaDeRecados));
        montarTabela();
    }
}

const editaRecado = (indice: number) => {
    const listaDeRecados = recuperarOLocalStorage();
    descricaoUsusario.value = listaDeRecados[indice].descricao;
    detalhamentoUsuario.value = listaDeRecados[indice].detalhamento;
    estaEditando = true;
    indiceEditar = indice;
}

const sair = () => {
    sessionStorage.clear();
    location.href = "index.html"
}

document.addEventListener("DOMContentLoaded", montarTabela);


