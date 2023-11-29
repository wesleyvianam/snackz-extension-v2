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

                    const token = data.token.plainTextToken;

                    console.log(token)

                    sessionStorage.setItem('token', token);

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