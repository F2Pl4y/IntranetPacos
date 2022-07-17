// const dominioCategoria = "https://f3rn4nd021py.pythonanywhere.com/";
const dominioCategoria = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    cargarCategorias();
});
function cargarCategorias() {
    const id = sessionStorage.getItem("idEmpleado");
    if (id !== null) {
        $.ajax({
            type: "GET",
            url: dominioCategoria + "categorias/select2/",
            dataType: "json",
            success: function (data) {
                $('#fertitulo').html("sss");
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                let cadena = "";
                cadena = '<li>' +
                    '<a href="trabajadores.html">' +
                    '<i class="fa fa-user-tie"></i> ${data[valor]["correoEmpleado"]' +
                    '</a>' +
                    '</li>' 
                    // '<li>' +
                    // '<a href="encuesta.html">' +
                    // '<i class="fa fa-check-square-o"></i>Dashboard' +
                    // '</a>' +
                    // '</li>' +
                    // '<li>' +
                    // '<a href="cuentasadmin.html">' +
                    // '<i class="fa fa-lock-open"></i>Cuentas Admin' +
                    // '</a>' +
                    // '</li>' +
                    // '<li>' +
                    // '<a href="ofertas.html">' +
                    // '<i class="fa fa-utensils"></i>Ofertas' +
                    // '</a>' +
                    // '</li>' +
                    // '<hr style="height: 10px;background-color: white;"></hr>' +
                    // '<li style="display: contents;">' +
                    // '<a href="moduloEncuesta.html">' +
                    // '<i class="fa fa-list-alt"></i>Modulo de encuestas' +
                    // '</a>' +
                    // '</li>' +
                    // '<li>' +
                    // '<a href="pedidos.html">' +
                    // '<i class="fa fa-utensils"></i>Pedidos' +
                    // '</a>' +
                    // '</li>' +
                    // '<li>' +
                    // '<a href="carta.html">' +
                    // '<i class="fa fa-utensils"></i>Carta' +
                    // '</a>' +
                    // '</li>'
                    ;
            });
                $('#nombreCategorias').html(cadena);
            }

        });
    }
}
// function cargosCombo() {
//     $.ajax({
//         type: "GET",
//         url: dominioCategoria + "cargos/select2/",
//         dataType: "json",
//         success: function (data) {
//             var tabla = '';
//             $.each(data["resultado"], function (llave, valor) {
//                 var template = '<option value="' + valor["idCargo"] + '">' + valor["nombreCargo"];
//                 template += '</option>';
//                 tabla += template;
//             });
//             $('#contenidoCargosList').html(tabla);
//             $('#contenidoCargosList2').html(tabla);
//             $('#contenidoCargosList3').html(tabla);
//             $('#contenidoCargosList4').html(tabla);
//             $('#contenidoCargosList5').html(tabla);
//         }
//     });
// }