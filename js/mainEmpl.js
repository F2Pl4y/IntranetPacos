const dominio2 = "https://f3rn4nd021py.pythonanywhere.com/";
// const dominio2 = "http://127.0.0.1:5000/";

function cargosCombo2() {
    $.ajax({
        type: "GET",
        url: dominio2 + "cargos/select/",
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
        }
    });
}
function empSelect() {
    $.ajax({
        type: "GET",
        url: dominio2 + "empleados/select/",
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
                // template += '<td>' + valor["idCargo"] + '</td>';
                template += '<td>' + valor["nombreCargo"] + '</td>';
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
function AdminSelect() {
    $.ajax({
        type: "GET",
        url: dominio2 + "admins/select/",
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
                // template += '<td>' + valor["idCargo"] + '</td>';
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

function empGet(id) {
    $.ajax({
        type: "GET",
        url: dominio2 + "empleados/get/" + id + "/",
        dataType: "json",
        success: function (data) {
            $('#txtidEmpleado').val(data["resultado"]["idEmpleado"]);
            $('#txtnombreEmpleado').val(data["resultado"]["nombreEmpleado"]);
            $('#txtcorreoEmpleado').val(data["resultado"]["correoEmpleado"]);
            // $('#txtencuestasRealizadas').val(data["resultado"]["encuestasRealizadas"]);
            // $('#txtestado').val(data["resultado"]["estado"]);
            $('#contenidoCargosList3').val(data["resultado"]["idCargo"]);
            // $('#txtidCargo').val(data["resultado"]["idCargo"]);
            // $('#tituloModal').html("Actualizando datos del empleado: <br>" + data["resultado"]["nombreEmpleado"]);
            $('#tituloModal').html("<br>''" + data["resultado"]["nombreEmpleado"] + "''");
        }
    });
    document.getElementById("formulario2").reset();
}

function empEliminar(id) {
    const url = window.location.pathname;
    const logIncorrecto = document.getElementById('DeleteIncorrecto');
    $.ajax({
        type: "DELETE",
        url: dominio2 + "empleados/delete/" + id + "/",
        dataType: "json",
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html") {
                if ($('#myModal3X').is(':visible') == true) {
                    ocultar4();
                }
                empSelect();
            }
            if (data["exito"] === false) {
                // myModalValidarDelete.modal('show');
                $('#myModalValidarDelete').modal('show');
                logIncorrecto.textContent = data["resultado"];
            }
            // else {
            //     logIncorrecto.textContent = data["resultado"]
            // }
        }
    });
    return false;
}
function empInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado2').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado2').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado2').val());
    // registrosEmpl.append("txtencuestasRealizadas2", $('#txtencuestasRealizadas2').val());
    // registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    registrosEmpl.append("txtidCargo2", $('#contenidoCargosList2').val());
    $.ajax({
        type: "POST",
        url: dominio2 + "empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/trabajadores.html";
            empSelect();
        }
    });
    // este "formulario" es un id, con la funcion reset limpiamos todo el formulario
    document.getElementById("formulario").reset();
}
function AdminInsert() {
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtnombreEmpleado2", $('#txtnombreEmpleado2').val());
    registrosEmpl.append("txtcorreoEmpleado2", $('#txtcorreoEmpleado2').val());
    registrosEmpl.append("txtpasswordEmpleado2", $('#txtpasswordEmpleado2').val());
    // registrosEmpl.append("txtencuestasRealizadas2", $('#txtencuestasRealizadas2').val());
    registrosEmpl.append("txtidCargo2", $('#contenidoCargosList').val());
    // registrosEmpl.append("txtidCargo2", $('#txtidCargo2').val());
    $.ajax({
        type: "POST",
        url: dominio2 + "empleados/create/",
        // url: dominio2+ "empleados/create/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        // con processData evitamos que datos enviados se conviertan en tipo texto en lugar json
        processData: false,
        success: function (data) {
            // window.location.href = "/pages/cuentasadmin.html";
            AdminSelect();
        }
    });
    document.getElementById("formulario").reset();
}

function empleadoUpdate() {
    const url = window.location.pathname;
    var registrosEmpl = new FormData();
    registrosEmpl.append("txtidEmpleado", $('#txtidEmpleado').val());
    registrosEmpl.append("txtnombreEmpleado", $('#txtnombreEmpleado').val());
    registrosEmpl.append("txtcorreoEmpleado", $('#txtcorreoEmpleado').val());
    registrosEmpl.append("txtpasswordEmpleado", $('#txtpasswordEmpleado').val());
    registrosEmpl.append("txtidCargo", $('#contenidoCargosList3').val());
    registrosEmpl.append("txtidCargo", $('#txtidCargo').val());
    registrosEmpl.append("txtContraseñaAdmin", $('#txtContraseñaAdmin').val());

    // registrosEmpl.append("txtencuestasRealizadas", $('#txtencuestasRealizadas').val());
    $.ajax({
        type: "PUT",
        url: dominio2 + "empleados/update/" + registrosEmpl.get("txtidEmpleado") + "/",
        data: registrosEmpl,
        dataType: 'json',
        contentType: false,
        enctype: 'multipart/form-data',
        processData: false,
        success: function (data) {
            if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
                modalDatosLogin();
                AdminSelect();
            }
            if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
                modalDatosLogin();
                empSelect();
            }
            // crearMensaje(data["mensaje"]);
        }
    });
    // limpiar contraseña
    $('#txtContraseñaAdmin').val('');
}
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const boton1 = document.getElementById('btnEnviarE');
    // cargosCombo2();
    boton1.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            empleadoUpdate();
        }
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            empleadoUpdate();
        }
    });

    if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
        AdminSelect();
    }
    if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
        empSelect();
    }
});
window.addEventListener('load', (e) => {
    const url = window.location.pathname;
    const boton2 = document.getElementById('btnEnviarI');
    boton2.addEventListener('click', (e) => {
        e.preventDefault();
        if (url === "/pages/cuentasadmin.html" || url === "/pages/cuentasadmin") {
            AdminInsert();
        }
        if (url === "/pages/trabajadores.html" || url === "/pages/trabajadores") {
            empInsert();
        }
    });
});