
function menuResponsive() {
    let a = document.getElementById("btnMenu")
      , b = document.getElementById("sidenav");
    a.addEventListener("click", a=>{
        b.classList.toggle("responsive")
    }
    )
}
function filtroTablaTrabajadores() {
    $(document).ready(function() {
        $("#inputTrabajador").on("keyup", function() {
            var a = $(this).val().toLowerCase();
            $("#contenido2 tr").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(a) > -1)
            })
        })
    })
}
window.addEventListener("load", a=>{
    menuResponsive(),
    filtroTablaTrabajadores()
}
)
// function menuResponsive() {
//     let a = document.getElementById("btnMenu");
//     let b = document.getElementById("sidenav");
//     a.addEventListener("click", a => {
//         b.classList.toggle("responsive")
//     }
//     )
// }
// function filtroTablaTrabajadores() {
//     $(document).ready(function () {
//         $("#inputTrabajador").on("keyup", function () {
//             var a = $(this).val().toLowerCase();
//             $("#contenido2 tr").filter(function () {
//                 $(this).toggle($(this).text().toLowerCase().indexOf(a) > -1)
//             })
//         })
//     })
// }
// window.addEventListener("load", a => {
//     // menuResponsive(),
//         filtroTablaTrabajadores();
// }
// )
