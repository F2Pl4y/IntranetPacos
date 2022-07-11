const dominio = "https://f3rn4nd021py.pythonanywhere.com/";
// const dominio = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const botonCargos = document.getElementById('btnEnviarCI');
    botonCargos.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            cargoUpdate(); cargosCombo();
            $('#myModal2X').modal('hide');
            $('#myModal1X').modal('show');
        }
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            cargosCombo();
        }
    });
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        cargosSelect();
    }
    cargosCombo();
});
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const botonCargos2 = document.getElementById('btnEnviarE2');
    botonCargos2.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            ocultar2();
            CargoUpdateEmp();
            // aqui va el actulizar la lista de modal3x
        }
    });
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        empSelectCargos();
    }
});
function empSelectCargos() {
    $.ajax({
        type: "GET",
        url: dominio + "empleados/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                var template = '<tr>';
                template += '<td>' + valor["idEmpleado"] + '</td>';
                template += '<td>' + valor["nombreEmpleado"] + '</td>';
                template += '<td>' + valor["correoEmpleado"] + '</td>';
                // template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                // template += '<td>' + valor["estado"] + '</td>';
                template += '<td>' + valor["idCargo"] + '</td>';
                template += '<td class="grupoBotones">';
                template += '<div class="btn-group">';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2" onclick=empGet(' + valor["idEmpleado"] + ')><i class="gg-info"></i></a>';
                template += '</button>';
                template += '<button class="btn">';
                template += '<a href="#" class="btn btn-danger" onclick="return empEliminar(' + valor["idEmpleado"] + ')"><i class="gg-trash"></i></a>';
                template += '</button>';
                template += '</div>';
                template += '</td>';
                template += '</tr>';
                tabla += template;
            });
            $('#contenido2').html(tabla);
        }
    });
}
function CargoUpdateEmp() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    registrosEmpl.append("miidnuevo", $('#miidnuevo').val());
    // registrosEmpl.append("micargonuevo", $('#micargonuevo').val());
    registrosEmpl.append("micargonuevo", $('#contenidoCargosList').val());
    registrosEmpl.append("tituloModalCargoDes", $('#tituloModalCargoDes').val());
    $.ajax({
        type: "PUT",
        url: dominio + "empleados/update2/" + registrosEmpl.get("miidnuevo") + "/",
        // url: dominio + "empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
                cargosCombo();
            }
            if (url === "/pages/trabajadores.html") {
                empSelectCargos();
                cargosCombo();
            }
        }
    });
    reset();
}
function cargosCombo() {
    $.ajax({
        type: "GET",
        url: dominio + "cargos/select2/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                // console.log("el combo box id es:" + valor["idCargo"]);
                // console.log(valor["idCargo"].value);
                // if (document.getElementById("AgregarEmpleadoBtn").value == 1) {
                //     var template = '<option value="' + valor["idCargo"] + '">' + '&Nombre del cargoc:&nbsp;' + valor["nombreCargo"];
                //     template += '</option>';
                //     tabla += template;
                // } else {
                var template = '<option value="' + valor["idCargo"] + '">' + valor["nombreCargo"];
                template += '</option>';
                tabla += template;
                // }
            });
            $('#contenidoCargosList').html(tabla);
            $('#contenidoCargosList2').html(tabla);
            $('#contenidoCargosList3').html(tabla);
            $('#contenidoCargosList4').html(tabla);
            $('#contenidoCargosList5').html(tabla);
        }
    });
}
function cargosSelect() {
    $.ajax({
        type: "GET",
        url: dominio + "cargos/select/",
        // url: dominio+ "cargos/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                if (valor["idCargo"] == 1) {
                    var template = '<tr>';
                    template += '<td>' + valor["idCargo"] + '</td>';
                    template += '<td>' + valor["nombreCargo"] + '</td>';
                    // template += '<td>' + valor["estado"] + '</td>';
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
                    // template += '<td>' + valor["estado"] + '</td>';
                    template += '<td class="grupoBotones">';
                    template += '<div class="btn-group">';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal2X" onclick=cargoGet(' + valor["idCargo"] + ')><i class="gg-info"></i></a>';
                    template += '</button>';
                    template += '<button class="btn">';
                    template += '<a href="#" class="btn btn-danger" onclick="deshabilitar(' + valor["idCargo"] + ')"><i class="gg-unavailable"></i></a>';
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
function empGetCargos(id) {
    $('#myModal3X').modal('hide');
    $.ajax({
        type: "GET",
        url: dominio + "empleadosXcargo/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#tituloModalCargoDes').html("<br>''" + data["resultado"]["nombreEmpleado"] + "''");
            $('#miidnuevo').val(data["resultado"]["idEmpleado"]);
            $('#valorActualizar').val(data["resultado"]["idCargo"]);
            $('#micargonuevo').val(data["resultado"]["idCargo"]);
            $('#tituloModalCargoDes').val(data["resultado"]["nombreEmpleado"]);
            $('#micargonuevo').html("<br>''" + data["resultado"]["idCargo"] + "''");
        }
    });
    // formulario2.reset();
    reset();
}
function cargoGet(id) {
    $.ajax({
        type: "GET",
        url: dominio + "cargos/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidCargoModal2x').val(data["resultado"]["idCargo2"]);
            $('#txtnombreCargo2').val(data["resultado"]["nombreCargo2"]);
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
        url: dominio + "cargos/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/trabajadores.html";
            cargosSelect();
            cargosCombo();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    // formulario.reset();
    reset();
}
function cerrarModal() {
    $('#myModal3').modal('hide');
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
        url: dominio + "cargos/update/" + registrosEmpl.get("txtidCargoModal2x") + "/",
        // url: dominio+ "cargos/update/" + registrosEmpl.get("txtidCargo2") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                cargosCombo();
                cargosSelect();
            }
        }
    });
    // limpiar contraseña
    // formulario3.reset();
    reset();
}
function reset() {
    $("#myModal2").find("input,textarea,select").val("");
    $("#myModal2 input[type='checkbox']").prop('checked', false).change();
    $("#myModal1X").find("input,textarea,select").val("");
    $("#myModal1X input[type='checkbox']").prop('checked', false).change();
    $("#myModal2X").find("input,textarea,select").val("");
    $("#myModal2X input[type='checkbox']").prop('checked', false).change();
    $("#myModal3X").find("input,textarea,select").val("");
    $("#myModal3X input[type='checkbox']").prop('checked', false).change();
    $("#myModal4X").find("input,textarea,select").val("");
    $("#myModal4X input[type='checkbox']").prop('checked', false).change();
}
function deshabilitar(id) {
    const url = window.location.pathname;
    $.ajax({
        type: "PUT",
        url: dominio + "cargos/update2/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                cargosSelect();
                // console.log(data.resultado);
                if (data.resultado.length > 0) {
                    var tabla = '';
                    $('#myModal1X').modal('hide');
                    $('#myModal3X').modal('show');
                    $.each(data["resultado"], function (llave, valor) {
                        if (valor["idCargo"] == 1) {
                            var template = '<tr style="vertical-align: middle !important;">';
                            template += '<td>' + valor["idEmpleado"] + '</td>';
                            template += '<td>' + valor["nombreEmpleado"] + '</td>';
                            template += '<td>' + valor["correoEmpleado"] + '</td>';
                            // template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                            // template += '<td>' + valor["estado"] + '</td>';
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
                            var template = '<tr style="vertical-align: middle !important;">';
                            template += '<td>' + valor["idEmpleado"] + '</td>';
                            template += '<td>' + valor["nombreEmpleado"] + '</td>';
                            template += '<td>' + valor["correoEmpleado"] + '</td>';
                            // template += '<td>' + valor["encuestasRealizadas"] + '</td>';
                            // template += '<td>' + valor["estado"] + '</td>';
                            template += '<td>' + valor["idCargo"] + '</td>';
                            template += '<td class="grupoBotones">';
                            template += '<div class="btn-group">';
                            template += '<button class="btn">';
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
                    $('#modal3x').html("<br>''" + data["cargo"] + "''");
                }
                else {
                    console.log("vacio");
                }
            }
        }
    });
}
function ocultar() {
    $('#myModal3X').modal('hide');
    $('#myModal1X').modal('show');
}
function ocultar2() {
    $('#myModal4X').modal('hide');
    $('#myModal1X').modal('show');
}
function ocultar3() {
    $('#myModal4X').modal('hide');
    $('#myModal3X').modal('show');
}
function ocultar4() {
    $('#myModal4X').modal('hide');
    $('#myModal3X').modal('hide');
    $('#myModal1X').modal('show');
}