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
document.getElementById("archivo").addEventListener("change", function() {
  const imagenPerfil = document.getElementById("imagenPerfil");
  const fileInput = this; // "this" se refiere al input de archivo

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function(e) {
      // Establecer el atributo src de la imagen con la URL de la imagen cargada
      imagenPerfil.src = e.target.result;
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
});

botonDropdown.addEventListener("click", function (e) {
  e.stopPropagation();
  toggleDropdown();
});