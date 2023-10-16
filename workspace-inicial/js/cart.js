
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

      if (data && data.articles) {
        // Crear una tabla fuera del bucle
        const table = document.createElement('table');
        table.className = 'table';

        // Agregar encabezados de tabla
        table.innerHTML = `<div class="container">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
          </div>`;
        
        const tbody = table.querySelector('tbody');
        data.articles.forEach(article => {
          // Crear una fila para cada artículo
          const tr = document.createElement('tr');
          tr.setAttribute('data-id', article.id);
          tr.innerHTML = `
            <td><img class="img-thumbnail" style="max-width: 100px;" src="${article.image}" alt="${article.name}"></td>
            <td><p>${article.name}</p></td>
            <td><p class="product-cost">${article.currency} ${article.unitCost}</p></td>
            <td><input class="form-control form-control-sm quantity-input" type="number" id="cantidad" value="${article.count}"></td>
            <td><p class="product-info product-subtotal">${article.unitCost} ${article.currency}</p></td>
          `;
          // Agregar la fila a la tabla
          tbody.appendChild(tr);
          // Agregar event listener para actualizar el subtotal en tiempo real al modificar la cantidad
          const quantityInput = tr.querySelector('.quantity-input');
          quantityInput.addEventListener('input', function () {
            // Obtener el nuevo valor de la cantidad
            const newQuantity = parseInt(this.value, 10);
            // Validar que la nueva cantidad sea un número válido
            if (!isNaN(newQuantity) && newQuantity >= 0) {
              // Actualizar el subtotal en función de la nueva cantidad
              const newSubtotal = article.unitCost * newQuantity;
              tr.querySelector('.product-subtotal').textContent = `${newSubtotal} ${article.currency}`;
            }
          });
        });
        
        // Agregar la tabla completa al contenedor
        productList.appendChild(table);
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