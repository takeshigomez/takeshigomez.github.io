let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}
let email = document.getElementById("email")
email = sessionStorage.getItem("user");

const container = document.getElementById("perfil")
container.innerHTML += logueado

 ///////////////////// MENU DESPLEGABLE //////////////////////
 const botonDropdown = document.getElementById("perfil");
 const menuDropdown = document.getElementById("divDropdown");


     /// FUNCIÓN PARA DESPLEGAR
 const toggleDropdown = function () {
   menuDropdown.classList.toggle("show"); // toggle modifica la clase
};

botonDropdown.addEventListener("click", function (e) {
 e.stopPropagation();
toggleDropdown();
});