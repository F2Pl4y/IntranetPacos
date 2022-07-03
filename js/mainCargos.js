window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url es:", url);
    const boton = document.getElementById('btnEnviarCI');
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            console.log("actualizando el cargo")
            cargoUpdate();
        }
        if (url === "/pages/cuentasadmin.html") {
            console.log("la url dentro del pages es:", url);
        }
    });
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        cargosSelect();
    }
});
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const boton1 = document.getElementById('btnEnviarE2');
    boton1.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            CargoUpdateEmp();
            // $('#myModal4X').modal('hide');
            // $('#myModal4X').modal('show');
            // $('#myModal3X').modal('hide');
            // $('#myModal3X').modal('show');
        }
        // if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
        //     cursoUpdate();
        // }
    });
    // const boton2 = document.getElementById('btnEnviarActualizarCargoDes');
    // boton2.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     if (url === "/pages/trabajadores.html") {
    //         CargoUpdateEmp();
    //     }
    // });
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        empSelect();
    }
});
// function CargoUpdateDes() {
//     const url = window.location.pathname;
//     var registrosEmpl = new FormData();
//     // registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());
//     registrosEmpl.append("txtidCargo4", $('#txtidCargo4').val());
//     $.ajax({
//         type: "PUT",
//         url: "http://127.0.0.1:5000/empleados/update2/" + registrosEmpl.get("txtidEmpleado4") + "/",
//         // url: "https://f3rn4nd021py.pythonanywhere.com/empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
//         data: registrosEmpl,
//         dataType: 'json',
//         contentType: false,
//         enctype: 'multipart/form-data',
//         processData: false,
//         success: function (data) {
//             if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
//                 AdminSelect();
//             }
//             if (url === "/pages/trabajadores.html") {
//                 empSelect();
//             }
//             crearMensaje(data["mensaje"]);
//         }
//     });
//     // limpiar contraseña
//     formulario3.reset();
// }
function CargoUpdateEmp() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    // registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());
    console.log("mi nombre: " + $('#tituloModalCargoDes').val()) /* ejemplo: vale 53 */
    registrosEmpl.append("miidnuevo", $('#miidnuevo').val());
    registrosEmpl.append("micargonuevo", $('#micargonuevo').val());
    registrosEmpl.append("tituloModalCargoDes", $('#tituloModalCargoDes').val());
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/empleados/update2/" + registrosEmpl.get("miidnuevo") + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                empSelect();
            }
            crearMensaje(data["mensaje"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function cargosSelect() {
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/cargos/select/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                if (valor["idCargo"] == 1) {
                    var template = '<tr>';
                    template += '<td>' + valor["idCargo"] + '</td>';
                    template += '<td>' + valor["nombreCargo"] + '</td>';
                    template += '<td>' + valor["estado"] + '</td>';
                    template += '<td class="grupoBotones">';
                    template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="gg-info"></i></a>';
                    template += '</button>';
                    template += '</div>';
                    template += '</td>';
                    template += '</tr>';
                    tabla += template;
                } else {
                    var template = '<tr>';
                    template += '<td>' + valor["idCargo"] + '</td>';
                    template += '<td>' + valor["nombreCargo"] + '</td>';
                    template += '<td>' + valor["estado"] + '</td>';
                    template += '<td class="grupoBotones">';
                    template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="gg-info"></i></a>';
                    template += '</button>';
                    template += '<button class="btn">';
                    // template += '<a href="#" class="btn btn-danger" onclick="return deshabilitar(' + valor["idCargo"] + ')"><i class="bx bxs-trash-alt"></i></a>';
                    template += '<a href="#" class="btn btn-danger" onclick="deshabilitar(' + valor["idCargo"] + ')"><i class="gg-unavailable"></i></a>';
                    template += '</button>';
                    template += '</div>';
                    template += '</td>';
                    template += '</tr>';
                    tabla += template;
                }
            });
            // tercer paso
            $('#contenido3').html(tabla);
        }
    });
}
function empGetCargos(id) {
    console.log("id dentro de empGetCargos: " + id)
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/empleadosXcargo/get/" + id + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/empleados/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#miidnuevo').val(data["resultado"]["idEmpleado"]);
            // $('#txtnombreEmpleado').val(data["resultado"]["nombreEmpleado"]);
            // $('#txtcorreoEmpleado').val(data["resultado"]["correoEmpleado"]);
            // $('#txtencuestasRealizadas').val(data["resultado"]["encuestasRealizadas"]);
            // $('#txtestado').val(data["resultado"]["estado"]);
            $('#micargonuevo').val(data["resultado"]["idCargo"]);
            $('#tituloModalCargoDes').val(data["resultado"]["nombreEmpleado"]);
            // console.log("esto es:" + data["resultado"]["idEmpleado"])
            // $('#tituloModal').html("Actualizando datos del empleado: <br>" + data["resultado"]["nombreEmpleado"]);
            $('#tituloModalCargoDes').html("<br>''" + data["resultado"]["nombreEmpleado"] + "''");
            $('#micargonuevo').html("<br>''" + data["resultado"]["idCargo"] + "''");
        }
    });
    formulario2.reset();
}
function cargoGet(id) {
    console.log("el id es:", id);
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/cargos/get/" + id + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidCargoModal2x').val(data["resultado"]["idCargo2"]);
            $('#txtnombreCargo2').val(data["resultado"]["nombreCargo2"]);
            // $('#tituloModalcargo').html("Actualizando el cargo: <br>" + data["resultado"]["nombreCargo2"]);

            $('#tituloModalcargo1').html("<br>''" + data["resultado"]["nombreCargo2"] + "''");
            $('#tituloModalcargo2').html("<br>''" + data["resultado"]["nombreCargo2"] + "''");
            $('#nombreEmpleadoCargo').html("<br>''" + data["resultado"]["nombreCargo2"] + "''");
        }
    });
}
function cargoInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreCargo", $('#txtnombreCargo').val());
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/cargos/create/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/trabajadores.html";
            cargosSelect();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    formulario.reset();
}
function cerrarModal() {
    // var modal = getElementById('#myModal3')
    $('#myModal3').modal('hide');
    // $(modal).modal('hide');
    // $('#modal-body').modal('hide');
}
function cargoUpdate() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    // registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    // registrosEmpl.append("txtnombreCargo4", $('#txtnombreCargo4').val());
    registrosEmpl.append("txtidCargoModal2x", $('#txtidCargoModal2x').val());
    registrosEmpl.append("txtnombreCargo2", $('#txtnombreCargo2').val());
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/cargos/update/" + registrosEmpl.get("txtidCargoModal2x") + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/update/" + registrosEmpl.get("txtidCargo2") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                cargosSelect();
            }
            crearMensaje(data["mensaje"]);
            // crearMensaje(data["exito"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function deshabilitar(id) {
    const url = window.location.pathname;
    console.log("la data es:")
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/cargos/update2/" + id + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/update2/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                cargosSelect();
                // console.log("la data es:" + data.length)
                // console.log(data["resultado"]);
                console.log("tamaño data: " + data.resultado.length)
                if (data.resultado.length > 0) {
                    var tabla = '';
                    console.log("hay gente");
                    $('#myModal3X').modal('show');
                    $('#myModal1X').modal('hide');
                    myModal4X
                    // cuarto paso
                    // creacion de un foreach en caso de que halla empleados enlazados con el cargo a inhabilitar
                    $.each(data["resultado"], function (llave, valor) {
                        console.log("el id de update 2 es:" + valor["idCargo"])
                        if (valor["idCargo"] == 1) {
                            var template = '<tr>';
                            template += '<td>' + valor["idEmpleado"] + '</td>';
                            template += '<td>' + valor["nombreEmpleado"] + '</td>';
                            template += '<td>' + valor["correoEmpleado"] + '</td>';
                            template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                            template += '<td>' + valor["estado"] + '</td>';
                            template += '<td>' + valor["idCargo"] + '</td>';
                            template += '<td class="grupoBotones">';
                            template += '<div class="btn-group">';
                            template += '<button class="btn">';
                            template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal4X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="gg-info"></i></a>';
                            template += '</button>';
                            template += '</div>';
                            template += '</td>';
                            template += '</tr>';
                            tabla += template;
                        } else {
                            // console.log("el valor de idcargo dentro de contenido4 es: " + valor["idEmpleado"])
                            var template = '<tr>';
                            template += '<td>' + valor["idEmpleado"] + '</td>';
                            template += '<td>' + valor["nombreEmpleado"] + '</td>';
                            template += '<td>' + valor["correoEmpleado"] + '</td>';
                            template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                            template += '<td>' + valor["estado"] + '</td>';
                            template += '<td>' + valor["idCargo"] + '</td>';
                            template += '<td class="grupoBotones">';
                            template += '<div class="btn-group">';
                            template += '<button class="btn">';
                            // quinto paso
                            template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal4X" onclick=empGetCargos(' + valor["idEmpleado"] + ')><i class="gg-info"></i></a>';
                            template += '</button>';
                            template += '<button class="btn">';
                            template += '<a href="#" class="btn btn-danger" onclick="empEliminar(' + valor["idEmpleado"] + ')"><i class="gg-trash"></i></a>';
                            template += '</button>';
                            template += '</div>';
                            template += '</td>';
                            template += '</tr>';
                            tabla += template;
                        }
                    });
                    $('#contenido4').html(tabla);
                    $('#modal33x').html("<br>''" + data["cargo"] + "''");
                }
                else {
                    console.log("vacio");
                }
            }
            // crearMensaje(data["resultado"]);
        }
    });
    return false;
}
function ocultar() {
    $('#myModal1X').modal('show');
    $('#myModal3X').modal('hide');
}
function ocultar2() {
    // $('#myModal1X').modal('show');
    $('#myModal4X').modal('hide');
}