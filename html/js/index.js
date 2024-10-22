const produtoForm = document.getElementById('produtoForm');
const produtosTabela = document.getElementById('produtosTabela').querySelector('tbody');

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
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

    // Salvar no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));

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
    localStorage.setItem('produtos', JSON.stringify(produtos)); // Atualiza o localStorage
    renderizarTabela();
}

// Renderiza a tabela ao carregar a página
renderizarTabela();
