let categoria = localStorage.getItem("catID")
const DATA_URL = PRODUCTS_URL + categoria + EXT_TYPE;
const container = document.getElementById("cargaProductos")
let products;

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
        container.innerHTML += `<div id="productos"> <div><ul><h1>${auto.name}</h1>   <p>${auto.description}</p> <p>${auto.currency} ${auto.cost}</p> <p>${auto.soldCount}</p></ul></div> <img src="${auto.image}"></div>`
    });

}
imprimirProductos();


let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

const pcontainer = document.getElementById("perfil")
pcontainer.innerHTML += logueado


function precioASD(a,b){
    return a.cost - b.cost
}
function precioDSN(a,b){
    return b.cost - a.cost
}

function relevancia(a,b){
    return(a.soldCount * -1) - (b.soldCount * -1)
}
function ordenarASD() {
    products.sort(precioASD())
    actualizarLista();
}
function ordenarDSN() {
    products.sort(precioDSN());
    actualizarLista();
}

function ordenarRelevancia() {
    products.sort(relevancia);
    actualizarLista();
}
function actualizarLista(filtro = "", precioMin = 0, precioMax = Infinity) {

    const contenedor = document.getElementById("cargaProductos");
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    contenedor.innerHTML = "";
    resultadoBusqueda.innerHTML = '';
    
    products.forEach(productos =>{
        if(
            productos.name.toLowerCase().includes(filtro.toLowerCase) &&
            productos.cost >= precioMin &&
            productos.cost <= precioMax
        ){
            const li = document.createElement('li');
            li.textContent = `${productos.name} - $${productos.cost} - Vendidos: ${productos.soldCount}`;
            resultadoBusqueda.appendChild(li);
        }
    });
    if(resultadoBusqueda.children.length === 0){
        const li = document.createElement('li');
        li.textContent = 'No se encontraron resultados.';
        resultadoBusqueda.appendChild(li);
    }
}


const campoBusqueda = document.getElementById('buscar');
const campoPrecioMin = document.getElementById('rangeFilterCountMin');
const campoPrecioMax = document.getElementById('rangeFilterCountMax');

campoBusqueda.addEventListener('input', () => {
    const filtro = campoBusqueda.value;
    const precioMin = parseFloat(campoPrecioMin.value) || 0;
    const precioMax = parseFloat(campoPrecioMax.value) || Infinity;
    actualizarLista(filtro, precioMin, precioMax);
});

campoPrecioMin.addEventListener('input', () => {
    const filtro = campoBusqueda.value;
    const precioMin = parseFloat(campoPrecioMin.value) || 0;
    const precioMax = parseFloat(campoPrecioMax.value) || Infinity;
    actualizarLista(filtro, precioMin, precioMax);
});

campoPrecioMax.addEventListener('input', () => {
    const filtro = campoBusqueda.value;
    const precioMin = parseFloat(campoPrecioMin.value) || 0;
    const precioMax = parseFloat(campoPrecioMax.value) || Infinity;
    actualizarLista(filtro, precioMin, precioMax);
});
