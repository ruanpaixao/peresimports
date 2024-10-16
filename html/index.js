const produtoForm = document.getElementById('produtoForm');
const produtosTabela = document.getElementById('produtosTabela').querySelector('tbody');

let produtos = [];
let editIndex = null;

produtoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fotoInput = document.getElementById('foto');
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const tamanhos = document.getElementById('tamanhos').value.split(',').map(tamanho => tamanho.trim());
    const marca = document.getElementById('marca').value;
    const tipo = document.getElementById('tipo').value;

    let fotoURL = '';

    // Verifica se há uma foto carregada e gera a URL para a imagem
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            fotoURL = e.target.result;
            adicionarOuEditarProduto(fotoURL, nome, preco, tamanhos, marca, tipo);
        };
        reader.readAsDataURL(fotoInput.files[0]);
    } else {
        adicionarOuEditarProduto(fotoURL, nome, preco, tamanhos, marca, tipo);
    }

    produtoForm.reset();
});

function adicionarOuEditarProduto(fotoURL, nome, preco, tamanhos, marca, tipo) {
    const produto = { fotoURL, nome, preco, tamanhos, marca, tipo };

    if (editIndex !== null) {
        produtos[editIndex] = produto;
        editIndex = null;
    } else {
        produtos.push(produto);
    }

    renderizarTabela();
}

function renderizarTabela() {
    produtosTabela.innerHTML = '';
    produtos.forEach((produto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><img src="${produto.fotoURL}" alt="${produto.nome}"></td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco}</td>
            <td>${produto.tamanhos.join(', ')}</td>
            <td>${produto.marca}</td>
            <td>${produto.tipo}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
            </td>
        `;

        produtosTabela.appendChild(row);
    });
}

function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('tamanhos').value = produto.tamanhos.join(', ');
    document.getElementById('marca').value = produto.marca;
    document.getElementById('tipo').value = produto.tipo;

    editIndex = index;
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    renderizarTabela();
}

// Função para filtrar produtos por marca e tipo
function filtrarProdutos(marcaFiltro, tipoFiltro) {
    const produtosFiltrados = produtos.filter(produto => 
        produto.marca === marcaFiltro && produto.tipo === tipoFiltro
    );

    return produtosFiltrados;
}

// Exemplo de como exibir produtos filtrados na página correta
function exibirProdutosPorCategoria(marca, tipo) {
    const produtosFiltrados = filtrarProdutos(marca, tipo);
    
    produtosTabela.innerHTML = ''; // Limpa a tabela
    produtosFiltrados.forEach((produto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${produto.fotoURL}" alt="${produto.nome}"></td>
            <td>${produto.nome}</td>
            <td>R$ ${produto.preco}</td>
            <td>${produto.tamanhos.join(', ')}</td>
            <td>${produto.marca}</td>
            <td>${produto.tipo}</td>
        `;
        produtosTabela.appendChild(row);
    });
}

// Exemplo de como usar a função para exibir só produtos da Nike para Futebol 7
exibirProdutosPorCategoria('Nike', 'Futebol 7');