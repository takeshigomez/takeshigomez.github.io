document.addEventListener("DOMContentLoaded", function(){
    //ACA CORROBORAMOS SI HAY ALGUN USUARIO LOGUEADO
    let logueado = sessionStorage.getItem("user");
    if (logueado == null) {
        location.href= "./login.html";
    }
    //NOMBRE DE USUARIO EN LA BARRA DE NAVEGACION
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

/////////////////MODO OSCURO/MODO CLARO//////////////////////
// Funcionalidad Modo oscuro y Modo claro
const temaOscuro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "dark");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-sun-fill");
}
const temaClaro = () => {
    document.querySelector("body").setAttribute("data-bs-theme", "light");
    document.querySelector("#dl-icon").setAttribute("class", "bi bi-moon");
}
const cambiarTema = () => {
    document.querySelector("body").getAttribute("data-bs-theme") === "light"?
    temaOscuro() : temaClaro(); }


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
