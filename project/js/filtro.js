const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

const catalogo = document.getElementById('catalogo');
const marcaFiltro = document.getElementById('marcaFiltro');
const tipoFiltro = document.getElementById('tipoFiltro');

// Função para exibir produtos no catálogo
function exibirProdutos(produtosFiltrados) {
    catalogo.innerHTML = '';

    produtosFiltrados.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        
        produtoDiv.innerHTML = `
            <img src="${produto.fotoURL}" alt="${produto.nome}">
            <h2>${produto.nome}</h2>
            <p>R$ ${produto.preco}</p>
            <p>Tamanhos: ${produto.tamanhos.join(', ')}</p>
        `;

        catalogo.appendChild(produtoDiv);
    });
}

// Função para filtrar os produtos
function filtrarProdutos() {
    const marcaSelecionada = marcaFiltro.value;
    const tipoSelecionado = tipoFiltro.value;

    const produtosFiltrados = produtos.filter(produto => {
        const marcaCondicao = marcaSelecionada === "" || produto.marca === marcaSelecionada;
        const tipoCondicao = tipoSelecionado === "" || produto.tipo === tipoSelecionado;
        return marcaCondicao && tipoCondicao;
    });

    exibirProdutos(produtosFiltrados);
}

// Exibe todos os produtos ao carregar a página
exibirProdutos(produtos);
