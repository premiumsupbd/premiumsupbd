
const products = [
    {
        id: 1,
        name: "Netflix Premium",
        description: "4K HDR streaming, 4 screens simultaneously",
        price: 19.99,
        duration: "1 Month",
        image: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202012/Netflix-New-Feature-Audio-Only_1200x768.jpeg?size=690:388",
        category: "Streaming"
    },
    {
        id: 2,
        name: "ExpressVPN",
        description: "Secure, fast VPN with servers in 94 countries",
        price: 12.99,
        duration: "1 Month",
        image: "https://www.fastestvpnguide.com/wp-content/uploads/2021/02/expressvpn-review.jpg",
        category: "VPN"
    },
    {
        id: 3,
        name: "YouTube Premium",
        description: "Ad-free videos, background play, and YouTube Music",
        price: 11.99,
        duration: "1 Month",
        image: "https://th.bing.com/th/id/OIP.6JqTEbu1dDsHNFDNF0BVrAHaFj?rs=1&pid=ImgDetMain",
        category: "Streaming"
    },
    {
        id: 4,
        name: "Spotify Premium",
        description: "Ad-free music streaming with offline downloads",
        price: 9.99,
        duration: "1 Month",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeSxI2BzkmYfvGqWUDnOn697vxq2cof6WlqafyZbSu5f4YNPYrCTOIedy3l0hiSUtECTA&usqp=CAU",
        category: "Streaming"
    },
    {
        id: 5,
        name: "NordVPN",
        description: "Military-grade encryption and unlimited bandwidth",
        price: 11.99,
        duration: "1 Month",
        image: "https://cdn.technadu.com/wp-content/uploads/2024/05/NordVPN-Review-Featured.jpg",
        category: "VPN"
    },
    {
        id: 6,
        name: "Discord Nitro",
        description: "Enhanced Discord experience with custom emojis",
        price: 9.99,
        duration: "1 Month",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjoovOxDtIeOEfEs4rmEj1PcxDdbS50G8NNM3jADtGVAvgf-6mheYoTunosqiJDxexpxM&usqp=CAU",
        category: "Gaming"
    }
];

let cart = [];
let activeCategory = "All";

function initStore() {
    displayProducts();
    setupCategoryButtons();
}

function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = activeCategory === "All" 
        ? products 
        : products.filter(product => product.category === activeCategory);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">৳${product.price.toFixed(2)}</p>
                    <p class="product-duration">Duration: ${product.duration}</p>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeCategory = button.textContent;
            displayProducts();
        });
    });
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    updateCartCount();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>৳${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <span>${item.quantity}</span>
                <button class="btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="btn" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        `;
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = `৳${total.toFixed(2)}`;
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
        updateCartCount();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const modal = document.getElementById('checkoutModal');
    modal.classList.add('active');
}

function sendOrderViaGmail(event) {
    event.preventDefault();
    
    // Get customer details
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;

    // Validate Gmail address
    if (!email.toLowerCase().endsWith('@gmail.com')) {
        alert('Please enter a valid Gmail address');
        return;
    }

    // Create order details
    let orderDetails = `Dear Premium Store,\n\n`;
    orderDetails += `I would like to place the following order:\n\n`;
    orderDetails += `Customer Information:\n`;
    orderDetails += `==================\n`;
    orderDetails += `Name: ${name}\n`;
    orderDetails += `Address: ${address}\n`;
    orderDetails += `Mobile: ${mobile}\n`;
    orderDetails += `Email: ${email}\n\n`;
    orderDetails += `Order Details:\n`;
    orderDetails += `==================\n`;
    
    let totalAmount = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        orderDetails += `${item.name} x ${item.quantity} = ৳${itemTotal.toFixed(2)}\n`;
        totalAmount += itemTotal;
    });
    
    orderDetails += `\nTotal Order Amount: ৳${totalAmount.toFixed(2)}\n\n`;
    orderDetails += `Please process my order and contact me for payment details.\n\n`;
    orderDetails += `Thank you,\n${name}`;

    // Create Gmail URL with pre-filled data
    const subject = encodeURIComponent(`New Order from ${name} - Premium Store`);
    const body = encodeURIComponent(orderDetails);
    const recipient = 'sultanarabi161@gmail.com'; // Owner's Gmail
    
    // Direct Gmail compose URL using mailto
    const gmailUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Show processing message
    const modal = document.getElementById('checkoutModal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Redirecting to Gmail...</h2>
            <div style="text-align: center; margin: 2rem;">
                <i class="fas fa-spinner fa-spin fa-3x"></i>
                <p style="margin-top: 1rem;">Please wait while we redirect you to Gmail to confirm your order...</p>
            </div>
        </div>
    `;

    // Redirect to Gmail after short delay
    setTimeout(() => {
        window.open(gmailUrl, '_self'); // Use '_self' to open in the same tab
        completePurchase();
    }, 1500);
}

function completePurchase() {
    // Clear cart and close modals
    cart = [];
    updateCart();
    updateCartCount();
    
    // Show success message
    const modal = document.getElementById('checkoutModal');
    modal.innerHTML = `
        <div class="modal-content">
            <h2 style="color: var(--success);"><i class="fas fa-check-circle"></i> Almost Done!</h2>
            <p style="margin: 1rem 0; text-align: center;">
                Please check your Gmail tab to confirm and send your order.<br>
                Don't forget to click the Send button!
            </p>
            <button onclick="closeCheckoutModal()" class="btn btn-primary" style="width: 100%;">
                Close
            </button>
        </div>
    `;
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    modal.classList.remove('active');
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', initStore);