const dominioCategoria2 = "http://127.0.0.1:5000/";
function saludar() {
    console.log(baseDeDatos);
    ListarProductosG();
}
const baseDeDatos = [];
function ListarProductosG() {
    $.ajax({
        type: "GET",
        url: dominioCategoria2 + "productosg/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            baseDeDatos = data["resultado"]["idProducto"];
            // baseDeDatos = [
            //     {
            //         id: data["resultado"]["idProducto"],
            //         nombre: 'Patata',
            //         precio: 1
            //     },
            //     {
            //         id: 2,
            //         nombre: 'Cebolla',
            //         precio: 1.2
            //     }
            // ];
            console.log(baseDeDatos);
            $.each(data["resultado"], function (llave, valor) {
                baseDeDatos = [
                    {
                        id: data["resultado"]["idProducto"],
                        nombre: 'Patata',
                        precio: 1
                    },
                    {
                        id: 2,
                        nombre: 'Cebolla',
                        precio: 1.2
                    }
                ];
                var template = '<div class="col-md-4">';
                template += '<div class="product-Box">';
                template += '<div class="product-img">';
                // if (valor["imagen"] != "foto.jpg") {
                //     template += `<img id="idImgCarta" class="img-fluid" src="${dominioCategoria2}/pedido/foto/${valor["imagen"]}/" alt="${valor["imagen"]}">`;
                // }
                template += '</div>';
                template += '<div class="product-content">';
                template += '<h3>' + valor["nombreProducto"] + '</h3>';
                template += '<div class="priceTag">' + valor["precio"] + '</div>';
                template += '<div class="contenbox">';
                template += '<p>' + valor["descripcion"] + '</p>';
                template += '<ul class="bottom-Link">';
                // template += `<li><a type="button" onclick="obtenervalores(${valor["idProducto"]}, ${valor["precio"]}, '${(valor["nombreProducto"])}')" href="#" class="fa fa-shopping-cart"></a></li>`;
                template += '</ul>';
                template += '</div>';
                template += `<div class="contenbox"><input style="text-align: center;" value="1" type="text" class="form-control" name="txtprecioCant" placeholder="Ingrese la cantidad" id="${(valor["nombreProducto"])}" onkeypress="return SoloNumeros(event);"></div>`;
                template += '</div>';
                template += '</div>';
                template += '</div>';
                tabla += template;
            });
            $('#ProductosCarta2').html(tabla);
        }
    });
}
// Variables
// let 
// baseDeDatos = [
//     {
//         id: 1,
//         nombre: 'Patata',
//         precio: 1
//     },
//     {
//         id: 2,
//         nombre: 'Cebolla',
//         precio: 1.2
//     }
// ];
let carrito = [];
const divisa = '€';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');

// Funciones
/**
 * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
 */
function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen

        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

/**
 * Evento para añadir un producto al carrito de la compra
 */
function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Actualizamos el carrito 
    renderizarCarrito();

}

/**
 * Dibuja todos los productos guardados en el carrito
 */
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
    // Recorremos el array del carrito 
    return carrito.reduce((total, item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        // Los sumamos al total
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}

/**
 * Varia el carrito y vuelve a dibujarlo
 */
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
}
// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
// Inicio
renderizarProductos();
renderizarCarrito();