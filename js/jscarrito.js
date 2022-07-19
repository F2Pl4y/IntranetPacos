const dominioCarta = "http://127.0.0.1:5000/";
let carrito = []

// const agregarAlcarrito = (prodId)=>{
// const item = stockProductos.fin (prod) => prod.id
// }

function btnAñadirCarrito() {
    console.log(alert("presionaste el carrito"));
}
/* inicio completar datos por fila */


function llamartd(miid) {
    // let obtenerDato = document.getElementById("filasProductos");

    // let obtenerDato2 = document.getElementById("tablaCarritoPedido");
    // // let obtenerDato3 = document.getElementById("cabecera").length;
    // let filas = obtenerDato2.getElementsByTagName("tbody")[0];
    // // document.getElementById
    // console.log("filas");
    // console.log(filas);
    // // console.log(obtenerDato2);
    // for (let indexfer = 1; indexfer < filas; indexfer++) {
    //     console.log("as");
    //     // console.log("for");
    // }
    // var table = document.getElementById("tablaCarritoPedido");
    // var t = document.getElementById('tablaCarritoPedido');
    // if (t) {
    //     Array.from(t.rows).forEach((tr, row_ind) => {
    //         Array.from(tr.cells).forEach((cell, col_ind) => {
    //             console.log("---------");
    //             console.log('Value at row/col [' + row_ind + ',' + col_ind + '] = ' + cell.textContent);
    //         });
    //     });
    // }

    // console.log(obtenerDato[0].innerHTML);
    // console.log(obtenerDato[1].innerHTML);
    // console.log(obtenerDato[2].innerHTML);
    // console.log(obtenerDato[3].innerHTML);
    // console.log(obtenerDato[4].innerHTML);
    // console.log(obtenerDato[5].innerHTML);
}

/* fin completar datos por fila */
let ListaNombre = [{}];
function obtenervalores(miid, precio, nombre, preciounit) {
    let miarray2 = [miid];
    let miarray = [nombre];
    let miarray3 = [precio];
    let miarray4 = [preciounit];
    let value = document.getElementById(nombre).value;/* cantidad input */
    // value = parseFloat(value);
    // console.log(typeof value)
    var valueNombCli = document.getElementById("txtnombreProducto2").value;
    var valueIDempleado = document.getElementById("validaID").value;/* el id del empleado */
    // console.log("valueNombCli:",valueNombCli);
    // console.log(valueNombCli);
    // console.log(value);
    // console.log(valueIDempleado);
    let tabla = '<tr id="filasProductos">';
    miarray2.forEach(function (item, index, arr) {
        // console.log("Posición " + index + ": " + item);
        var template = `<td id="${miid}">`;
        template += item;
        template += '</td>';
        tabla += template;
        ListaNombre.push({ idProducto: miid, precio: (parseFloat(value) * preciounit).toFixed(2), preciounit: precio, idEmpleado: valueIDempleado, nombreCliente: valueNombCli, cantidad:  value});
    }); $('#contenidocarro').html(tabla);
    miarray.forEach(function (item, index, arr) {
        // console.log("Posición " + index + ": " + item);
        var template = '<td>';
        template += item;
        template += '</td>';
        tabla += template;
    }); $('#contenidocarro').html(tabla);
    miarray3.forEach(function (item, index, arr) {
        // console.log("Posición " + index + ": " + item);
        var template = `<td id="${miid}">`;
        template += (item * value).toFixed(2);
        template += '</td>';
        tabla += template;
    }); $('#contenidocarro').html(tabla);
    miarray4.forEach(function (item, index, arr) {
        // console.log("Posición " + index + ": " + item);
        var template = '<td>';
        template += item;
        template += '</td>';
        template += '</tr>';
        tabla += template;
    }); $('#contenidocarro').html(tabla);
    // llamartd(miid);
    // console.log("DATOS DEL LISTANOMBRE");
    // console.log(ListaNombre);
    // SolicitarPedido();
}
// function SolicitarPedido(miid, precio) {
function SolicitarPedido() {
    // inputValue = document.getElementById("mivalorID").value;
    // console.log(inputValue);
    // console.log("entraste en total");
    // console.log("entraste en total");
    // console.log("pedido solicitado");
    var valueNombCli = document.getElementById("txtnombreProducto2").value;
    ListaNombre[1]["nombreCliente"] = valueNombCli;
    // console.log(ListaNombre);
    InsertarPedido();
}

function InsertarPedido() {
    let s
    let conjunto
    let var1;
    let var2;
    let var3;
    let var4;
    console.log("InsertarPedido");
    ListaNombre.forEach(function (data, index) {
        s = JSON.stringify(data); // Stringify converts a JavaScript object or value to a JSON string
        console.log("datos:");
        // console.log(ListaNombre);
        console.log(s);
        // console.log(data["idProducto"]);
        // console.log(data["precio"]);
        // console.log(parseFloat(data["preciounit"]));
        // console.log(parseFloat(data["idEmpleado"]));
    });
    // url: dominioCarta + "datosCarritoPedido/",
    $.ajax({
        url: dominioCarta + "/datosCarritoPedido/",
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        data: JSON.stringify(s),
        succes: function (response) {
            console.log(response);
        },
        error: function (error) {
            console.log(error);
        }
        // method: "POST",
        // contentType: "application/json"
    });
    // const firstname = document.getElementById("fname").value;
    // const lastname = document.getElementById("lname").value;


    // const dict_values = { firstname, lastname } //Pass the javascript variables to a dictionary.
    // const s = JSON.stringify(dict_values); // Stringify converts a JavaScript object or value to a JSON string
    // s = JSON.stringify(data); // Stringify converts a JavaScript object or value to a JSON string
    // console.log(s);
    // console.log(s); // Prints the variables to console window, which are in the JSON format
    // window.alert(s)
    // $.ajax({
    //     url: "/test",
    //     type: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(s)
    // });
}
// src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
{/* <script> */ }
function myfunction(varS) {


}

