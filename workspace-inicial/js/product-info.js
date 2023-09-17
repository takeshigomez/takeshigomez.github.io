let producto = localStorage.getItem("prodID");


        
if (producto) {
    // Construye la URL de la API con el identificador del producto
    const ARTICULO_URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
    // Realiza una solicitud GET a la API
    fetch(ARTICULO_URL)
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la API y muestra la información del producto
            const container = document.getElementById("cargaProductos");
            container.innerHTML = `
                <div>
                <ul>
                <br><li><h1>${data.name}</h1></li><hr>
                    <li><p>${data.description}</p></li>
                    <li><p>${data.currency} ${data.cost}</p></li>
                    <li><p>Vendidos: ${data.soldCount}</p></li>
                </ul>
            </div>`;
            for (let i = 0; i < data.images.length; i++) {
                const element = data.images;
                container.innerHTML += `<div id="articulos"> <img src= "${element[i]}"> </div>`
                
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

function rating(score, maxScore = 5){
    const estrellasVacias = maxScore - score;
    const estrellas = '★'.repeat(score);
    const sinEstrellas = '☆'.repeat(estrellasVacias);
    return estrellas + sinEstrellas;
}

    // Realiza una solicitud GET a la API
    fetch(COMENTARIO_URL)
        .then(response => response.json())
        .then(data => { 
            // Maneja la respuesta de la API y muestra la información del producto
            const container = document.getElementById("comentariosProductos");
           
            for (let i = 0; i < data.length; i++) {
                const estrellas = rating(data[i].score);
                container.innerHTML += `
                <div id ="articuloComentarios"> 
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

function mostrarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const container = document.getElementById("comentarios-agregados");
    container.innerHTML = "";

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

const commentForm = document.getElementById("comment-form");
const localStorageKey = "comentarios"; 
const estrellaSelect = document.querySelector("select[name='estrella']");

commentForm.addEventListener("submit", function (e) {
  e.preventDefault();

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

  comentarios.push(nuevoComentario);

  localStorage.setItem(localStorageKey, JSON.stringify(comentarios));
  commentForm.reset();
  mostrarComentarios(); // Llamar a mostrarComentarios después de agregar el nuevo comentario
});

// Elimina la llamada inicial a mostrarComentarios() aquí