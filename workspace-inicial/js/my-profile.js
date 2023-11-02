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

// Función para cargar los datos del perfil desde el almacenamiento local
function cargarPerfilDesdeLocalStorage() {
    const perfilGuardado = localStorage.getItem("perfilUsuario");
    if (perfilGuardado) {
        const perfilUsuario = JSON.parse(perfilGuardado);

        // Llenar los campos con los datos guardados
        document.getElementById("nombre").value = perfilUsuario.nombre;
        document.getElementById("apellido").value = perfilUsuario.apellido;
        document.getElementById("telefonoContacto").value = perfilUsuario.telefonoContacto;

        // Otros campos pueden llenarse de la misma manera
    }
}

// Cargar los datos del perfil al cargar la página
cargarPerfilDesdeLocalStorage();

// Función de validación y guardado de datos
function validarYGuardar() {
    // Obtener los valores de los campos
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefonoContacto = document.getElementById("telefonoContacto").value;

    // Validar que los campos obligatorios (*) estén completos
    if (nombre.trim() === "" || apellido.trim() === "") {
        alert("Nombre y Apellido son campos obligatorios.");
        return; // No se puede guardar si faltan campos obligatorios
    }

    // Validar el formato del correo electrónico (puedes agregar una validación más estricta si es necesario)
    if (email.trim() === "" || !validarEmail(email)) {
        alert("Correo electrónico inválido.");
        return; // No se puede guardar si el correo electrónico es inválido
    }

    // Resto de la validación si es necesario

    // Si todos los campos obligatorios están completos y el correo electrónico es válido, guardar los datos en el almacenamiento local
    let perfilUsuario = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefonoContacto: telefonoContacto,
        // Agregar otros campos si es necesario
    };

    // Convertir el objeto a una cadena JSON y guardar en el almacenamiento local
    localStorage.setItem("perfilUsuario", JSON.stringify(perfilUsuario));

    // Notificar al usuario que los datos se han guardado
    alert("Los datos se han guardado correctamente.");
}

// Función para validar el formato de correo electrónico
function validarEmail(email) {
    // Patrón de validación de correo electrónico simple
    let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(email);
}

// Event listener para el botón "Guardar datos"
document.querySelector(".btn-primary").addEventListener("click", validarYGuardar);

