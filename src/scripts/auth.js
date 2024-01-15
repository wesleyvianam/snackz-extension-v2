new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        isLoggedIn: false,
        token: null,
    },
    methods: {
        async login() {
            console.log(this.email)
            console.log(this.password)
            try {
                const response = await fetch('http://127.0.0.1:8000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    const token = data.token.plainTextToken;

                    console.log(token)

                    sessionStorage.setItem('token', token);

                    getOptions();           

                    this.isLoggedIn = true;
                    this.token = token;
                } else {
                    console.error('Falha no login');
                }
            } catch (error) {
                console.error('Erro na solicitação:', error);
            }
        },
        logout() {
            // Limpa o token do Session Storage
            sessionStorage.removeItem('token');

            // Atualiza o estado de login
            this.isLoggedIn = false;
            this.token = null;
        },
    },
    mounted() {
        // Verifica se há um token no Session Storage ao carregar a página
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            this.isLoggedIn = true;
            this.token = storedToken;
        }
    },
});

async function getOptions() {
    const storedToken = sessionStorage.getItem('token');
    try {
        const response = await fetch('http://127.0.0.1:8000/api/options', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': storedToken,
            },
        });
        console.log(response);
        const data = await response.json();
        console.log(data)
        this.categorias = data; // Assumindo que a resposta é um array de objetos com a propriedade "nome"
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}