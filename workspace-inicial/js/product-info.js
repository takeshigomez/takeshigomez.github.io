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

    function rating(score, maxScore = 5) {
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
            container.innerHTML += `<hr><h4>Comentarios</h4>`
            for (let i = 0; i < data.length; i++) {
                const estrellas = rating(data[i].score);
                container.innerHTML += `
    
                <div class ="articuloComentarios">
                <p class ="user">${data[i].user}</p> <p>-</p>
                <p>${data[i].dateTime}</p><p>-</p>
                <p class="stars">${estrellas}</p> 
                <div class="descripcion">
                    <p>${data[i].description}</p>
                </div>
                
                
            </div>`
            }

        })
        .catch(error => {
            console.error('Error al obtener la información del producto:', error);
            // Maneja el error de la solicitud
        });
} else {
    document.write('No selecciono ningun producto.');
}


let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href = "./login.html";
}

const container = document.getElementById("perfil")
container.innerHTML += logueado

////////////////AGREGANDO COMENTARIOS/////////////////
//FALTA ARREGLAR EL DISEÑO, Y QUE APAREZCA SOLO EN EL LOCALSTORAGE DEL ID.


// Función para mostrar los comentarios en el contenedor
function mostrarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    const container = document.getElementById("comentariosProductos");
    const container2 = document.getElementsByClassName("articuloComentarios");
    container.innerHTML = "";

    comentarios.forEach((comentario, index) => {
        const comentarioElement = document.createElement("div");
        comentarioElement.className = "articuloComentarios";
        comentarioElement.innerHTML = `
        <p class="user">${comentario.usuario}</p> <p>-</p>
        <p>${comentario.dateTime}</p><p>-</p>
        <p class="stars">${comentario.puntuacion}</p> 
        <div class="descripcion">
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
    mostrarComentarios();
});
mostrarComentarios();