const dominioSesion = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;

    // if (url === "/index.html" || url === "/") {
    var valor = true;

    if (url === "/index.html" || url === "/") {
        operacionLoguear();
        login();
        visualizarPassword();
    } else {
        validarSesssion();
        cerrarSesion();
        llenarPerfil();
    }
});

function redireccionDefecto(idCargo) {
    if (idCargo === 1) window.location.href = "/pages/cuentasadmin.html";
    else window.location.href = "/pages/moduloEncuesta.html";
}

function cerrarSesion() {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    btnCerrarSesion.addEventListener('click', (e) => {
        sessionStorage.setItem("idEmpleado", null);
        window.location.href = "/";
    });
}

function visualizarPassword() {
    btnPasswordVision = document.getElementById('btnPasswordVision');
    txtPassword = document.getElementById('txtPassword');
    icono = document.querySelector('#btnPasswordVision i');
    btnPasswordVision.addEventListener('click', (e) => {
        if (txtPassword.type === 'password') {
            txtPassword.type = 'text';
            icono.className = 'bx bxs-show';
        } else {
            txtPassword.type = 'password';
            icono.className = 'bx bxs-hide';
        }
    });

}

function validarOperaciones(idCargo) {
    let cadena = "";
    if (idCargo === 1) {
        cadena = '<li>' +
            '<a href="ofertas.html">' +
            '<i class="fa fa-utensils"></i>Ofertas' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="trabajadores.html">' +
            '<i class="fa fa-user-tie"></i>Trabajadores' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="encuesta.html">' +
            '<i class="fa fa-check-square-o"></i>Encuestas' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="cuentasadmin.html">' +
            '<i class="fa fa-lock-open"></i>Cuentas Admin' +
            '</a>' +
            '</li>';
    } else {
        cadena = '<li>' +
            '<a href="pedidos.html">' +
            '<i class="fa fa-utensils"></i>Pedidos' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="carta.html">' +
            '<i class="fa fa-utensils"></i>Carta' +
            '</a>' +
            '</li>' +
            '<li>' +
            '<a href="moduloEncuesta.html">' +
            '<i class="fa fa-check-square-o"></i>Modulo de encuestas' +
            '</a>' +
            '</li>';
    }
    $('#main-nav').html(cadena);
}

function validarSesssion() {
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if (idEmpleado === null) {
        window.location.href = "/index.html";
    } else {
        $.ajax({
            type: "GET",
            url: dominioSesion + "empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                validarOperaciones(data["resultado"]["idCargo"]);
            }
        });

    }
}

function operacionLoguear() {
    const idEmpleado = sessionStorage.getItem("idEmpleado");
    if (idEmpleado !== null) {
        $.ajax({
            type: "GET",
            url: dominioSesion + "empleados/get/" + idEmpleado + "/",
            dataType: "json",
            success: function (data) {
                if (data["exito"] === true) {
                    redireccionDefecto(data["resultado"]["idCargo"]);
                    validarOperaciones(data["resultado"]["idCargo"]);
                }
            }
        });
    }

}

function login() {
    const txtCorreo = document.getElementById('txtCorreo');
    const txtPassword = document.getElementById('txtPassword');
    const logIncorrecto = document.getElementById('logIncorrecto');
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const registro = new FormData();
        registro.append("txtCorreo", txtCorreo.value);
        registro.append("txtPassword", txtPassword.value);
        $.ajax({
            type: "POST",
            url: dominioSesion + "empleados/login/",
            data: registro,
            contentType: false,
            dataType: "json",
            processData: false,
            success: function (data) {
                if (data["exito"] === true) {
                    sessionStorage.setItem("idEmpleado", data["resultado"]["idEmpleado"]);
                    redireccionDefecto(data["resultado"]["idCargo"]);
                    validarOperaciones(data["resultado"]["idCargo"]);
                } else {
                    logIncorrecto.textContent = data["resultado"]
                }
            }
        });
    });
}

