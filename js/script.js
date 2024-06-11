window.addEventListener("scroll", function() {
  let header = document.querySelector("#header")
  header.classList.toggle("rolagem", window.scrollY > 0)
})

// OffCanvas
function openOffcanvas() {
  document.getElementById("offcanvasRight").classList.add("show");
  document.addEventListener('click', closeOffcanvasOutside);
}

function closeOffcanvas() {
  document.getElementById("offcanvasRight").classList.remove("show");
  document.removeEventListener('click', closeOffcanvasOutside);
}

function closeOffcanvasOutside(event) {
  if (event.target === document.getElementById("offcanvasRight")) {
    closeOffcanvas();
  }
}

let cards = []; 
let currentPage = 1; 
const produtosPorPagina = 9;

fetch('../json/products.json')
.then(response => response.json())
.then(data => {
  cards = data; 
  renderizarProdutos(currentPage); 
  habilitarDesabilitarBotoes(); 
  atualizarInformacaoPagina();
  renderizarDestaques(currentPage); 
})
.catch(error => {
  console.error('Erro ao carregar cards.json:', error);
});

// Função para renderizar os produtos
function renderizarProdutos(pagina) {
  const produtosContainer = document.getElementById('produtos');
  const produtos = produtosContainer.querySelectorAll('.Card');
  produtos.forEach(produto => produto.remove());

  const inicio = (pagina - 1) * produtosPorPagina;
  const fim = inicio + produtosPorPagina;

  cards.slice(inicio, fim).forEach(card => {
    const divCard = document.createElement('div');
    divCard.classList.add('Card'); 

    const imgCard = document.createElement('img');
    imgCard.src = card.imagem;
    imgCard.alt = card.titulo;

    const divContent = document.createElement('div'); 

    const h1Titulo = document.createElement('h1');
    h1Titulo.textContent = card.titulo;

    const h2Descricao = document.createElement('h2');
    h2Descricao.textContent = card.descricao;

    const spanPreco = document.createElement('span');
    spanPreco.textContent = card.preco;

    const buttonVerMais = document.createElement('button');
    buttonVerMais.textContent = card.botao;

    divContent.appendChild(h1Titulo);
    divContent.appendChild(h2Descricao);
    divContent.appendChild(spanPreco);
    divContent.appendChild(buttonVerMais); 

    divCard.appendChild(imgCard);
    divCard.appendChild(divContent); 

    produtosContainer.appendChild(divCard); 
  });
}

// Função para renderizar os produtos em destaque (lado direito)
function renderizarDestaques(pagina) {
  const destaquesContainer = document.getElementById('destaques');
  const destaques = destaquesContainer.querySelectorAll('.Card');
  destaques.forEach(destaque => destaque.remove());

  // Seleciona 3 produtos aleatórios
  const produtosAleatorios = [];
  while (produtosAleatorios.length < 3) {
    let indiceAleatorio = Math.floor(Math.random() * cards.length);
    if (!produtosAleatorios.includes(indiceAleatorio)) {
      produtosAleatorios.push(indiceAleatorio);
    }
  }

  produtosAleatorios.forEach(indice => {
    const card = cards[indice];
    const divCard = document.createElement('div');
    divCard.classList.add('Card'); 

    const imgCard = document.createElement('img');
    imgCard.src = card.imagem;
    imgCard.alt = card.titulo;

    const divContent = document.createElement('div'); 

    const h1Titulo = document.createElement('h1');
    h1Titulo.textContent = card.titulo;

    const h2Descricao = document.createElement('h2');
    h2Descricao.textContent = card.descricao;

    const spanPreco = document.createElement('span');
    spanPreco.textContent = card.preco;

    const buttonVerMais = document.createElement('button');
    buttonVerMais.textContent = card.botao;

    divContent.appendChild(h1Titulo);
    divContent.appendChild(h2Descricao);
    divContent.appendChild(spanPreco);
    divContent.appendChild(buttonVerMais); 

    divCard.appendChild(imgCard);
    divCard.appendChild(divContent); 

    destaquesContainer.appendChild(divCard); 
  });
}


// Função para atualizar a página
function atualizarPagina(novaPagina) {
  currentPage = novaPagina;
  renderizarProdutos(currentPage);
  habilitarDesabilitarBotoes(); 
  atualizarInformacaoPagina(); 
  renderizarDestaques(currentPage); 
}

// Adiciona eventos de clique aos botões existentes
document.getElementById('previous-page').addEventListener('click', () => {
  atualizarPagina(currentPage - 1);
});

document.getElementById('next-page').addEventListener('click', () => {
  atualizarPagina(currentPage + 1);
});

// Função para criar os botões de paginação
function criarBotoesPaginacao() {
  const totalPaginas = Math.ceil(cards.length / produtosPorPagina);
  const paginacaoContainer = document.getElementById('paginacao');

  // Limpa os botões existentes
  paginacaoContainer.innerHTML = '';

  // Cria os botões para cada página
  for (let i = 1; i <= totalPaginas; i++) {
    const botao = document.createElement('button');
    botao.textContent = i;
    botao.addEventListener('click', () => {
      atualizarPagina(i);
    });
    paginacaoContainer.appendChild(botao);
  }
}

// Habilita/Desabilita botões de acordo com a página atual
function habilitarDesabilitarBotoes() {
  const totalPaginas = Math.ceil(cards.length / produtosPorPagina);
  if (currentPage === 1) {
    document.getElementById('previous-page').disabled = true;
  } else {
    document.getElementById('previous-page').disabled = false;
  }
  if (currentPage === totalPaginas) {
    document.getElementById('next-page').disabled = true;
  } else {
    document.getElementById('next-page').disabled = false;
  }
}

// Atualiza a informação da página
function atualizarInformacaoPagina() {
  const totalPaginas = Math.ceil(cards.length / produtosPorPagina);
  document.getElementById('page-info').textContent = `Página ${currentPage} de ${totalPaginas}`;
}

// Função para atualizar a página
function atualizarPagina(novaPagina) {
  currentPage = novaPagina;
  renderizarProdutos(currentPage);
  habilitarDesabilitarBotoes();
  atualizarInformacaoPagina();
  renderizarDestaques(currentPage);

  // Rola para o topo da página
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Rolagem suave
  });

  // Atualiza a URL da página
  const urlCompartilhamento = window.location.href; // Pega a URL atual
  const urlComPagina = urlCompartilhamento + "?pagina=" + currentPage; // Adiciona a página à URL
  window.history.pushState({}, "", urlComPagina); // Atualiza a URL sem recarregar a página
}


// Inicialização da paginação
habilitarDesabilitarBotoes();
atualizarInformacaoPagina(); 