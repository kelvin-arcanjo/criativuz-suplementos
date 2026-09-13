let currentCategory = 'todos';
let searchTerm = '';
let cart = [];

const searchInput = document.getElementById('search-input');

const products = [
  {
    id: 1,
    name: "Hyperbolic Mass 4kg",
    category: "massa-muscular",
    price: 46500,
    image: "imagens/hyperbolic-mass.jpg",
    benefits: ["Ganho de tamanho", "Ganho de peso", "Ganho de massa muscular"]
  },

  {
    id: 2,
    name: "Cuts Burner 90 comp",
    category: "emagrecimento",
    price: 20000,
    image: "imagens/cuts-burner.jpg",
    benefits: ["Queimador de gordura", "Aumenta a força", "Corta o apetite"]
  },

  {
    id: 3,
    name: "Super Pump Beast 40 colheres",
    category: "forca-creatina",
    price: 22000,
    image: "imagens/super-pump.jpg",
    benefits: ["Energia", "Resistência", "Garante treino intenso"]
  },

  {
    id: 4,
    name: "100% Creatine Monohydrate",
    category: "forca-creatina",
    price: 16500,
    image: "imagens/creatine.jpg",
    benefits: ["Força", "Resistência", "Recuperação muscular"]
  },

  {
    id: 5,
    name: "L-Carnitine Liquid 2500",
    category: "emagrecimento",
    price: 25500,
    image: "imagens/l-carnitine.jpg",
    benefits: ["Emagrecimento", "Perda de peso", "Controle de peso"]
  },

  {
    id: 6,
    name: "Pure Glutamine 9000",
    category: "proteinas",
    price: 18000,
    image: "imagens/glutamine.jpg",
    benefits: ["Recuperação", "Fortalece imunidade", "Melhora saúde intestinal"]
  },

  {
    id: 7,
    name: "Whey Isolate 2kg",
    category: "proteinas",
    price: 38000,
    image: "imagens/whey-isolate.jpg",
    benefits: ["Alta concentração proteica", "Rápida absorção", "Zero açúcar"]
  },

  {
    id: 8,
    name: "Multivitamin Complex 60 caps",
    category: "massa-muscular",
    price: 14000,
    image: "imagens/multivitamin.jpg",
    benefits: ["Recuperação acelerada", "Aumento de energia", "Suporte imunológico"]
  },

  {
    id: 9,
    name: "BCAA 5000 Powder",
    category: "massa-muscular",
    price: 19500,
    image: "imagens/bcaa.jpg",
    benefits: ["Recuperação muscular", "Anticatabólico", "Reduz a fadiga"]
  },

  {
    id: 10,
    name: "Omega 3 Ultra Pure",
    category: "emagrecimento",
    price: 12500,
    image: "imagens/omega3.jpg",
    benefits: ["Saúde cardiovascular", "Ação anti-inflamatória", "Apoio articular"]
  },

  {
    id: 11,
    name: "Pre-Workout Nitro V8",
    category: "forca-creatina",
    price: 24000,
    image: "imagens/pre-workout.jpg",
    benefits: ["Foco mental de elite", "Vascularização extrema", "Energia explosiva"]
  },
  
  {
    id: 12,
    name: "Casein Night Protein 1kg",
    category: "proteinas",
    price: 32000,
    image: "imagens/casein.jpg",
    benefits: ["Absorção lenta (8h)", "Nutrição noturna", "Manutenção da massa"]
  }
];

function renderProducts(productsList) {
    const gridContainer = document.getElementById('products-grid')

    const cardsHTML = productsList.map(product => {
        const benefitsList = product.benefits
            .map(b => `<li>${b}</li>`)
            .join('')

        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <ul>${benefitsList}</ul>
                <p class="price">${product.price} KZ</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
            `;
    }).join('')

    gridContainer.innerHTML = cardsHTML
}

renderProducts(products);

// Evento de digitação na busca;

searchInput.addEventListener('input' , (e) => {
    searchTerm = e.target.value.toLowerCase().trim()
    applyFilters()
})

// Evento nos botões de categoria;

document.querySelectorAll('.pill-btn').forEach(button => {
    button.addEventListener('click' , (e) => {
        document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')

        currentCategory = e.target.dataset.category;
        applyFilters();
    })
})

function applyFilters() {
    let filtered = [...products]

    //Aplica filtro de categoria;

    if (currentCategory !== 'todos') {
       filtered = filtered.filter(p => p.category === currentCategory) 
    }

    //Aplica filtro de busca por texto (nome ou benefícios);

    if (searchTerm !== '') {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) || 
            p.benefits.some(b => b.toLowerCase().includes(searchTerm))
        )
    }

  //Renderiza o resultado final unificado;

  renderProducts(filtered);
}

//Lógica Cart;

function addToCart(productId) {
    const product = products.find(p => p.id === productId)
    if (!product) return

    let cartItem = cart.find(item => item.id === productId)

    if (!cartItem) {
        cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 0
        }
        cart.push(cartItem)
    }

    // Incrementa 1 em ambos os casos (novo ou existente);

    cartItem.quantity++

    // Atualiza os elementos da tela;

    updateCartUI()
}

//Função updateCartCount();

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count')
    const totalCount = cart.reduce((total , item) => total + item.quantity , 0)

    cartCountElement.textContent = totalCount
}


//Função renderCartItems();

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items')

    if (cart.length === 0) {
        cartItemsContainer
            .innerHTML = '<p class="empty-cart">Seu carrinho está vazio </p>'

        return
    }

    const itemsHTML = cart
        .map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price} KZ</p>
                </div>
                <div class="cart-item-controls">
                    <button class="btn-qty" data-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn-qty" data-id="${item.id}" data-action="increase">+</button>
                </div>
                <p class="cart-item-subtotal">${item.price * item.quantity} KZ</p>
                <button class="btn-remove" data-id="${item.id}" data-action="remove">&times;</button> 
            </div>
          `).join('')

        cartItemsContainer.innerHTML = itemsHTML;                  
}


// Listener ÚNICO anexado ao container pai estático;

document.getElementById('cart-items')
    .addEventListener('click' , (e) => {
        const button = e.target.closest('button')
        if (!button) return;

        const productId = parseInt(button.dataset.id)
        const action = button.dataset.action

        if (action === 'increase') {
            changeQuantity(productId , 1)

        } else if (action === 'decrease') {
            changeQuantity(productId , -1)

        } else if (action === 'remove') {
            removeFromCart(productId)
        }
    })


//Função changeQuantity();

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id)
    if (!item) return

    item.quantity += delta

    // Se a quantidade cair para 0 ou menos, remove do carrinho;

    if (item.quantity <= 0) {
        removeFromCart(id)

    } else {
        updateCartUI()
    }
}

//Função removeFromCart();

function removerFromCart(id) {
    cart = cart.filter(item => item.id !== id)

    updateCartUI()
}