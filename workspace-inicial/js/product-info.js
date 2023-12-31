let producto = localStorage.getItem("prodID");
let prodObj = null;
//TRAEMOS EL ID DEL PRODUCTO SELECCIONADO
        //TRAEMOS LA API CON EL PRODUCTO CORRESPONDIENTE AL ID
if (producto) {
    // Construye la URL de la API con el identificador del producto
    const ARTICULO_URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
    // Realiza una solicitud GET a la API
    fetch(ARTICULO_URL)
        .then(response => response.json())
        .then(data => {
            prodObj = data;
            // Maneja la respuesta de la API y muestra la información del producto
            //CREAMOS EL DIV PARA AGREGAR TODOS LOS DATOS DEL PRODCUTO
            const container = document.getElementById("cargaProductos");
            container.innerHTML = `
                <div>
                   
                <ul> 
                        <li><h1>${data.name}</h1></li><hr>
                        <li><p>${data.description}</p></li>
                        <li><p>${data.currency} ${data.cost}</p></li>
                        <li><p>Vendidos: ${data.soldCount}</p></li>
                    </ul>
                </div>`;
            for (let i = 0; i < data.images.length; i++) {
                const element = data.images;
                container.innerHTML += `<div  id="articulos" img-fluid> <img src= "${element[i]}"> </div>`
                
            }

        })
        .catch(error => {
            console.error('Error al obtener la información del producto:', error);

        });
} else {
    // Maneja el caso en el que no se haya seleccionado ningún producto.
    document.write('Ningún producto seleccionado.');
}
/////////////////////////////////////////////////////////////////////////////////////
if (producto) {
    // Construye la URL de la API con el identificador del producto
    const COMENTARIO_URL = PRODUCT_INFO_COMMENTS_URL + producto + EXT_TYPE;

    //Código para estrellas
//En esta funcion Nos encargamos de las estrellas aparecen en los comentarios que ya trae la info del producto
function rating(score, maxScore = 5){ 
    const estrellasVacias = maxScore - score;
    const estrellas = '★'.repeat(score);
    const sinEstrellas = '☆'.repeat(estrellasVacias);
    return estrellas + sinEstrellas; // retorna la sumatoria de las estrella vacias y completas para la puntuacion del comentario
}

    // Realiza una solicitud GET a la API
    fetch(COMENTARIO_URL)
        .then(response => response.json())
        .then(data => { 
            // Maneja la respuesta de la API y muestra la información del producto
            const container = document.getElementById("comentariosProductos");
           // creamos un for para agragr el comentario completo, con todos los datos del array que corresponde al producto especifco
            for (let i = 0; i < data.length; i++) {
                const estrellas = rating(data[i].score);
                container.innerHTML += `
                <div class="container" id="articuloComentarios">
                 
                <p id ="user">${data[i].user}</p> <p>-</p>
                <p>${data[i].dateTime}</p><p>-</p>
                <p id="stars">${estrellas}</p> 
                <div id="descripcion">
                    <p>${data[i].description}</p>
                </div>
            </div>`
                }

        })
        .catch(error => {
            console.error('Error al obtener la información del producto:', error);
            // Maneja el error de la solicitud
        });
}else {
    document.write('No selecciono ningun producto.');
}


let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

const container = document.getElementById("perfil")
container.innerHTML += logueado

////////////////AGREGANDO COMENTARIOS/////////////////
// CREAMOS UNA FUNCION PARA MOSTRAR LOS COMENTARIOS QUE VAYAMOS AGREGANDO CON EL HTML AGREGADO EN PRODUCT-INFO
function mostrarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem(localStorageKey)) || [];
//CREAMOS UNA CONSTANTE PARA EL JSON DEL LOCALSTORAGE QUE CREAMOS Y PODER GUARDAR LOS COMENTARIOS AGREGADOS AHI
    const container = document.getElementById("comentarios-agregados");
    container.innerHTML = "";
//EN ESTE FOREACH VAMOS A ITERAR TODA LA INFORMACION DE CADA COMENTARIO AGREGADO
    comentarios.forEach((comentario, index) => {
      const comentarioElement = document.createElement("div");
      comentarioElement.id = "articuloComentarios";
      comentarioElement.innerHTML = `
        <p id="user">${comentario.usuario}</p> <p>-</p>
        <p>${comentario.dateTime}</p><p>-</p>
        <p id="stars">${comentario.puntuacion}</p> 
        <div id="descripcion">
          <p>${comentario.comentario}</p>
        </div>
      `;
      container.appendChild(comentarioElement);
    });
}
//CONSTANTES PARA ASIGNAR ESTRELLAS AL COMENTARIO NUEVO
const commentForm = document.getElementById("comment-form");
const localStorageKey = "comentarios"; 
const estrellaSelect = document.querySelector("select[name='estrella']");

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();
//creamos este evento submit para a la hora de enviar  se agrega un objeto nuevo con todos los datos del comentario nuevo
  const comentario = document.getElementById("comment").value;
  const usuario = logueado; 
  const puntuacion = estrellaSelect.value;

  const nuevoComentario = {
    usuario: usuario,
    puntuacion: puntuacion,
    comentario: comentario,
    dateTime: new Date().toLocaleString()
  };

  let comentarios = JSON.parse(localStorage.getItem(localStorageKey)) || [];
