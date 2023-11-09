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

// Función que carga los datos del perfil desde el LOCAL STORAGE
function cargarPerfilDesdeLocalStorage() {
    const perfilGuardado = localStorage.getItem("perfilUsuario");
    if (perfilGuardado) {
        const perfilUsuario = JSON.parse(perfilGuardado);

        document.getElementById("nombre").value = perfilUsuario.nombre;
        document.getElementById("segundoNombre").value = perfilUsuario.segundoNombre;
        document.getElementById("apellido").value = perfilUsuario.apellido;
        document.getElementById("segundoApellido").value = perfilUsuario.segundoApellido;
        document.getElementById("email").value = perfilUsuario.email;
        document.getElementById("telefonoContacto").value = perfilUsuario.telefonoContacto;

        document.getElementById("imagenPerfil").src = perfilUsuario.imagenPerfil;

    }
}

// Cargar los datos del perfil al cargar la página
cargarPerfilDesdeLocalStorage();

// Función de validación y guardado de datos
function validarYGuardar() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("nombre").value;
    let segundoNombre = document.getElementById("segundoNombre").value;
    let apellido = document.getElementById("apellido").value;
    let segundoApellido = document.getElementById("segundoApellido").value;
    let email = document.getElementById("email").value;
    let telefonoContacto = document.getElementById("telefonoContacto").value;
    let imagenPerfil = document.getElementById("imagenPerfil").src;

    // Validar que los campos obligatorios (*) estén completos
    if (nombre.trim() === "" || apellido.trim() === "") {
        alert("Nombre y Apellido son campos obligatorios.");
        return;
    }

   
    if (email.trim() === "" || !validarEmail(email)) {
        alert("Correo electrónico inválido.");
        return;
    }


    // Si todos los campos obligatorios están completos y el correo electrónico es válido, guardar los datos en el almacenamiento local
    let perfilUsuario = {
        nombre: nombre,
        segundoNombre: segundoNombre,
        apellido: apellido,
        segundoApellido: segundoApellido,
        email: email,
        imagenPerfil: imagenPerfil,
        telefonoContacto: telefonoContacto,
    };

    //GUARDAMOS LOS DATOS DEL PERFIL EN UN JSON
    localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));
    alert("Los datos se han guardado correctamente.");
}

// Función para validar el formato de correo electrónico
function validarEmail(email) {
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}
//GUARDAMOS LOS DATOS
document.querySelector(".btn-primary").addEventListener("click", validarYGuardar);

//CREAMOS EL EVENTO PARA APLICAR LA FOTO SUBIDA AL IMG DEL HTML
document.getElementById("archivo").addEventListener("change", function() {
    const imagenPerfil = document.getElementById("imagenPerfil");
    const fileInput = this; 
    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imagenPerfil.src = e.target.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
  });