var g_id_cliente = "";

//Listar Clientes

function listarCliente(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/cliente?_size=200", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        json.forEach(completarFila);
        $('#tbl_Cliente').DataTable();
      }
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }


  // Completar Fila de Clientes

function completarFila(element,index,arr){
arr[index] = document.querySelector("#tbl_Cliente tbody").innerHTML += 
`<tr>
<td>${element.id_cliente}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.fecha_registro}</td>
<td>
<a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
}



//AGREGAR EL CLIENTE

function AgregarCliente(){
var fecha_Actual = new Date();
var fechaFormateada = formatearFechaHora(fecha_Actual);
var id_cliente = document.getElementById("txt_id_cliente").value;
var dv      = document.getElementById("txt_dv_cliente").value;
var nombres    = document.getElementById("txt_nombres_cliente").value;
var apellidos = document.getElementById("txt_apellidos_cliente").value;
var email    = document.getElementById("txt_email_cliente").value;
var celular     = document.getElementById("txt_celular_cliente").value;

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");


const raw = JSON.stringify({
  "id_cliente": id_cliente,
  "dv": dv,
  "nombres": nombres,
  "apellidos": apellidos,
  "email": email,
  "celular": celular,
  "fecha_registro": fechaFormateada
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
    if(response.status == 200) {
      AlertaBien();
    }
  if(response.status == 400) {
    AlertaError();
  }
  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

// ALERTA AL AGREGAR CLIENTE == 200

function AlertaBien(){

  const modalContainer = document.getElementById('alerta-bien');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE CLIENTE</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Cliente ingresado correctamente</p>
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

//ALERTA SI AGREGAR CLIENTE == 400
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
                  <p>ERROR al ingresar el cliente</p>
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

//REGRESO A LA PAGINA ANTERIOR
function RegresoLocal(){
  location.href = "listar.html";
 }
//OBTENER FECHA ACTUAL

function formatearFechaHora(fecha_registro){
    var fechaHoraActual = new Date(fecha_registro);
    var fechaFormateada = fechaHoraActual.toLocaleString('es-ES',{
      hour12:false,
      year:'numeric',
      month:'2-digit', 
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit', 
      second:'2-digit',
      timeZone:'UTC'
    }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5');
  
   return fechaFormateada;
  }
  
//OBTENER ID AL ACTUALIZAR

function obtenerIdActualizacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosActualizacion(p_id_cliente);
}

//OBTENER ID PARA BORRAR

function obtenerIdEliminacion(){
  const queryString       = window.location.search;
  const parametros        = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;

  obtenerDatosEliminacion(p_id_cliente);
}

//OBTENER DATOS ELIMINACION

function obtenerDatosEliminacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaEliminar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//OBTENER DATOS ACTUALIZACION

function obtenerDatosActualizacion(id_cliente) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+id_cliente, requestOptions)
    .then((response) => response.json())
    .then((json) => json.forEach(completarEtiquetaActualizar))
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

//ALERTA ETIQUETA ELIMINAR

function completarEtiquetaEliminar(element){
  var IdCliente = element.id_cliente;
  document.getElementById('lbl_eliminar').innerHTML ="¿Desea Eliminar el siguiente cliente? ID_CLIENTE=<b>"+  IdCliente +"</b>";
   }

//ALERTA ETIQUETA ACTUALIZAR

function completarEtiquetaActualizar(element,index,arr){
  var IdCliente = element.id_cliente;
  document.getElementById('lbl_actualizar').innerHTML ="¿Desea Actualizar este cliente? ID_CLIENTE=<b>"+IdCliente +"</b>";
   }

//ACTUALIZAR CLIENTE

function ActualizarCliente(){
  var fecha_Actual = new Date();
  var fechaFormateada = formatearFechaHora(fecha_Actual);
  var id_cliente = document.getElementById("txt_id_cliente").value;
  var dv      = document.getElementById("txt_dv_cliente").value;
  var nombres    = document.getElementById("txt_nombres_cliente").value;
  var apellidos = document.getElementById("txt_apellidos_cliente").value;
  var email    = document.getElementById("txt_email_cliente").value;
  var celular     = document.getElementById("txt_celular_cliente").value;
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  
  const raw = JSON.stringify({
    "id_cliente": id_cliente,
    "dv": dv,
    "nombres": nombres,
    "apellidos": apellidos,
    "email": email,
    "celular": celular,
    "fecha_registro": fechaFormateada
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
    .then((response) => {
      if(response.status == 200) {
        AlertaBienActualizar();
      }
    if(response.status == 400) {
      AlertaErrorActualizar();
    }
    }
    
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }

//ALERTA ACTUALIZAR == 200

function AlertaBienActualizar(){

  const modalContainer = document.getElementById('alerta-bien');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE CLIENTE</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Cliente ACTUALIZADO correctamente</p>
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

// ALERTA ERROR ACTUALIZAR == 400

function AlertaErrorActualizar(){

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
                  <p>ERROR AL ACTUALIZAR EL CLIENTE</p>
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

//ELIMINAR CLIENTE

function EliminarCliente(){

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
  method: "DELETE",
  headers: myHeaders,
  
  redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
  .then((response) => {
  if(response.status == 200) {
    AlertaEliminarCliente();
  }
  if(response.status == 400){
    AlertaErrorEliminarCliente();
  }
  }
  
  )
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  }

// ALERTA ELIMINAR CLIENTE CORRECTAMENTE == 200

function AlertaEliminarCliente(){

  const modalContainer = document.getElementById('alerta-eliminar');

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.tabIndex = -1;
  modal.innerHTML = `
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">ESTADO DE CLIENTE</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p>Cliente ELIMINADO correctamente</p>
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


//ALERTA ERROR AL ELIMINAR CLIENTE == 400

function AlertaErrorEliminarCliente(){

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
                  <p>ERROR AL ELIMINAR CLIENTE</p>
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