// function llenarPerfil() {
//     const idEmpleado = sessionStorage.getItem("idEmpleado");
//     if (idEmpleado !== null) {
//         $.ajax({
//             type: "GET",
//             url: dominioSesion + "empleados/loginget/" + idEmpleado + "/",
//             dataType: "json",
//             success: function (data) {
//                 if (data["exito"] === true) {
//                     let carta = `<div>Correo: ${data["resultado"]["correoEmpleado"]}</div>`
//                     carta += `<div>Nombre: ${data["resultado"]["nombreEmpleado"]}
//                     </div>`
//                     carta += `<div>Encuestas realizadas: ${data["resultado"]["encuestasRealizadas"]}
//                     </div>`
//                     carta += `<div>Cargo: ${data["resultado"]["nombreCargo"]}
//                     </div>`
//                     $('#perfil123').html(carta)
//                 }
//             }
//         });
//     }
// }
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url aqui es de -> " + url);
    const boton2 = document.getElementById('btnPerfil');
        modalDatosLogin();

});
function modalDatosLogin() {
    const id = sessionStorage.getItem("idEmpleado");
    if (id !== null) {
        $.ajax({
            type: "GET",
            url: dominioSesion + "empleados/loginget/" + id + "/",
            dataType: "json",
            success: function (data) {

                $('#fertitulo').html("sss");
                let carta = `<div>Correo: ${data["resultado"]["correoEmpleado"]}</div>`
                carta += `<div>Nombre: ${data["resultado"]["nombreEmpleado"]}
                    </div>`
                carta += `<div>Encuestas realizadas: ${data["resultado"]["encuestasRealizadas"]}
                    </div>`
                carta += `<div>Cargo: ${data["resultado"]["nombreCargo"]}
                    </div>`
                $('#llenarperfil').html(carta);

                // $('#correoGroup').val(data["resultado"]["correoEmpleado"]);
                // $('#nombreGroup').val(data["resultado"]["nombreEmpleado"]);
                // $('#IDGroup').val(data["resultado"]["idCargo"]);
                // $('#IDEMPLGroup').val(data["resultado"]["idEmpleado"]);
                // $('#encuestasGroup').val(data["resultado"]["encuestasRealizadas"]);
            }

        });
    }
}
// function modalDatosLogin2() {
//     const id = sessionStorage.getItem("idEmpleado");
//     $.ajax({
//         type: "GET",
//         // url: dominioSesion + "empleados/select/",
//         url: dominioSesion + "empleados/get/" + id + "/",
//         // url: "http://127.0.0.1:5000/empleados/get/18",
//         dataType: "json",
//         success: function (data) {
//             console.log("->" + data["resultado"]["idCargo"]);
//             $('#correoGroup').val(data["resultado"]["correoEmpleado"]);
//             $('#nombreGroup').val(data["resultado"]["nombreEmpleado"]);
//             $('#IDGroup').val(data["resultado"]["idCargo"]);
//             $('#IDEMPLGroup').val(data["resultado"]["idEmpleado"]);
//             $('#encuestasGroup').val(data["resultado"]["encuestasRealizadas"]);
//             var template = '<tr>';
//             template += '<td>' + valor["idEmpleado"] + '</td>';
//             template += '<td>' + valor["nombreEmpleado"] + '</td>';
//             template += '<td>' + valor["correoEmpleado"] + '</td>';
//             template += '<td>' + valor["encuestasRealizadas"] + '</td>';
//             template += '<td>' + valor["estado"] + '</td>';
//             template += '<td>' + valor["idCargo"] + '</td>';
//             template += '</tr>';
//             tabla += template;
//             $('#prueba2').html(tabla);
//             if (data["resultado"]["idCargo"] == 1) {
//                 $('#CargoGroup').html("Cuenta Administrador");
//             }
//             else {
//                 $('#CargoGroup').html("Cuenta Trabajador");
//             }
//         }

//     });
// }