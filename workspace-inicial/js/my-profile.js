let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

const container = document.getElementById("perfil")
container.innerHTML += logueado