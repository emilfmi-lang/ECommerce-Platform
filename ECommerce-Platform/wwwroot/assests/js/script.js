// Məhsullar database
const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        category: 'telefon',
        price: 2499,
        description: '256GB, Titan Mavi, A17 Pro çip',
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24',
        category: 'telefon',
        price: 1899,
        description: '512GB, Phantom Black, Snapdragon 8 Gen 3',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400'
    },
    {
        id: 3,
        name: 'MacBook Pro 16"',
        category: 'notebook',
        price: 4999,
        description: 'M3 Pro, 32GB RAM, 1TB SSD',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
    },
    {
        id: 4,
        name: 'Dell XPS 15',
        category: 'notebook',
        price: 3299,
        description: 'Intel i9, 32GB RAM, RTX 4060',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400'
    },
    {
        id: 5,
        name: 'AirPods Pro 2',
        category: 'audio',
        price: 549,
        description: 'USB-C, Aktiv səs-küyün yox edilməsi',
        image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400'
    },
    {
        id: 6,
        name: 'Sony WH-1000XM5',
        category: 'audio',
        price: 799,
        description: 'Premium noise cancelling qulaqlıq',
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400'
    },
    {
        id: 7,
        name: 'Magic Keyboard',
        category: 'aksesuar',
        price: 249,
        description: 'Touch ID, wireless, ağ rəng',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'
    },
    {
        id: 8,
        name: 'Logitech MX Master 3S',
        category: 'aksesuar',
        price: 199,
        description: 'Wireless siçan, 8K DPI',
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'
    },
    {
        id: 9,
        name: 'iPad Pro 12.9"',
        category: 'telefon',
        price: 2299,
        description: 'M2 çip, 256GB, Cellular',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
    },
    {
        id: 10,
        name: 'Samsung Galaxy Buds Pro',
        category: 'audio',
        price: 449,
        description: 'ANC, 360 audio, suya davamlı',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'
    },
    {
        id: 11,
        name: 'ASUS ROG Zephyrus',
        category: 'notebook',
        price: 3799,
        description: 'RTX 4080, AMD Ryzen 9, 240Hz ekran',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
    },
    {
        id: 12,
        name: 'USB-C Hub',
        category: 'aksesuar',
        price: 89,
        description: '7-in-1, HDMI 4K, 100W PD',
        image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'
    }
];

// Səbət
let cart = [];

// DOM elementləri
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// İlk yükləmə
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
});

// Məhsulları yüklə
function loadProducts() {
    let filteredProducts = [...products];
    
    // Kateqoriya filtri
    const category = categoryFilter.value;
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Qiymət filtri
    const priceRange = priceFilter.value;
    if (priceRange !== 'all') {
        if (priceRange === '2000+') {
            filteredProducts = filteredProducts.filter(p => p.price >= 2000);
        } else {
            const [min, max] = priceRange.split('-').map(Number);
            filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
        }
    }
    
    // Axtarış
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchTerm) || 
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sıralama
    const sortBy = sortFilter.value;
    if (sortBy === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    // Məhsulları göstər
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">Məhsul tapılmadı</p>';
    }
}

// Məhsul kartı yaradır
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x250?text=Product'">
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">${product.price} ₼</span>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                    Səbətə at
                </button>
            </div>
        </div>
    `;
    return card;
}

// Kateqoriya adı
function getCategoryName(category) {
    const names = {
        'telefon': 'Telefonlar',
        'notebook': 'Notebooklar',
        'aksesuar': 'Aksesuarlar',
        'audio': 'Audio'
    };
    return names[category] || category;
}

// Səbətə əlavə et
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCart();
    
    // Animation
    const btn = event.target;
    btn.textContent = '✓ Əlavə edildi';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.textContent = 'Səbətə at';
        btn.style.background = '';
    }, 1000);
}

// Səbəti yeniləyir
function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <h3>Səbət boşdur</h3>
                <p>Məhsul əlavə edin</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=Product'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price} ₼</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Sil</button>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2) + ' ₼';
}

// Miqdarı dəyişdir
function updateQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCart();
        }
    }
}

// Səbətdən sil
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

// Səbəti saxla
function saveCart() {
    // MVC-də bu localStorage əvəzinə server-ə göndəriləcək
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        // LocalStorage mövcud deyilsə, sadəcə yaddaşda saxlayırıq
        console.log('Cart saved to memory');
    }
}

// Səbəti yüklə
function loadCart() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
        }
    } catch (e) {
        cart = [];
    }
    updateCart();
}

// Səbət açma/bağlama
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Sifarişi tamamla
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Səbət boşdur!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Sifariş təsdiqləndi!\n\nMəhsul sayı: ${itemCount}\nToplam: ${total.toFixed(2)} ₼\n\nTəşəkkür edirik!`);
    
    // Səbəti təmizlə
    cart = [];
    saveCart();
    updateCart();
    closeCartSidebar();
});

// Filtrlər
categoryFilter.addEventListener('change', loadProducts);
priceFilter.addEventListener('change', loadProducts);
sortFilter.addEventListener('change', loadProducts);

// Axtarış
searchBtn.addEventListener('click', loadProducts);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        loadProducts();
    }
});

// Debounce axtarış üçün
let searchTimeout;
searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(loadProducts, 500);
});