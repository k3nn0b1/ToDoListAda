const input = document.querySelector("#floatingInput");
const botaoAdd = document.querySelector("#botaoAdd");
const listaTarefas = document.querySelector(".list-group");
const label = document.querySelector("#labelText");

let tarefas = [];
let editIndex = null;

function addNovaTarefa() {
  if (input.value.trim() !== "") {
    if (editIndex !== null) {
      tarefas[editIndex].tarefa = input.value;
      editIndex = null;
      botaoAdd.innerText = "Adicionar";
    } else {
      tarefas.push({
        tarefa: input.value,
        concluido: false,
      });
    }

    input.value = "";
    montarTarefas();
  }
}

function montarTarefas() {
  let lista = "";

  tarefas.forEach((item, index) => {
    lista += `<li class="list-group-item ${item.concluido && "concluido"}">
                ${item.tarefa}
                <span id="iconsRow">
                  <img src="./img/check.png" onclick="concluiTarefa(${index})" alt="check" class="icons"> 
                  <img src="./img/delete.png" onclick="deletaTarefa(${index})" alt="delete" class="icons"> 
                  <img src="./img/edit.png" id="edit" onclick="editaTarefa(${index})" alt="edit" class="icons">
                </span>
              </li>`;
  });

  listaTarefas.innerHTML = lista;
}

function deletaTarefa(index) {
  tarefas.splice(index, 1);
  montarTarefas();
}

function editaTarefa(index) {
  input.value = tarefas[index].tarefa;
  editIndex = index;
  botaoAdd.innerText = "Salvar";
  label.innerText = "Edite o campo selecionado";
}

function concluiTarefa(index) {
  tarefas[index].concluido = !tarefas[index].concluido;
  montarTarefas();
}

botaoAdd.addEventListener("click", addNovaTarefa);
