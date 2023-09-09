let producto = localStorage.getItem("prodID");
const ARTICULO_URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
const container = document.getElementById("cargaProductos");

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
async function imprimirArticulo() {
    artitculos = await getJsonData(ARTICULO_URL);
    const products = artitculos.products
    products.forEach(articulo => {
        container.innerHTML += `<div id="productos" onclick="setProdID(${articulo.id})"> <div><ul><h1>${articulo.name}</h1>   <p>${articulo.description}</p> <p>${articulo.currency} ${articulo.cost}</p> <p>${articulo.soldCount}</p></ul></div> <img src="${articulo.image}"></div>`
    });
}
imprimirArticulo();

