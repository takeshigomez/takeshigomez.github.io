/* S9.2: Cuando el usuario selecciona una categoría de productos, su identificador es guardado en el almacenamiento local antes de redirigir
 a productos.html.
Modifica la solicitud realizada en la carga del listado de productos (que hicimos en la entrega anterior) 
para que utilice ese identificador, en lugar de 101. */

let categoria = localStorage.getItem("catID");
const DATA_URL = PRODUCTS_URL + categoria + EXT_TYPE;
const container = document.getElementById("cargaProductos");


// se cambia productos por autos ya que esto se utiliza en imprimirProductos()
let autos;                                                               
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

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
    autos = await getJsonData(DATA_URL);
    const products = autos.products
    products.forEach(auto => {
        container.innerHTML += `<div class="container" id="productos" onclick="setProdID(${auto.id})"> 
        <ul><h1>${auto.name}</h1>   
        <p>${auto.description}</p>
        <p>${auto.currency} ${auto.cost}</p>
         <p>${auto.soldCount}</p></ul> 
         <img src="${auto.image}" class="img-fluid"></div>`
    });
}
imprimirProductos();

let logueado = sessionStorage.getItem("user");
if (logueado == null) {
    location.href= "./login.html";
}

/* S9.1 : En la barra de navegación superior, agregar en la esquina derecha el 
nombre del usuario ingresado en la pantalla de inicio de sesión.
 Para ello deberás hacer uso del almacenamiento local. */

const pcontainer = document.getElementById("perfil")
pcontainer.innerHTML += logueado



/* S9.3 Con el listado de productos desplegado:
Aplicar filtros a partir de rango de precio definido.
Agregar las funcionalidades de orden ascendente y descendente en función del precio y 
descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos) */

// Funcion de ordenamiento
function precioASD(a, b){
    return a.cost - b.cost; 
}
function precioDSN(a, b){
    return b.cost - a.cost;
}
function relevancia(a,b){
    return(a.soldCount * -1) - (b.soldCount * -1)
}

//En lugar de products.sort, se accede desde autos.products.sort
function ordenarASD() {
    autos.products.sort(precioASD);
    actualizarLista();
}

function ordenarDSN() {
    autos.products.sort(precioDSN);
    actualizarLista();
}

function ordenarRelevancia() {
    autos.products.sort(relevancia);
    actualizarLista();
}

// FUNCION DE ACTUALIZAR LISTA PARA EL FILTRO CORRESPONDIENTE
function actualizarLista(filtro = '', precioMin = 0, precioMax = Infinity) {
    const contenedor = document.getElementById("cargaProductos");
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    contenedor.innerHTML = '';
    resultadoBusqueda.innerHTML = '';
    
    autos.products.forEach((producto) => {
        if (
            producto.name.toLowerCase().includes(filtro.toLowerCase()) &&
            producto.cost >= precioMin &&
            producto.cost <= precioMax
        ) {
            container.innerHTML += `
                <div id="productos" onclick="setProdID(${producto.id})">
                    <div>
                        <ul>
                            <h1>${producto.name}</h1>
                            <p>${producto.description}</p>
                            <p>${producto.currency} ${producto.cost}</p>
                            <p>Vendidos: ${producto.soldCount}</p>
                        </ul>
                    </div>
                    <img src="${producto.image}">
                </div>`;
        }
    });
}

//CONSTANTES PARA LOS EVENTOS
const campoBusqueda = document.getElementById('buscar');
const campoPrecioMin = document.getElementById('rangeFilterCountMin');
const campoPrecioMax = document.getElementById('rangeFilterCountMax');
const limpiar = document.getElementById('clearRangeFilter');

// NUEVA FUNCION DE CARGO AUTOS PARA EL LIMPIAR
function cargarTodosLosAutos() {
    const contenedor = document.getElementById("cargaProductos");
    contenedor.innerHTML = ''; // Limpiar el contenido actual
    autos.products.forEach((producto) => {
        contenedor.innerHTML += `
            <div id="productos" >
                <div>
                    <ul>
                        <h1>${producto.name}</h1>
                        <p>${producto.description}</p>
                        <p>${producto.currency} ${producto.cost}</p>
                        <p>Vendidos: ${producto.soldCount}</p>
                    </ul>
                </div>
                <img src="${producto.image}">
            </div>`;
    });
}

//EVENTOS DE LOS BOTONES DE ORDENAR ,FILTRAR Y LIMPIAR
document.getElementById('clearRangeFilter').addEventListener('click', () => {
    campoBusqueda.value = ''; // Limpiar el campo de búsqueda
    campoPrecioMin.value = 0; // Restablecer el rango de precios mínimo
    campoPrecioMax.value = ''; // Restablecer el rango de precios máximo
    cargarTodosLosAutos(); // Cargar todos los autos sin filtro
});

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
////////////////////
//Guardamos A LA SESSION IMPRIMIR PRODUCTOS



 ///////////////////// MENU DESPLEGABLE //////////////////////
 const botonDropdown = document.getElementById("perfil");
 const menuDropdown = document.getElementById("divDropdown");


     /// FUNCIÓN PARA DESPLEGAR
 const toggleDropdown = function () {
   menuDropdown.classList.toggle("show"); // toggle modifica la clase
};

botonDropdown.addEventListener("click", function (e) {
 e.stopPropagation();
toggleDropdown();
});