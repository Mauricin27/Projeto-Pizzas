const toggleButton = document.getElementById('navbar-toggle');
        const navLinks = document.getElementById('nav-links');

        toggleButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        
// MODAL //
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const modal = document.getElementById('cart-modal');
    const span = document.getElementsByClassName('close')[0];
    const cancelButton = document.getElementById('cancel');
    const confirmButton = document.getElementById('confirm');
    let cartItems = [];
    let totalPrice = 0;

    document.querySelectorAll('.open-modal').forEach(button => {
        button.onclick = function() {
            const productElement = this.closest('.product');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));
            openModal(productName, productPrice);
        };
    });

    span.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    cancelButton.onclick = function() {
        cartItems = [];
        totalPrice = 0;
        cartItemsElement.innerHTML = '';
        totalPriceElement.textContent = '0';
        modal.style.display = 'none';
    };

    confirmButton.onclick = function() {
        alert('Compra Realizada!');
        cartItems = [];
        totalPrice = 0;
        cartItemsElement.innerHTML = '';
        totalPriceElement.textContent = '0';
        modal.style.display = 'none';
    };

    function openModal(name, price) {
        const existingItem = cartItems.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
            updateCartItem(existingItem);
        } else {
            const cartItem = {name, price, quantity: 1};
            cartItems.push(cartItem);
            addItemToCart(cartItem);
        }
        updateTotalPrice();
        modal.style.display = 'block';
    }

    function addItemToCart(item) {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-name', item.name);
        listItem.innerHTML = `
        ${item.name} - R$${item.price.toFixed(2)}
        <div class="quantity-controls">
        <button class="decrease">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase">+</button>
        </div>
        `;
        cartItemsElement.appendChild(listItem);
        attachQuantityControls(listItem, item);
    }

    function updateCartItem(item) {
        const listItem = cartItemsElement.querySelector(`[data-name="${item.name}"]`);
        listItem.querySelector('.quantity').textContent = item.quantity;
    }

    function attachQuantityControls(listItem, item) {
        const decreaseButton = listItem.querySelector('.decrease');
        const increaseButton = listItem.querySelector('.increase');

        decreaseButton.onclick = function() {
            if (item.quantity > 1) {
                item.quantity--;
                updateCartItem(item);
                updateTotalPrice();
            }
        };
        
        increaseButton.onclick = function() {
            item.quantity++;
            updateCartItem(item);
            updateTotalPrice();
        };
    }

    function updateTotalPrice() {
        totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
});

document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('cadastroForm').reset();
    document.getElementById('mensagem').textContent = '';
});

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('mensagem').textContent = 'Cadastro realizado com sucesso!';
});

document.getElementById('togglePassword').addEventListener('change', function() {
    const senhaField = document.getElementById('senha');
    if (this.checked) {
        senhaField.type = 'text';
    } else {
        senhaField.type = 'password';
    }
});