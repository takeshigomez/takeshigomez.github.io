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
            container.innerHTML += `<hr><h4>Comentarios</h4>`
            for (let i = 0; i < data.length; i++) {
                const estrellas = rating(data[i].score);
                container.innerHTML += `
                <div id ="articuloComentarios"> 
                <p id="user">${data[i].user}</p> <p>-</p>
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
} else {
    document.write('No selecciono ningun producto.');
}


let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

const container = document.getElementById("perfil")
container.innerHTML += logueado

////////////////AGREGANDO COMENTARIOS/////////////////
let rangovalor = 0;
function Comentario() {
    const stars = document.querySelectorAll(".star");
    stars.forEach(function(star)
    {
        star.addEventListener("click", function (){
            rangovalor = parseInt(star.getAttribute("data-rating"));
            actualizarestrellas();
            document.getElementById("resultado").innerText = "Puntuacion" + rangovalor;
        });
    });
}

    function actualizarestrellas()
    {
        const estrellas = document.querySelectorAll(".star");
        estrellas.forEach(function(star){
            const rango = parseInt(star.getAttribute("data-rating"));
            if(rango <= rangovalor)
            {
                star.classList.add("rated");
            } else {
                star.classList.remove("rated");
            }
        });
    }