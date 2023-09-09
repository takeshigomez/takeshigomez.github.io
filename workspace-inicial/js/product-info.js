let producto = localStorage.getItem("prodID");
const ARTICULO_URL = PRODUCT_INFO_URL + producto + EXT_TYPE;
const container = document.getElementById("cargaProductos");

let articulos;
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
    articulos = await getJsonData(ARTICULO_URL);
    for (let i = 0; i < articulos.length; i++) {
        const product = articulos;
        container.innerHTML += `<div(${product.id})">
            <div>
                <ul>
                    <h1>${product.name}</h1>
                    
                </ul>
            </div>
           
        </div>`;
    };
}
imprimirArticulo();

