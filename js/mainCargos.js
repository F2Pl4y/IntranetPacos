window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url es:", url);
    const boton = document.getElementById('btnEnviarCI');
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
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
        if (url === "/pages/trabajadores.html") {
            CargoUpdateEmp();
        }
        // if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
        //     cursoUpdate();
        // }
    });
    // if (url === "/pages/cuentasadmin.html") {
    //     AdminSelect();
    // }
    // if (url === "/pages/cuentasadmin") {
    //     AdminSelect();
    // }
    if (url === "/pages/trabajadores.html") {
        empSelect();
    }
});
function CargoUpdateEmp() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    // registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());
    registrosEmpl.append("txtidCargo4", $('#txtidCargo4').val());
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/empleados/update2/" + registrosEmpl.get("txtidEmpleado4") + "/",
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
    formulario2.reset();
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
                    template += '<a href="#" class="btn btn-danger" onclick="return deshabilitar(' + valor["idCargo"] + ')"><i class="gg-unavailable"></i></a>';
                    template += '</button>';
                    template += '</div>';
                    template += '</td>';
                    template += '</tr>';
                    tabla += template;
                }
            });
            $('#contenido3').html(tabla);
        }
    });
}
function cargoGet(id) {
    console.log("el id es:", id);
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:5000/cargos/get/" + id + "/",
        // url: "https://f3rn4nd021py.pythonanywhere.com/cargos/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidCargo2').val(data["resultado"]["idCargo2"]);
            $('#txtnombreCargo2').val(data["resultado"]["nombreCargo2"]);
            // $('#tituloModalcargo').html("Actualizando el cargo: <br>" + data["resultado"]["nombreCargo2"]);
            $('#tituloModalcargo1').html("<br>''" + data["resultado"]["nombreCargo2"] + "''");
            $('#tituloModalcargo2').html("<br>''" + data["resultado"]["nombreCargo2"] + "''");
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
    registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    registrosEmpl.append("txtnombreCargo4", $('#txtnombreCargo4').val());
    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:5000/cargos/update/" + registrosEmpl.get("txtidCargo2") + "/",
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
            // crearMensaje(data["mensaje"]);
            // crearMensaje(data["exito"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function deshabilitar(id) {
    const url = window.location.pathname;
    // console.log("la data es:" + $.ajax({data}))
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
                console.log("tamaño data:" + data.resultado.length)
                if (data.resultado.length > 0) {
                    var tabla = '';
                    console.log("hay gente");
                    console.log(data["resultado"][0][0]);
                    $('#myModal3X').modal('show');
                    $('#myModal1X').modal('hide');
                    $.each(data["resultado"], function (llave, valor) {
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
                            template += '<button class="btn">';
                            // template += '<a href="#" class="btn btn-danger" onclick="return deshabilitar(' + valor["idCargo"] + ')"><i class="bx bxs-trash-alt"></i></a>';
                            template += '<a href="#" class="btn btn-danger" onclick="return deshabilitar(' + valor["idCargo"] + ')"><i class="gg-unavailable"></i></a>';
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