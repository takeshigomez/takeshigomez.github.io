
let categoria = localStorage.getItem("catID")
const DATA_URL = PRODUCTS_URL + categoria + EXT_TYPE;



const container = document.getElementById("a")
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



async function imprimirProductos() {
    const autos = await getJsonData(DATA_URL);
    const products = autos.products
    products.forEach(auto => {
        container.innerHTML += `<div id="productos"> <div><ul><h1> MODELO: ${auto.name}</h1>   <p> ${auto.description}</p> <p>  Costo: ${auto.currency} ${auto.cost}</p> <p>Vendidos: ${auto.soldCount}</p></ul></div> <img src="${auto.image}"></div>`
    });

}
imprimirProductos();
