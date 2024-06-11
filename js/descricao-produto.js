document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const indiceProduto = urlParams.get('indice'); 

    if (indiceProduto !== null) {
      fetch('../json/products.json') 
        .then(response => response.json())
        .then(data => {
          const produto = data[indiceProduto]; 
  
          document.getElementById('imagem-produto').src = produto.imagem;
          document.getElementById('titulo-produto').textContent = produto.titulo;
          document.getElementById('descricao-produto').textContent = produto.descricao;
          document.getElementById('preco-produto').textContent = produto.preco;
        })
        .catch(error => {
          console.error('Erro ao carregar products.json:', error);
        });
    } else {
      // Caso o índice seja inválido, exibe uma mensagem de erro
      document.getElementById('produto-info').innerHTML = '<p>Produto não encontrado.</p>';
    }
  });

  // ... código existente ...

// Verifica se a página atual é index.html e remove a classe 'nao-fixo'
window.addEventListener('load', () => {
    if (window.location.pathname === '/index.html') {
      document.querySelector('header').classList.remove('nao-fixo');
    }
  });