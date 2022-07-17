// const dominioSesion = "https://f3rn4nd021py.pythonanywhere.com/";
const dominioSesion = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;

    if (url === "/index.html" || url === "/") {
        operacionLoguear();
        login();
        visualizarPassword();
    } else {
        validarSesssion();
        cerrarSesion();
        // llenarPerfil();
    }
});

function redireccionDefecto(idCargo) {
    if (idCargo === 1) { window.location.href = "/pages/cuentasadmin.html"; }
    else { window.location.href = "/pages/moduloEncuesta.html"; }
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
    cadena = '<li>' +
        '<a href="trabajadores.html">' +
        '<i class="fa fa-user-tie"></i>Trabajadores' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="encuesta.html">' +
        '<i class="fa fa-check-square-o"></i>Dashboard' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="cuentasadmin.html">' +
        '<i class="fa fa-lock-open"></i>Cuentas Admin' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="ofertas.html">' +
        '<i class="fa fa-utensils"></i>Ofertas' +
        '</a>' +
        '</li>' +
        '<hr style="height: 10px;background-color: white;"></hr>' +
        '<li style="display: contents;">' +
        '<a href="moduloEncuesta.html">' +
        '<i class="fa fa-list-alt"></i>Modulo de encuestas' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="pedidos.html">' +
        '<i class="fa fa-utensils"></i>Pedidos' +
        '</a>' +
        '</li>' +
        '<li>' +
        '<a href="carta.html">' +
        '<i class="fa fa-utensils"></i>Carta' +
        '</a>' +
        '</li>'
        ;
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

window.addEventListener('load', (e) => {
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
                carta += `<div><input id="validaID" type="text" value="${data["resultado"]["idEmpleado"]}">
                    </div>`
                $('#llenarperfil').html(carta);
            }

        });
    }
}