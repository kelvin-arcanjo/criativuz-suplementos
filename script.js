let currentCategory = 'todos';
let searchTerm = '';

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

