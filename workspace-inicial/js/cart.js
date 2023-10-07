// Función para cargar y mostrar los datos del carrito
function loadCartData() {
    const cartUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';
  
    fetch(cartUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del carrito de compras.');
        }
        return response.json();
      })
      .then(data => {
        const productList = document.getElementById('product-list');
  
        if (data && data.articles) { // Cambio: Acceder a 'articles' en lugar de 'products'
          data.articles.forEach(article => { // Cambio: Iterar sobre 'articles' en lugar de 'products'
            const li = document.createElement('li');
            li.className = 'product-list';
            li.innerHTML = `
            
              <img src="${article.image}" alt="${article.name}" class="img-fluid">
              <div class="info-container">
                <div class="name-and-price">
                  <h2>${article.name}</h2>
                  <h2 class="product-cost">${article.unitCost} ${article.currency}</h2>
                </div>
                <label for="quantity">Cantidad:</label>
                <input type="number" id="quantity" value="${article.count}" disabled> <!-- Cambio: Acceder a 'count' en lugar de 'quantity' -->
                <h2 class="product-info product-subtotal">Subtotal: ${article.unitCost * article.count} ${article.currency}</h2> <!-- Cambio: Usar 'unitCost' en lugar de 'cost' -->
              </div>
            `;
            productList.appendChild(li);
          });
        } else {
          console.error('El formato de los datos del carrito es incorrecto.');
        }
      })
      .catch(error => {
        console.error('Error al obtener los datos del carrito de compras:', error);
      });
  }
  
  // Llamar a la función cuando la página se carga completamente
  window.addEventListener('load', loadCartData);
  
  