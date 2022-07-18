// function SoloLetras(a) { for (var b in key = a.keyCode || a.which, tecla = String.fromCharCode(key).toString(), letras = "ABCDEFGHIJKLMNN\xd1OPORSTUVWKYZAEI\xd3Uabcdefghijklmn\xf1opqrstuvwxyz\xe1\xe9i\xf3\xfa", tecla_especial = !1, especiales = [8, 13, 32]) if (key == especiales[b]) { tecla_especial = !0; break } if (-1 == letras.indexOf(tecla) & !tecla_especial) return !1 } function mostrarPassword() { var a = document.getElementById("txtpasswordEmpleado2"), b = document.getElementById("txtpasswordEmpleado"); "password" == a.type ? (a.type = "text", b.type = "text", $(".icon").removeClass("fa fa-eye-slash").addClass("fa fa-eye")) : (a.type = "password", b.type = "password", $(".icon").removeClass("fa fa-eye").addClass("fa fa-eye-slash")) } function SoloNumeros(a) { return !!((keynum = window.event ? a.keyCode : a.which) > 47 && keynum < 58) || 8 == keynum || 13 == keynum } $("#limpiarAgregar").click(function () { $('input[type="text"]').val("") })
function SoloLetras(a) {
    for (var b in key = a.keyCode || a.which,
        tecla = String.fromCharCode(key).toString(),
        letras = "ABCDEFGHIJKLMNN\xd1OPORSTUVWKYZAEI\xd3Uabcdefghijklmn\xf1opqrstuvwxyz\xe1\xe9i\xf3\xfa",
        tecla_especial = !1,
        especiales = [8, 13, 32])
        if (key == especiales[b]) {
            tecla_especial = !0;
            break
        }
    if (-1 == letras.indexOf(tecla) & !tecla_especial)
        return !1
}
function mostrarPassword() {
    var a = document.getElementById("txtpasswordEmpleado2")
        , b = document.getElementById("txtpasswordEmpleado")
        , c = document.getElementById("txtContraseñaAdmin");
    "password" == a.type ? (a.type = "text", b.type = "text", c.type = "text", $(".icon").removeClass("fa fa-eye-slash").addClass("fa fa-eye")) : (a.type = "password", b.type = "password", c.type = "password", $(".icon").removeClass("fa fa-eye").addClass("fa fa-eye-slash"))
}
function SoloNumeros(a) {
    return !!((keynum = window.event ? a.keyCode : a.which) > 47 && keynum < 58) || 8 == keynum || 13 == keynum
}
function SoloNumerosDecimal(a) {
    return !!((keynum = window.event ? a.keyCode : a.which) > 47 && keynum < 58) || 8 == keynum || 13 == keynum || 46 == keynum
}
$("#limpiarAgregar").click(function () {
    $('input[type="text"]').val("");
})

