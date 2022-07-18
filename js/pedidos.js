// const dominioCategoria = "https://f3rn4nd021py.pythonanywhere.com/";
const dominioCategoria = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    cargarCategorias();
    cargarCategoriasOption();
    ListarProductosG();
});
function ListarProductosG() {
    $.ajax({
        type: "GET",
        url: dominioCategoria + "productosg/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<div class="col-md-4">';
                template += '<div class="product-Box">';
                template += '<div class="product-img">';
                if (valor["imagen"] != "foto.jpg") {
                    template += `<img id="idImgCarta" class="img-fluid" src="${dominioCategoria}/pedido/foto/${valor["imagen"]}/" alt="${valor["imagen"]}">`;
                }
                template += '</div>';
                template += '<div class="product-content">';
                template += '<h3>' + valor["nombreProducto"] + '</h3>';
                template += '<div class="priceTag">' + valor["precio"] + '</div>';
                template += '<div class="contenbox">';
                template += '<p>' + valor["descripcion"] + '</p>';
                template += '<ul class="bottom-Link">';
                // template += '<li><a href="#" data-toggle="modal" data-target="#EditarProducto" class="fa fa-shopping-cart"></a></li>';
                // template += '<li><a type="button" id="btnAñadirCarrito" class="fa fa-shopping-cart"></a></li>';
                template += `<li><a type="button" onclick="obtenervalores(${valor["idProducto"]}, ${valor["precio"]}, '${(valor["nombreProducto"])}',${valor["precio"]})" href="#" class="fa fa-shopping-cart"></a></li>`;
                // template += `<li><a type="button" onclick="obtenervalores(${valor["idProducto"]},${valor["precio"]})" href="#" class="fa fa-shopping-cart"></a></li>`;
                template += '</ul>';
                template += '</div>';
                template += `<div class="contenbox"><input style="text-align: center;" value="1" type="text" class="form-control" name="txtprecioCant" placeholder="Ingrese la cantidad" id="${(valor["nombreProducto"])}" onkeypress="return SoloNumeros(event);"></div>`;
                template += '</div>';
                template += '</div>';
                template += '</div>';
                tabla += template;
            });
            $('#ProductosCarta').html(tabla);
        }
    });
}
function ListarProductosGet(miname) {

    $.ajax({
        type: "GET",
        url: dominioCategoria + "productos/select/" + miname + "/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $('#tituloProductos').html('"' + miname + '"');
            $('#tituloGPedidos').html('');
            // $('#ProductosCarta').html(tabla);
            console.log("hola");
            $.each(data["resultado"], function (llave, valor) {
                var template = '<div class="col-md-4">';
                template += '<div class="product-Box">';
                template += '<div class="product-img">';
                // template += '<img id="idImgCarta" class="img-fluid" src="" alt="' + valor["imagen"] + '">';
                if (valor["imagen"] != "foto.jpg") {
                    template += `<img id="idImgCarta" class="img-fluid" src="${dominioCategoria}/pedido/foto/${valor["imagen"]}/" alt="${valor["imagen"]}">`;
                }
                template += '</div>';
                template += '<div class="product-content">';
                template += '<h3>' + valor["nombreProducto"] + '</h3>';
                template += '<div class="priceTag">' + valor["precio"] + '</div>';
                template += '<div class="contenbox">';
                template += '<p>' + valor["descripcion"] + '</p>';
                template += '<ul class="bottom-Link">';
                // template += '<li><a href="#" data-toggle="modal" data-target="#EditarProducto" class="fa fa-shopping-cart"></a></li>';
                template += `<li><a type="button" onclick="obtenervalores(${valor["idProducto"]}, ${valor["precio"]}, '${(valor["nombreProducto"])}')" href="#" class="fa fa-shopping-cart"></a></li>`;
                template += '</ul>';
                template += '</div>';
                // template += `<div class="contenbox"><input style="text-align: center;" type="text" class="form-control" name="txtprecioCant" placeholder="Ingrese la cantidad" id="txtprecioCant" 
                // onclick="total();" onkeypress="return SoloNumeros(event);"></div>`;
                template += `<div class="contenbox"><input style="text-align: center;" value="1" type="text" class="form-control" name="txtprecioCant" placeholder="Ingrese la cantidad" id="${(valor["nombreProducto"])}" onkeypress="return SoloNumeros(event);"></div>`;
                template += '</div>';
                template += '</div>';
                template += '</div>';
                tabla += template;
            });
            $('#ProductosCarta').html(tabla);
        }
    });
}
function cargarCategorias() {
    // const id = sessionStorage.getItem("idEmpleado");
    // if (id !== null) {
    $.ajax({
        type: "GET",
        url: dominioCategoria + "categorias/select2/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var cadena = "";
                cadena = '<li>' +
                    `<a onclick="ListarProductosGet('${valor["nombreCategoria"]}')" value="${valor["idCategoria"]}" href="#" class="btn opcionesOfertas"> ${valor["nombreCategoria"]} </a></li>`
                tabla += cadena;
            });
            $('#nombreCategorias').html(tabla);
        }

    });
    // }
}
// function insertPedido() {
//     const inputValue2 = document.getElementById("validaID").value;
//     console.log(inputValue2);
// }
function cargarCategoriasOption() {
    $.ajax({
        type: "GET",
        url: dominioCategoria + "categorias/select2/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<option value="' + valor["idCategoria"] + '">' + valor["nombreCategoria"];
                template += '</option>';
                tabla += template;
            });
            $('#categoriaCargosList').html(tabla);
            $('#categoriaCargosList2').html(tabla);
            $('#categoriaCargosList3').html(tabla);
        }
    });
}