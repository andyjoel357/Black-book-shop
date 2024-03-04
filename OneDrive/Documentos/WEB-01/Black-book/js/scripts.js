const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartIva = document.getElementById('cart-iva');
const cartTotal = document.getElementById('cart-total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let carrito = [];
function agregarAlCarrito(producto) {
  const indice = carrito.findIndex(item => item.nombre === producto.nombre);

  if (indice === -1) {
    // Si el producto no existe en el carrito, agregarlo
    carrito.push({ ...producto, cantidad: 1 });
  } else {
    // Si el producto ya existe en el carrito, aumentar la cantidad
    carrito[indice].cantidad++;
  }

  mostrarCarrito();
}

function mostrarCarrito() {
  const tabla = document.getElementById('cart-items');
  tabla.innerHTML = '';

  let total = 0;
  let subtotal = 0;
  let iva = 0;

  carrito.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>${item.precio * item.cantidad}</td>
      <td><button class="btn btn-danger" onclick="eliminarDelCarrito(${carrito.indexOf(item)})">Eliminar</button></td>
    `;
    const eliminarBoton = tr.querySelector('button.btn-danger');
    eliminarBoton.addEventListener('click', () => {
      eliminarDelCarrito(carrito.indexOf(item));
    });

    tabla.appendChild(tr);

    subtotal += item.precio * item.cantidad;
  });

  iva = subtotal * 0.12; // Asumiendo un 12% de IVA
  total = subtotal + iva;

  document.getElementById('cart-subtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('cart-iva').innerText = `$${iva.toFixed(2)}`;
  document.getElementById('cart-total').innerText = `$${total.toFixed(2)}`;
}
function eliminarDelCarrito(indice) {
  carrito.splice(indice, 1);
  localStorage.setItem('cart', JSON.stringify(carrito));
  mostrarCarrito();
}

mostrarCarrito();