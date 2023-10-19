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

  //Transferencia bancaria- ingrese numero de cuenta solo numerica
  const soloEntradaNumerica = this.getElementById("accountNumber");
  soloEntradaNumerica.addEventListener('input', function () {
    // Obtén el valor actual del campo
    let value = this.value;
  
    // Elimina caracteres no numéricos y limita la longitud
      value = value.replace(/\D/g, '').slice(0, 20);
  
    // Actualiza el valor del campo
    this.value = value;
  });  
  
  //Cancelar entrada de numérico
  const nameSinNumeros = this.getElementById("name");

  nameSinNumeros.addEventListener('input', function () {
    // Obtén el valor actual del campo
    let value = this.value;
  
    // Elimina caracteres numéricos
    value = value.replace(/\d/g, '');
  
    // Actualiza el valor del campo
    this.value = value;
  });


  //Cada 4 numeros en el numero de la tarjeta agrega un espacio y -
  document.getElementById("cardNumber").addEventListener("input", function () {
    // Elimina cualquier caracter que no sea un dígito, guión o espacio en blanco
    let cardNumber = this.value.replace(/[^\d\s-]/g, '');
  
    // Elimina los guiones y espacios en blanco actuales
    cardNumber = cardNumber.replace(/[\s-]/g, '');
  
    // Agrega un guión después de cada grupo de 4 dígitos
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 - ');
  
    // Elimina los caracteres adicionales al final
    cardNumber = cardNumber.slice(0, 25);
  
    // Actualiza el valor del campo con el número de tarjeta formateado
    this.value = cardNumber;
  });

  //Fecha de vencimiento para lograr que quede por ejemplo 12/2024
  const expirationDateInput = document.getElementById('expirationDate');

expirationDateInput.addEventListener('input', function () {
  // Obtén el valor actual del campo
  let value = this.value;

  // Elimina caracteres no numéricos y limita la longitud
  value = value.replace(/\D/g, '').slice(0, 4);

  // Formatea la fecha como MM/AAAA
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2);
  }

  // Actualiza el valor del campo
  this.value = value;
});

//CCV codigo de seguridad solo números y obligatorio 3 digitos
const codigoSeguridad = document.getElementById('securityCode');

codigoSeguridad.addEventListener('input', function () {
  // Obtén el valor actual del campo
  let value = this.value;

  // Elimina caracteres no numéricos y limita la longitud a 3 dígitos
  value = value.replace(/\D/g, '').slice(0, 3);

  // Actualiza el valor del campo
  this.value = value;

  // Verifica si la longitud del valor es exactamente 3 dígitos
  if (value.length === 3) {
    // El valor tiene 3 dígitos, es válido
    this.setCustomValidity('');
  }
});



  
  
  





// Event listener para abrir el modal
confirmPaymentButton.addEventListener('click', function () {
  // Muestra el mensaje de confirmación
  const confirmationMessage = document.getElementById('confirmationMessage');
  confirmationMessage.style.display = 'block';

  // Verifica si todos los campos obligatorios están completos
  if (document.getElementById('name').checkValidity() && 
      document.getElementById('cardNumber').checkValidity() && 
      document.getElementById('expirationDate').checkValidity() && 
      document.getElementById('securityCode').checkValidity()) {
      // Si todos los campos obligatorios están completos, muestra el mensaje de confirmación
      confirmationMessage.textContent = '¡Confirmado!';
      // Cierra el modal después de 8 segundos
      setTimeout(function () {
        paymentModal.hide();
      }, 1000); // Cierra el modal después de 1 segundos
  } else {
      // Si falta algún campo obligatorio, muestra un mensaje de error o realiza la acción que desees.
      alert('Por favor, completa todos los campos obligatorios.');
  }
});

//PAUTA 3 - ENTREGA 6
  // Obtén una referencia al botón de confirmación
const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');

// Agrega un event listener para el botón de confirmación
confirmPurchaseButton.addEventListener('click', function () {
  // Realiza las validaciones aquí
  const shippingRadios = document.querySelectorAll('input[type="radio"][name="shipping"]');
  const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
  const cardNumber = document.getElementById('cardNumber').value;
  const expirationDate = document.getElementById('expirationDate').value;
  const securityCode = document.getElementById('securityCode').value;

  // Validación: Campos calle, número y esquina no pueden estar vacíos
  const street = document.getElementById('street').value;
  const number = document.getElementById('number').value;
  const corner = document.getElementById('corner').value;
  if (street.trim() === '' || number.trim() === '' || corner.trim() === '') {
    alert('Los campos calle, número y esquina no pueden estar vacíos.');
    return; // Detener la confirmación de compra
  }

  // Validación: Debe estar seleccionada la forma de envío
  const selectedShipping = document.querySelector('input[type="radio"][name="shipping"]:checked');
  if (!selectedShipping) {
    alert('Debes seleccionar una forma de envío.');
    return;
  }

  // Validación: La cantidad para cada artículo debe estar definida y ser mayor a 0
  const quantityInputs = document.querySelectorAll('.quantity-input');
  for (const quantityInput of quantityInputs) {
    const quantity = parseInt(quantityInput.value, 10);
    if (isNaN(quantity) || quantity <= 0) {
      alert('La cantidad para cada artículo debe ser mayor a 0.');
      return;
    }
  }

  // Validación: Debe haberse seleccionado una forma de pago
  const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  

  // Validación: Los campos, para la forma de pago seleccionada, no pueden estar vacíos
if (
  (selectedPaymentMethod.value === 'creditCard' &&
    (cardNumber.trim() === '' || expirationDate.trim() === '' || securityCode.trim() === '')) ||
  (selectedPaymentMethod.value === 'bankTransfer' && accountNumber.trim() === '')
) {
  alert('Debes elegir un medio de pago y completar todos los campos obligatorios.');
  return;
}

  // Si todas las validaciones pasan, puedes confirmar la compra
  alert('Compra confirmada. Gracias por tu compra.');
  // Aquí puedes enviar la información de la compra al servidor, etc.
});

  
});