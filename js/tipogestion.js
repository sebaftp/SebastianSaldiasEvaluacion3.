var g_id_tipo_gestion = "";
function agregarTipoGestion(){
//Obtenemos el nombre del tipo de gestión desde interfaz 
var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
    const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "nombre_tipo_gestion": nombre_tipo_gestion,
  "fecha_registro": "2024-04-17 17:29:00"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      AlertaBien();
    }
    if(response.status == 400){
      AlertaERROR();
    }
  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
//Agregar un nuevo método para listar los datos ingresados
function listarTipoGestion(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable();
    }
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarFila(element,index,arr){
arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML += 
`<tr>
<td>${element.id_tipo_gestion}</td>
<td>${element.nombre_tipo_gestion}</td>
<td>${element.fecha_registro}</td>
<td>
<a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}
function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;

  obtenerDatosActualizacion(p_id_tipo_gestion);
}
function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;

  obtenerDatosEliminacion(p_id_tipo_gestion);
}
function obtenerDatosEliminacion(id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function obtenerDatosActualizacion(id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+id_tipo_gestion, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarFormularioActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
function completarEtiquetaEliminar(element,index,arr){
  var nombreTipoGestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea eliminar este tipo de gestión? <b>"+nombreTipoGestion +"</b>";
   }
function completarFormularioActualizar(element,index,arr){
 var nombreTipoGestion = element.nombre_tipo_gestion;
 document.getElementById('txt_nombre_tipo_gestion').value = nombreTipoGestion;
  }

function actualizarTipoGestion(){
  //Obtenemos el nombre del tipo de gestión desde interfaz 
var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
"nombre_tipo_gestion": nombre_tipo_gestion
});

const requestOptions = {
method: "PATCH",
headers: myHeaders,
body: raw,
redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
.then((response) => {
if(response.status == 200) {
  AlertaBien();
}
if(response.status == 400) {
  AlertaERROR();
}
}

)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}
function eliminarTipoGestion(){

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
method: "DELETE",
headers: myHeaders,

redirect: "follow"
};

fetch("http://144.126.210.74:8080/api/tipo_gestion/"+g_id_tipo_gestion, requestOptions)
.then((response) => {
if(response.status == 200) {
  AlertaEliminar();
}
if(response.status == 400) {
  AlertaERROReliminar();
}
}

)
.then((result) => console.log(result))
.catch((error) => console.error(error));
}

function AlertaBien(){

  const modalContainer = document.getElementById('alerta-bien');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE TIPO GESTIÓN</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Tipo de Gestión INGRESADO correctamente</p>
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

function AlertaERROR(){

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
                  <p>ERROR AL INGRESAR TIPO DE GESTIÓN</p>
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
function AlertaERROReliminar(){

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
                  <p>{ERROR} NO SE PUDO ELIMINAR EL TIPO DE GESTIÓN</p>
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

function AlertaEliminar(){

  const modalContainer = document.getElementById('alerta-eliminar');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE TIPO DE GESTIÓN</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Se ha eliminado correctamente el tipo de gestión</p>
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
function RegresoLocal(){
  location.href="listar.html";
}