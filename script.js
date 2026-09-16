let currentCategory = 'todos';
let searchTerm = '';
let cart = [];

const searchInput = document.getElementById('search-input');

//Seleção dos elementos do DOM pra lógica do cart-modal;

const cartModal = document.getElementById('cart-modal');
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');

const products = [
  {
    id: 1,
    name: "Hyperbolic Mass 4kg",
    category: "massa-muscular",
    price: 46500,
    image: "imagens/hyperbolic 4kg.webp",
    benefits: ["Ganho de tamanho", "Ganho de peso", "Ganho de massa muscular"]
  },

  {
    id: 2,
    name: "Cuts Burner 90 comp",
    category: "emagrecimento",
    price: 20000,
    image: "imagens/Cuts Burner 90 comp.webp",
    benefits: ["Queimador de gordura", "Aumenta a força", "Corta o apetite"]
  },

  {
    id: 3,
    name: "Super Pump Beast 40 colheres",
    category: "forca-creatina",
    price: 22000,
    image: "imagens/Super Pump Beast.webp",
    benefits: ["Energia", "Resistência", "Garante treino intenso"]
  },

  {
    id: 4,
    name: "100% Creatine Monohydrate",
    category: "forca-creatina",
    price: 16500,
    image: "imagens/100  Creatine Monohydrate.webp",
    benefits: ["Força", "Resistência", "Recuperação muscular"]
  },

  {
    id: 5,
    name: "L-Carnitine Liquid 2500",
    category: "emagrecimento",
    price: 25500,
    image: "imagens/LCarnitine Liquid 2500.webp",
    benefits: ["Emagrecimento", "Perda de peso", "Controle de peso"]
  },

  {
    id: 6,
    name: "Pure Glutamine 9000",
    category: "proteinas",
    price: 18000,
    image: "imagens/Pure glutamine 9000.webp",
    benefits: ["Recuperação", "Fortalece imunidade", "Melhora saúde intestinal"]
  },

  {
    id: 7,
    name: "Pré Treino Qhush Super Heat 105g",
    category: "forca-creatina",
    price: 15500,
    image: "imagens/Pré Treino Qhush Super Heat 105g.webp",
    benefits: ["Aumenta a força e resistência", "Reduz o cansaço", "Mais tempo de treino"]
  },

  {
    id: 8,
    name: "Black Bull Whey Supreme 908g",
    category: "proteinas",
    price: 29500,
    image: "imagens/Black Bull Whey Supreme 908g.webp",
    benefits: ["Ganho de massa magra", "Recuperação muscular", "44g Proteína / Low Fat"]
  },

  {
    id: 9,
    name: "Vitatech Multi Vitamin Women 30 Tabs",
    category: "emagrecimento",
    price: 16000,
    image: "imagens/Vitatech Multi Vitamin Women 30 Tabs.webp",
    benefits: ["Com extrato de Cranberry", "Energia e imunidade", "Saúde da pele, cabelo e unhas"]
  },

  {
    id: 10,
    name: "Titan Core Whey Protein 2kg",
    category: "proteinas",
    price: 56000,
    image: "imagens/Titan Core Whey Protein 2kg.webp",
    benefits: ["100% Whey Protein Powder", "Sem glúten (Gluten Free)", "Origem França / Europa"]
  },

  {
    id: 11,
    name: "Titan Core BCAA Strawberry Mango 180g",
    category: "massa-muscular",
    price: 15000,
    image: "imagens/Titan Core BCAA Strawberry Mango 180g.webp",
    benefits: ["Reduz dores musculares", "Recuperador muscular", "Auxilia na concentração"]
  },

  {
    id: 12,
    name: "Nutritech NT Isolate Whey 1kg",
    category: "proteinas",
    price: 60000,
    image: "imagens/Nutritech NT Isolate Whey 1kg.webp",
    benefits: ["25g Proteína / 5.2g BCAAs", "Ganho de massa e definição", "Fórmula de rápida absorção"]
   }
];

// --- RENDERIZAÇÃO DE PRODUTOS ---

