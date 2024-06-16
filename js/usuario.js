var g_id_usuario = "";

//Listar Usuarios

function listarUsuarios(){
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario?_size=200", requestOptions)
      .then((response) => response.json())
      .then((json) => {
        json.forEach(completarFila);
        $('#tbl_usuario').DataTable();
      }
      )
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }


  // Completar Fila de Usuarios

function completarFila(element,index,arr){
arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML += 
`<tr>
<td>${element.id_usuario}</td>
<td>${element.dv}</td>
<td>${element.nombres}</td>
<td>${element.apellidos}</td>
<td>${element.email}</td>
<td>${element.celular}</td>
<td>${element.username}</td>
<td>${element.password}</td>
<td>${element.fecha_registro}</td>
<td>
<a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
<a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a> 
</td>
</tr>` 
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

// AGREGAR USUARIO

function AgregarUsuario(){
    var fecha_Actual = new Date();
    var fechaFormateada = formatearFechaHora(fecha_Actual);
    var id_usuario   = document.getElementById("txt_id_usuario").value;
    var dv           = document.getElementById("txt_dv_usuario").value;
    var nombres      = document.getElementById("txt_nombres_usuario").value;
    var apellidos    = document.getElementById("txt_apellidos_usuario").value;
    var email        = document.getElementById("txt_email_usuario").value;
    var celular      = document.getElementById("txt_celular_usuario").value;
    var username     = document.getElementById("txt_username_usuario").value;
    var password     = document.getElementById("txt_password_usuario").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    
    const raw = JSON.stringify({
      "id_usuario": id_usuario,
      "dv": dv,
      "nombres": nombres,
      "apellidos": apellidos,
      "email": email,
      "celular": celular,
      "username": username,
      "password": password,
      "fecha_registro": fechaFormateada
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
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

// ALERTA AL AGREGAR USUARIO == 200

function AlertaBien(){

    const modalContainer = document.getElementById('alerta-bien');
  
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ESTADO DE USUARIO</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Usuario INGRESADO correctamente</p>
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

//ALERTA ERROR AL AGREGAR USUARIO == 400
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
                    <p>Error al ingresar usuario</p>
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

//TODO LO NECESARIO PARA ACTUALIZAR USUARIO
//OBTENER ID AL ACTUALIZAR

function obtenerIdActualizacion(){
    const queryString       = window.location.search;
    const parametros        = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
  
    obtenerDatosActualizacion(p_id_usuario);
}

//OBTENER DATOS ACTUALIZACION

function obtenerDatosActualizacion(id_usuario) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaActualizar))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//ALERTA PARA SABER ID QUE ELIMINAMOS

function completarEtiquetaActualizar(element){
    var IdUsuario = element.id_usuario;
    document.getElementById('lbl_actualizar').innerHTML ="¿Desea Actualizar este Usuario? ID_USUARIO=<b>"+IdUsuario +"</b>";
}

//ACTUALIZAR USUARIO

function ActualizarUsuario(){
    var fecha_Actual = new Date();
    var fechaFormateada = formatearFechaHora(fecha_Actual);
    var id_usuario   = document.getElementById("txt_id_usuario").value;
    var dv           = document.getElementById("txt_dv_usuario").value;
    var nombres      = document.getElementById("txt_nombres_usuario").value;
    var apellidos    = document.getElementById("txt_apellidos_usuario").value;
    var email        = document.getElementById("txt_email_usuario").value;
    var celular      = document.getElementById("txt_celular_usuario").value;
    var username     = document.getElementById("txt_username_usuario").value;
    var password     = document.getElementById("txt_password_usuario").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    
    const raw = JSON.stringify({
      "id_usuario": id_usuario,
      "dv": dv,
      "nombres": nombres,
      "apellidos": apellidos,
      "email": email,
      "celular": celular,
      "username": username,
      "password": password,
      "fecha_registro": fechaFormateada
    });
    
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
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

//ALERTA ACTUALIZAR USUARIO == 200
function AlertaBienActualizar(){

    const modalContainer = document.getElementById('alerta-bien');
  
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ESTADO DE USUARIO</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Usuario ACTUALIZADO correctamente</p>
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


//ALERTA ERROR ACTUALIZAR USUARIO == 400
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
                    <p>El usuario no se ha podido actualizar</p>
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

//TODO LO NECESARIO PARA LA ELIMINACIÓN DE USUARIO
//OBTENER ID PARA ELIMINAR
function obtenerIdEliminacion(){
    const queryString       = window.location.search;
    const parametros        = new URLSearchParams(queryString);
    const p_id_usuario = parametros.get('id');
    g_id_usuario = p_id_usuario;
  
    obtenerDatosEliminacion(p_id_usuario);
}

function obtenerDatosEliminacion(id_usuario) {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+id_usuario, requestOptions)
      .then((response) => response.json())
      .then((json) => json.forEach(completarEtiquetaEliminacion))
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//ALERTA PARA ASEGURARNOS QUE SEA LA ID DE USUARIO DESEADA A ELIMINAR

function completarEtiquetaEliminacion(element){
    var IdUsuario = element.id_usuario;
    document.getElementById('lbl_eliminar').innerHTML ="¿Desea Actualizar este Usuario? ID_USUARIO=<b>"+IdUsuario +"</b>";
}

//ELIMINAR USUARIO

function EliminarUsuario(){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    
    redirect: "follow"
    };
    
    fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
    .then((response) => {
    if(response.status == 200) {
      AlertaEliminarUsuario();
    }
    if(response.status == 400){
      AlertaErrorEliminarUsuario();
    }
    }
    
    )
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
    }
  
  // ALERTA ELIMINAR CLIENTE CORRECTAMENTE == 200
  
  function AlertaEliminarUsuario(){
  
    const modalContainer = document.getElementById('alerta-eliminar');
  
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.tabIndex = -1;
    modal.innerHTML = `
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ESTADO DE USUARIO</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Usuario ELIMINADO correctamente</p>
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
  
  function AlertaErrorEliminarUsuario(){
  
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
                    <p>ERROR AL ELIMINAR USUARIO</p>
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


//REGRESO LOCAL
function RegresoLocal(){
    location.href="listar.html";
}