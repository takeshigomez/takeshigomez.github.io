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
            // Maneja el error de la solicitud
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
                <div>
                <ul id ="articuloComentarios">
                    <li><p id="user">${data[i].user}</p></li>
                    <li><p id="stars">${estrellas}</p></li>
                    <li><p>${data[i].dateTime}</p></li>
                    <li><p>${data[i].description}</p></li>
                </ul>
            </div>`
                }
                            
        })
        .catch(error => {
            console.error('Error al obtener la información del producto:', error);
            // Maneja el error de la solicitud
        });
} else {
    // Maneja el caso en el que no se haya seleccionado ningún producto.
    document.write('Ningún producto seleccionado.');
}


let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

const container = document.getElementById("perfil")
container.innerHTML += logueado