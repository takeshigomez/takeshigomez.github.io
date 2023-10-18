// Función para cargar y mostrar los datos del carrito
function loadCartData() {
  const cartUrl = 'https://japceibal.github.io/emercado-api/user_cart/25801.json';

  fetch(cartUrl)
    .then(response => response.json())
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
            <td><input class="form-control form-control-sm quantity-input" type="number" value="${article.count}"></td>
            <td><p class="product-info product-subtotal">${article.currency} ${article.unitCost * article.count}</p></td>
          `;
          // Agregar la fila a la tabla
          tbody.appendChild(tr);

          // Agregar event listener para actualizar el subtotal en tiempo real al modificar la cantidad
          const quantityInput = tr.querySelector('.quantity-input');
          quantityInput.addEventListener('input', updateProductSubtotal);
        });

        // Agregar la tabla completa al contenedor
        productList.appendChild(table);

        // Agregar event listener para los radios de envío
        const shippingRadios = document.querySelectorAll('input[type="radio"][name="shipping"]');
        shippingRadios.forEach(radio => {
          radio.addEventListener('change', updateSummary);
        });

        updateSummary(); // Calcular el resumen inicial
      } else {
        console.error('El formato de los datos del carrito es incorrecto.');
      }
    })
    .catch(error => {
      console.error('Error al obtener los datos del carrito de compras:', error);
    });

  // Función para actualizar el subtotal del producto en tiempo real
  function updateProductSubtotal() {
    const tr = this.closest('tr'); // Obtener la fila que contiene el campo de cantidad
    const quantity = parseInt(this.value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      const productCostElement = tr.querySelector('.product-cost');
      const productSubtotalElement = tr.querySelector('.product-subtotal');

      const productCostText = productCostElement.textContent;
      const [currency, amount] = productCostText.split(' ');
      const productCost = parseFloat(amount);

      const subtotal = currency + ' ' + (productCost * quantity).toFixed(2);
      productSubtotalElement.textContent = subtotal;
      updateSummary(); // Actualizar el resumen de compra
    }
  }

  // Función para calcular el resumen de la compra
  function updateSummary() {
    const subtotalElements = document.querySelectorAll('.product-subtotal');
    const subtotalGeneralElement = document.getElementById('subtotal-general');
    const costoEnvioElement = document.getElementById('costo-envio');
    const totalPagarElement = document.getElementById('total-pagar');

    let subtotalGeneral = 0;
    subtotalElements.forEach(subtotalElement => {
      const subtotalText = subtotalElement.textContent;
      const [currency, amount] = subtotalText.split(' ');
      const subtotal = parseFloat(amount);
      subtotalGeneral += subtotal;
    });

    subtotalGeneralElement.textContent = `USD ${subtotalGeneral.toFixed(2)}`;

    const selectedShipping = document.querySelector('input[type="radio"][name="shipping"]:checked');
    if (selectedShipping) {
      const shippingValue = parseFloat(selectedShipping.value) / 100;
      const costoEnvio = subtotalGeneral * shippingValue;
      costoEnvioElement.textContent = `USD ${costoEnvio.toFixed(2)}`;

      const totalPagar = subtotalGeneral + costoEnvio;
      totalPagarElement.textContent = `USD ${totalPagar.toFixed(2)}`;
    } else {
      costoEnvioElement.textContent = `USD 0.00`;
      totalPagarElement.textContent = `USD ${subtotalGeneral.toFixed(2)}`;
    }
  }
}

// Llamar a la función cuando la página se carga completamente
window.addEventListener('load', loadCartData);

document.addEventListener('DOMContentLoaded', function () {
  const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
  const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const creditCardForm = document.getElementById('creditCardForm');
  const bankTransferForm = document.getElementById('bankTransferForm');
  const confirmPaymentButton = document.getElementById('confirmPayment');

  // Event listener para mostrar u ocultar los formularios según la selección
  paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      if (this.value === 'creditCard') {
        creditCardForm.style.display = 'block';
        bankTransferForm.style.display = 'none';
      } else {
        creditCardForm.style.display = 'none';
        bankTransferForm.style.display = 'block';
      }
    });
  });

  // Event listener para abrir el modal
  confirmPaymentButton.addEventListener('click', function () {
    paymentModal.show();
  });
});