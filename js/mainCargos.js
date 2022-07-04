const dominio = "https://f3rn4nd021py.pythonanywhere.com/";
// const d ominio = "http://127.0.0.1:5000/";
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    console.log("la url es:", url);
    const boton = document.getElementById('btnEnviarCI');
    boton.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            console.log("actualizando el cargo");
            cargoUpdate(); cargosCombo();
            $('#myModal2X').modal('hide');
            $('#myModal3X').modal('show');
        }
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            console.log("la url dentro del pages es:", url);
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
    const boton1 = document.getElementById('btnEnviarE2');
    boton1.addEventListener('click', (e) => {
        e.preventDefault();
        const id = document.getElementById("valorActualizar").value;
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            // alert("estamos en trabajadores");
            ocultar2();
            // $('#myModal4X').modal('show');
            // console.log("valor de contenido inicial: " + contenido)
            CargoUpdateEmp();
            // Recargardeshabilitar(id);
            // Recargardeshabilitar(contenido);
            // deshabilitar(contenido);
            // aqui va el actulizar la lista de modal3x
            // console.log("valor de contenido inicial: " + contenido)
            // console.log("valor de contenido final: " + contenido)
            console.log("final de valorActualizar: " + contenido)
        }
    });
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        empSelect();
    }
});
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
        // url: dominio+ "empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
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
                empSelect();
                cargosCombo();
            }
            // crearMensaje(data["mensaje"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function cargosCombo() {
    $.ajax({
        type: "GET",
        url: dominio + "cargos/select/",
        // url: dominio+ "cargos/select/",
        dataType: "json",
        success: function (data) {
            var tabla = '';
            $.each(data["resultado"], function (llave, valor) {
                if (document.getElementById("AgregarEmpleadoBtn").value == 1) {
                    var template = '<option value="' + valor["idCargo"] + '">' + valor["idCargo"] + '&nbsp;:&nbsp;' + valor["nombreCargo"];
                    template += '</option>';
                    // template += '<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal4X" onclick=cargoGet(' + valor["idCargo"] + ')></a>';
                    // template += '<option>' + valor["idCargo"] + '</option></div>';
                    tabla += template;
                } else {
                    // console.log("el cargo es: " + valor["idCargo"]);
                    // var template = '<option value="' + valor["idCargo"] + '">' + valor["idCargo"];
                    var template = '<option value="' + valor["idCargo"] + '">' + valor["idCargo"] + '&nbsp;:&nbsp;' + valor["nombreCargo"];
                    template += '</option>';
                    // template +='<a href="#" class="btn btn-warning" data-toggle="modal" data-target="#myModal4X" onclick=cargoGet(' + valor["idCargo"] + ')></a>';
                    tabla += template;
                }
            });
            // tercer paso
            $('#contenidoCargosList').html(tabla);
            $('#contenidoCargosList2').html(tabla);
            $('#contenidoCargosList3').html(tabla);
            $('#contenidoCargosList4').html(tabla);
            $('#contenidoCargosList5').html(tabla);
            // var cod = document.getElementById("micargonuevo").value;
            // var cod = document.getElementById("contenido Cargos List").value;
            // console.log("codigo es:" + cod);
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
    // sexto paso
    // console.log("id dentro de empGetCargos: " + id);
    $('#myModal3X').modal('hide');
    $.ajax({
        type: "GET",
        url: dominio + "empleadosXcargo/get/" + id + "/",
        // url: dominio+ "empleados/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#tituloModalCargoDes').html("<br>''" + data["resultado"]["nombreEmpleado"] + "''");
            $('#miidnuevo').val(data["resultado"]["idEmpleado"]);
            // utilizamos valorActualizar para poder "actualizar el modal 3x"
            $('#valorActualizar').val(data["resultado"]["idCargo"]);
            $('#micargonuevo').val(data["resultado"]["idCargo"]);
            $('#tituloModalCargoDes').val(data["resultado"]["nombreEmpleado"]);
            $('#micargonuevo').html("<br>''" + data["resultado"]["idCargo"] + "''");
        }
    });
    // formulario2.reset();
}
function cargoGet(id) {
    console.log("el id es:", id);
    $.ajax({
        type: "GET",
        url: dominio + "cargos/get/" + id + "/",
        // url: dominio+ "cargos/get/" + id + "/",
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
        // url: dominio+ "cargos/create/",
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
    formulario.reset();
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
            // crearMensaje(data["mensaje"]);
            // crearMensaje(data["exito"]);
        }
    });
    // limpiar contraseña
    formulario3.reset();
}
function deshabilitar(id) {
    const url = window.location.pathname;
    console.log("id es deshabilitar (): " + id);
    $.ajax({
        type: "PUT",
        url: dominio + "cargos/update2/" + id + "/",
        // url: dominio+ "cargos/update2/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                cargosSelect();
                // console.log("tamaño data: " + data.resultado.length);
                if (data.resultado.length > 0) {
                    var tabla = '';
                    console.log("hay gente");
                    $('#myModal1X').modal('hide');
                    $('#myModal3X').modal('show');
                    $.each(data["resultado"], function (llave, valor) {
                        console.log("el idcargo de update 2 es:" + valor["idCargo"]);
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
                    // $('#myModal3X').modal('show');
                    $('#modal3x').html("<br>''" + data["cargo"] + "''");
                }
                else {
                    console.log("vacio");
                }
            }
            // crearMensaje(data["resultado"]);
        }
    });
}
function Recargardeshabilitar(id) {
    console.log("el id de Recargar deshabilitar es: " + id);
    const url = window.location.pathname;
    $.ajax({
        type: "PUT",
        url: dominio + "EmpleadosXcargo/select/" + id + "/",
        // url: dominio+ "cargos/update2/" + id + "/",
        dataType: "json",
        success: function (data) {
            console.log("el id de Recargar deshabilitar es: " + id);
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                // cargosSelect();
                // console.log("la data es:" + data.length);
                // console.log(data["resultado"]);
                // console.log("tamaño data: " + data.resultado.length);
                // if (data.resultado.length > 0) {
                var tabla = '';
                // $('#myModal1X').modal('hide');
                $('#myModal3X').modal('show');
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
                        // $('#myModal3X').modal('hide');
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
                // $('#contenido5').html(tabla);
                $('#contenido4').html(tabla);
                // $('#modal3x').html("<br>''" + data["cargo"] + "''");
            }
        }
    });
}
function ocultar() {
    $('#myModal3X').modal('hide');
    $('#myModal1X').modal('show');
}
function ocultar3() {
    $('#myModal4X').modal('hide');
    $('#myModal3X').modal('show');
}
function ocultar2() {
    $('#myModal4X').modal('hide');
    $('#myModal1X').modal('show');
}
function ocultar4() {
    $('#myModal4X').modal('hide');
    $('#myModal3X').modal('hide');
    $('#myModal1X').modal('show');
}