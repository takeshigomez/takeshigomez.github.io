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
                    <li><h1>${data.name}</h1></li>
                    <li><p>${data.description}</p></li>
                    <li><p>${data.currency} ${producto.cost}</p></li>
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
    // Realiza una solicitud GET a la API
    fetch(COMENTARIO_URL)
        .then(response => response.json())
        .then(data => {
            // Maneja la respuesta de la API y muestra la información del producto
            const container = document.getElementById("comentariosProductos");
            container.innerHTML += `<h1>COMENTARIO</h1>`
            for (let i = 0; i < data.length; i++) {
                container.innerHTML += `
                <div>
                <ul id ="articuloComentarios">
                    <li><p>${data[i].user}</p></li>
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