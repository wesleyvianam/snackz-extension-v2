
async function fetchCategorias() {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        const data = await response.json();
        this.categorias = data; // Assumindo que a resposta é um array de objetos com a propriedade "nome"
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}

fetchCategorias()