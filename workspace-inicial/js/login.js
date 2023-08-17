document.addEventListener("DOMContentLoaded", function(){
    const loginForm = document.getElementById("loginForm");
   
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
      
      let nombre = document.getElementById("username").value;
     if(nombre != "")
     {
     sessionStorage.setItem("user",nombre);
     
     location.href = "./index.html";
     }
     else
     {
      alert("INGRESE EL NOMBRE DE USUARIO ");
     }
     })
        // Almacenar el nombre en sessionStorage para usarlo en home.js/ check
        // Redirigir a la página principal / check
    });