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
            li.innerHTML =  `
            <table class="table">
            <thead>
              <tr >
                <th></th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
            <tr>
                <td><img class="img-thumbnail" style="max-width: 100px;" src="${article.image}" alt="${article.name}">
                              
                <td><p>${article.name}</p></td></td>

                <td><p class="product-cost"> ${article.currency} ${article.unitCost}</p></td>

                <td><input class="form-control form-control-sm"  type="number" id="quantity" value="${article.count}"</td>

                <td><p class="product-info product-subtotal"> ${article.unitCost * article.count} ${article.currency}</p></td>

                      
            </tbody>
            </table>
              
                  
                
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
  
  