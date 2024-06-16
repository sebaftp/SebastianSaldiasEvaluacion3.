var g_id_resultado = "";
function agregarResultado(){
//Obtenemos el nombre de resultado desde interfaz 
var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_resultado": nombre_resultado,
  "fecha_registro": "2024-04-17 17:29:00"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      AlertaBien();
    }
    if(response.status == 400){
      AlertaError();
    }
  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

//ALERTA AGREGAR RESULTADO

function AlertaBien(){

  const modalContainer = document.getElementById('alerta-bien');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE RESULTADO</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Resultado INGRESADO correctamente</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-success" onclick="RegresoLocal();">Aceptar</button>
              </div>
          </div>
      </div>
  `;

      modalContainer.appendChild(modal);

      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
  
      modal.addEventListener('hidden.bs.modal', () => {
          modalContainer.removeChild(modal);
      });
}

function AlertaError(){

  const modalContainer = document.getElementById('alerta-bien');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ERROR</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>ERROR AL INGRESAR RESULTADO</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-danger" onclick="RegresoLocal();">Aceptar</button>
              </div>
          </div>
      </div>
  `;

      modalContainer.appendChild(modal);

      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
  
      modal.addEventListener('hidden.bs.modal', () => {
          modalContainer.removeChild(modal);
      });
}

//Agregar un nuevo método para listar los datos ingresados
function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML += 
`<tr>
<td>${element.id_resultado}</td>
<td>${element.nombre_resultado}</td>
<td>${element.fecha_registro}</td>
<td>
<a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;

  obtenerDatosActualizacion(p_id_resultado);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;

  obtenerDatosEliminacion(p_id_resultado);
}
function obtenerDatosEliminacion(id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_resultado) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+id_resultado, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreResultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este resultado? <b>"+nombreResultado +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreResultado = element.nombre_resultado;
 document.getElementById('txt_nombre_resultado').value = nombreResultado;
  }

function actualizarResultado(){
  //Obtenemos el nombre del tipo de gestión desde interfaz 
var nombre_resultado = document.getElementById("txt_nombre_resultado").value;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"nombre_resultado": nombre_resultado
});

const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
.then((response) => {
if(response.status == 200) {
  AlertaBien();
}
if(response.status == 400){
  AlertaError();
}
}

)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}
function eliminarResultado(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
.then((response) => {
if(response.status == 200) {
  AlertaEliminar();
}
if(response.status == 400){
  AlertaErrorEliminar();
}
}

)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

//ALERTA ELIMINAR RESULTADO

function AlertaEliminar(){

  const modalContainer = document.getElementById('alerta-eliminar');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE RESULTADO</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Resultado ELIMINADO correctamente</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-success" onclick="RegresoLocal();">Aceptar</button>
              </div>
          </div>
      </div>
  `;

      modalContainer.appendChild(modal);

      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
  
      modal.addEventListener('hidden.bs.modal', () => {
          modalContainer.removeChild(modal);
      });
}

function AlertaErrorEliminar(){

  const modalContainer = document.getElementById('alerta-eliminar');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ERROR</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>ERROR AL ELIMINAR RESULTADO</p>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-danger" onclick="RegresoLocal();">Aceptar</button>
              </div>
          </div>
      </div>
  `;

      modalContainer.appendChild(modal);

      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
  
      modal.addEventListener('hidden.bs.modal', () => {
          modalContainer.removeChild(modal);
      });
}

function RegresoLocal(){
  location.href="listar.html";
}