window.addEventListener("scroll", function() {
    let header = document.querySelector("#header")
    header.classList.toggle("rolagem", window.scrollY > 0)
  })

  fetch('../json/products.json')
  .then(response => response.json())
  .then(cards => {
    const produtosContainer = document.getElementById('produtos');

    cards.forEach(card => {
      const divCard = document.createElement('div');
      divCard.classList.add('Card'); // Mudança de classe para Card

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
  })
  .catch(error => {
    console.error('Erro ao carregar cards.json:', error);
  });



  // OffCanvas

  function openOffcanvas() {
    document.getElementById("offcanvasRight").classList.add("show");
    document.addEventListener('click', closeOffcanvasOutside);
  }
  
  function closeOffcanvas() {
    document.getElementById("offcanvasRight").classList.remove("show");
    document.removeEventListener('click', closeOffcanvasOutside);
  }
  
  // function closeOffcanvasOutside(event) {
  //   const offcanvas = document.getElementById("offcanvasRight");
  //   if (!offcanvas.contains(event.target) && offcanvas.classList.contains("show")) {
  //     closeOffcanvas();
  //   }
  // }