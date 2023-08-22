document.addEventListener("DOMContentLoaded", function(){
    //ACA CORROBORAMOS SI HAY ALGUN USUARIO LOGUEADO
    let logueado = sessionStorage.getItem("user");
    if (logueado == null) {
        location.href= "./login.html";
    }
    //
    const container = document.getElementById("perfil")
    container.innerHTML += logueado


    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});