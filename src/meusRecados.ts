const btnSalvar = document.querySelector('#botao_salvar') as HTMLButtonElement;
const formSalvar = document.querySelector('#form_salvar') as HTMLFormElement;
const tBody = document.querySelector('#tbody') as HTMLElement;
const modalEditar = document.querySelector('#form_') as HTMLDivElement;
const formSalvarModal = document.querySelector('#form_salvar_modal') as HTMLFormElement;
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
    const descricao = formSalvar.descricao.value;
    const detalhamento = formSalvar.detalhamento.value;
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
    formSalvar.descricao.value = "";
    formSalvar.detalhamento.value = "";

    montarTabela();
}

const salvarRecadoModal = () => {
    const descricaoModal = formSalvarModal.descricao.value;
    const detalhamentoModal = formSalvarModal.detalhamento.value;
    const listaDeRecados = recuperarOLocalStorage();

    if (!descricaoModal || !detalhamentoModal) {
        alert("Preencher todos os campos obrigatorios!!")
        return;
    }
    
    if (estaEditando){
        listaDeRecados[indiceEditar].descricao = descricaoModal
        listaDeRecados[indiceEditar].detalhamento = detalhamentoModal
        estaEditando = false
    } else {
        const recado = {
            descricaoModal,
            detalhamentoModal,
        };
        listaDeRecados.push(recado);
    }
    localStorage.setItem(usuarioCorrente, JSON.stringify(listaDeRecados));
    formSalvarModal.descricao.value = "";
    formSalvarModal.detalhamento.value = "";

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
          <th><button type="button" class="button red" data-bs-toggle="modal" data-bs-target="#apagarModal" onclick="botaoApagar(${indice})">Apagar</button>
          <button type="button" id="botao_editar" class="button green" data-bs-toggle="modal" data-bs-target="#editarModal" onclick="editarRecadoModal(${indice})">Editar</button></th>
        </tr>
        `
    });
}


const apagarRecado = (indice: number) => {
    const listaDeRecados = recuperarOLocalStorage();
    listaDeRecados.splice(indice, 1);
    localStorage.setItem(usuarioCorrente, JSON.stringify(listaDeRecados));
    montarTabela();
}

function botaoApagar(index:number) {
    console.log(index)
    const btnApagar = document.querySelector('#botao_apagar') as HTMLButtonElement;
    btnApagar.setAttribute('onclick', `apagarRecado(${index})`) 
}

const editarRecadoModal = (indice: number) => {
    const listaDeRecados = recuperarOLocalStorage();
    formSalvarModal.descricao.value = listaDeRecados[indice].descricao;
    formSalvarModal.detalhamento.value = listaDeRecados[indice].detalhamento;
    estaEditando = true;
    indiceEditar = indice;
}

const sair = () => {
    sessionStorage.clear();
    location.href = "../public/index.html"
}

document.addEventListener("DOMContentLoaded", montarTabela);

const myModal = document.getElementById('myModal') as HTMLDivElement;
const myInput = document.getElementById('myInput') as HTMLDivElement;

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})