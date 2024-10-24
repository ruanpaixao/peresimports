   // Função para criar e baixar o HTML do produto
   function adicionarProduto(nome, preco, tamanhos, foto) {
    // Template da página HTML
    let template = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${nome}</title>
    </head>
    <body>
        <h1>${nome}</h1>
        <img src="${foto}" alt="Foto de ${nome}">
        <p>Preço: ${preco}</p>
        <p>Tamanhos disponíveis: ${tamanhos.join(", ")}</p>
    </body>
    </html>
    `;

    // Criando um Blob para armazenar o HTML e gerando o download
    let blob = new Blob([template], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${nome}.html`; // Nome do arquivo baseado no nome do produto
    link.click();
}

// Função para processar o formulário de adição de produtos
document.getElementById('produtoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que o formulário recarregue a página

    // Pegar valores do formulário
    let nome = document.getElementById('nome').value;
    let preco = document.getElementById('preco').value;
    let tamanhos = document.getElementById('tamanhos').value.split(',').map(tamanho => tamanho.trim());
    let foto = document.getElementById('foto').value;

    // Chamar a função para adicionar o produto e gerar a página HTML
    adicionarProduto(nome, preco, tamanhos, foto);

    // Limpar o formulário
    document.getElementById('produtoForm').reset();
});