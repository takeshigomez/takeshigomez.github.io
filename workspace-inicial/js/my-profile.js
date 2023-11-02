// Verificar si el usuario está logueado
let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href = "./login.html";
}

// Obtener el elemento de correo electrónico y completarlo
let emailField = document.getElementById("email");
if (emailField) {
    emailField.value = logueado;
}

// Resto de tu código para el menú desplegable y otras funcionalidades
const botonDropdown = document.getElementById("perfil");
const menuDropdown = document.getElementById("divDropdown");

// FUNCIÓN PARA DESPLEGAR
const toggleDropdown = function () {
  menuDropdown.classList.toggle("show"); // toggle modifica la clase
};

botonDropdown.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});