// LO PUSHEAMOS AL NUEVO COMENTARIO AL ARRAY DE COMENTARIOS DEL LOCALSTORAGE QUE TRAJIMOS CON LOS OTROS COMENTARIOS Y SUMAMOS
  comentarios.push(nuevoComentario);

  localStorage.setItem(localStorageKey, JSON.stringify(comentarios));
  commentForm.reset();
  mostrarComentarios(); // Llamar a mostrarComentarios después de agregar el nuevo comentario
});
// AGREGARMOS TODO ,RESETEAMOS PARA QUE NO SE REPTITA Y MOSTRAMOS TODOS LOS COMENTARIOS CON LOS NUEVOS
// Elimina la llamada inicial a mostrarComentarios() aquí

////////////////////////////////////////////////////////////////////////////////////////////////

//PRODUCTOS RELACIONADOS SOLO CON EL NOMBRE
let categoria = localStorage.getItem("catID");
const DATA_URL = PRODUCTS_URL + categoria + EXT_TYPE;
const container1 = document.getElementById("productosRelacionados");

async function getJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${url}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Ha ocurrido un error: ${error.message}`);
    }
}
/////////////////////////////carousel/////////////////////////////
async function productosRelacionados() {
    try {
        const categoria = localStorage.getItem("catID");
        const DATA_URL = PRODUCTS_URL + categoria + EXT_TYPE;
        
        const contenedorR = document.querySelector(".carousel-inner");

        const response = await fetch(DATA_URL);
        if (!response.ok) {
            throw new Error(`Error fetching data from ${DATA_URL}: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const products = data.products;

        // Mostrar los productos relacionados
        products.forEach(producto => {
            contenedorR.innerHTML += `
            <div class="carousel-item" onclick="setProdID(${producto.id})">
                <img src="${producto.image}"  class="d-block w-100" alt="${producto.name}">
            </div>`;

            ;})

        //Creacion de botones para desplazarse en el slider
        contenedorR.innerHTML += `
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselRelacionados" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselRelacionados" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>`;

    // Clase active para que se muestre la primer imagen
      let primerImg = contenedorR.querySelector("div:first-child");
      primerImg.className = "carousel-item active";

      // Agregar un evento click al producto relacionado
      let img = document.querySelector(".d-block w-100")
      img.addEventListener("click", () => {
        // Redirige al usuario a la página del producto seleccionado
        window.location.href = `product-info.html?id=${producto.id}`;
    })
    } catch (error) {
        console.error('Error al obtener productos relacionados:', error);
    }

}
productosRelacionados();
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}
//////////////////////////////////////////////////////////




/////////////////MODO OSCURO/MODO CLARO//////////////////////
// Verificar si hay una preferencia de tema almacenada en localStorage al cargar la página
window.onload = () => {
    const body = document.querySelector("body");
    const dlIcon = document.querySelector("#dl-icon");

    const temaActual = localStorage.getItem("tema");

    if (temaActual === "dark" || (temaActual === null && body.getAttribute("data-bs-theme") === "dark")) {
        body.setAttribute("data-bs-theme", "dark");
        dlIcon.setAttribute("class", "bi bi-sun-fill");
    } else {

        body.setAttribute("data-bs-theme", "light");
        dlIcon.setAttribute("class", "bi bi-moon");
    }
}
// FUNCION PARA CAMBIAR EL TEMA
const cambiarTema = () => {
    const body = document.querySelector("body");
    const dlIcon = document.querySelector("#dl-icon");
    const temaActual = localStorage.getItem("tema");

    //CONDICION PARA VERIFICAR EL ESTADO ACTUAL DEL TEMA SI ES ASI MANTENER SINO CAMBIARLO(EN EL ELSE)
    if (temaActual === "light" || (temaActual === null && body.getAttribute("data-bs-theme") === "light")) {

        body.setAttribute("data-bs-theme", "dark");
        dlIcon.setAttribute("class", "bi bi-sun-fill");
        localStorage.setItem("tema", "dark");
    } else { 
        body.setAttribute("data-bs-theme", "light");
        dlIcon.setAttribute("class", "bi bi-moon");
        localStorage.setItem("tema", "light");
    }
}
 ///////////////////// MENU DESPLEGABLE //////////////////////
 const botonDropdown = document.getElementById("perfil");
 const menuDropdown = document.getElementById("divDropdown");


     /// FUNCIÓN PARA DESPLEGAR
 const toggleDropdown = function () {
   menuDropdown.classList.toggle("show"); // toggle modifica la clase
};
//EVENTO PARA EL CLICK DEL MENU
botonDropdown.addEventListener("click", function (e) {
 e.stopPropagation();
toggleDropdown();
});


//ENTREGA 5- DESAFIATE
function agregarAlCarrito() {
  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    const productoExistente = carrito.find((item) => item.id === prodObj.id);
  
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push(prodObj);
    }
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Swal.fire('¡Excelente elección!','Producto agregado al carrito', 'success');  
    
  }