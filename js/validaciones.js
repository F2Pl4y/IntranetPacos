function SoloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toString();
    letras = "ABCDEFGHIJKLMNNÑOPORSTUVWKYZAEIÓUabcdefghijklmnñopqrstuvwxyzáéióú";
    especiales = [8, 13, 32];
    tecla_especial = false;
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }
    if (letras.indexOf(tecla) == -1 & !tecla_especial) {
        return false;
    }
}
// mostrar contraseña
function mostrarPassword() {
    var cambio = document.getElementById("txtpasswordEmpleado2");
    var cambio2 = document.getElementById("txtpasswordEmpleado");
    if (cambio.type == "password") {
        cambio.type = "text";
        cambio2.type = "text";
        $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    } else {
        cambio.type = "password";
        cambio2.type = "password";
        $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }
}
function SoloNumeros(evt) {
    if (window.event) {
        keynum = evt.keyCode;
    }
    else {
        keynum = evt.which;
    }
    if ((keynum > 47 && keynum < 58) || keynum == 8 || keynum == 13) {
        return true;
    }
    else {
        // alert("Ingresar solo numeros");
        return false;
    }
}
// limpiar input de cargos
$('#limpiarAgregar').click(function () {
    $('input[type="text"]').val('');
});
// mostrar un tooltip
// $(document).ready(function () {
//     // $('[data-toggle="tooltip"]').tooltip();
//     $('[data-toggle="tooltip"]').tooltip('show');
// });
// window.addEventListener('load', (e) => {
//     $(document).ready(function asdas() {
//         // $('[data-toggle="tooltip"]').tooltip();
//         // $('[data-toggle="tooltip"]').tooltip('show');
//     });
// });
// faltaria validar estos datos con python´