function renderProducts(productsList) {
  const gridContainer = document.getElementById('products-grid');
  if (!gridContainer) return;

  const cardsHTML = productsList.map(product => {
    const benefitsList = product.benefits.map(b => `<li>${b}</li>`).join('');

    return `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <ul>${benefitsList}</ul>
        <p class="price">${product.price.toLocaleString('pt-PT')} KZ</p>
        <button onclick="addToCart(${product.id}, this)">Adicionar ao Carrinho</button>
      </div>
    `;
  }).join('');

  gridContainer.innerHTML = cardsHTML;
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

function addToCart(productId , buttonElement) {
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

    //Feedback visual temporário no botão;

    if (buttonElement) {
      buttonElement.classList.add('btn-added')
      const originalText = buttonElement.textContent
      buttonElement.textContent = "✓ Adicionado!"
      buttonElement.disabled = true

      setTimeout(() => {
        buttonElement.classList.remove('btn-added')
        buttonElement.textContent = originalText
        buttonElement.disabled = false
      }, 1500)
    }
}

//Função updateCartCount();

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count')
    const totalCount = cart.reduce((total , item) => total + item.quantity , 0)

    cartCountElement.textContent = totalCount
}


//Função renderCartItems();

function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
    return;
  }

  const itemsHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-price">${item.price.toLocaleString('pt-PT')} KZ</p>
      </div>
      <div class="cart-item-controls">
        <button class="btn-qty" data-id="${item.id}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="btn-qty" data-id="${item.id}" data-action="increase">+</button>
      </div>
      <p class="cart-item-subtotal">${(item.price * item.quantity).toLocaleString('pt-PT')} KZ</p>
      <button class="btn-remove" data-id="${item.id}" data-action="remove">&times;</button> 
    </div>
  `).join('');

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

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id)

    updateCartUI()
}

// Função updateCartTotal;

function updateCartTotal() {
    const cartTotalElement = document.getElementById('cart-total')

    const totalInKZ = cart.reduce((acc , item) => {
        return acc + (item.price * item.quantity)
    }, 0)

    cartTotalElement.textContent = `${totalInKZ} KZ`;
}

//Função updateCartUI;

function updateCartUI() {
  renderCartItems();
  updateCartCount();
  updateCartTotal();
}

//Função checkoutWhatsApp();

function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!")
        return
    }

    //Captura e valida os inputs do cliente;

    const clientName = document.getElementById('client-name').value.trim();
    const clientAddress = document.getElementById('client-address').value.trim();

    if (!clientName || !clientAddress) {
        alert("Por favor, preencha o seu nome e endereço para a entrega!");
        return;
    }

    const phone = "244943567154" // Número da Criativuz Suplementos (DDI + DDD + Número);

    //Percorre os itens do carrinho e adiciona as linhas;

    const itemsList = cart.map(item => 
        `• ${item.name} (x${item.quantity}) - ${item.price * item.quantity} KZ`
    ).join('\n');

    //Calcula o total geral;

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // 4. Monta a mensagem estruturada;

   const message = [
        "*NOVO PEDIDO - CRIATIVUZ SUPLEMENTOS*",
        "",
        `*Cliente:* ${clientName}`,
        `*Endereço:* ${clientAddress}`,
        "",
        "*Itens do Pedido:*",
        itemsList,
        "",
        `*Total:* ${total} KZ`,
        "",
        "Aguardo as instruções para o pagamento!"
    ].join('\n');

    //Codifica a mensagem em formato URL;

    const encodedMessage = encodeURIComponent(message)

    //Redireciona para o whatsApp;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`
    window.open(whatsappUrl , '_blank')
}

// Evento no botão de checkout;

document.getElementById('checkout-whatsapp-btn').addEventListener('click', checkoutWhatsApp);


// Função para alternar (abrir/fechar) ao clicar no botão flutuante;

function toggleCart() {
  cartModal.classList.toggle('open');
  if (cartOverlay) cartOverlay.classList.toggle('open');
}

// Função para fechar diretamente;

function closeCart() {
  cartModal.classList.remove('open');
  if (cartOverlay) cartOverlay.classList.remove('open');
}

// Clicar no botão flutuante: abre se estiver fechado, fecha se estiver aberto;

cartToggleBtn.addEventListener('click', toggleCart);

// Clicar no botão "X" dentro do modal;

if (closeCartBtn) {
  closeCartBtn.addEventListener('click', closeCart);
}

// Clicar fora (no overlay escurecido);

if (cartOverlay) {
  cartOverlay.addEventListener('click', closeCart);
}

// Pressionar a tecla ESC;

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartModal.classList.contains('open')) {
    closeCart();
  }
});



