class Api {
    constructor() {
        this.API_KEY = 'AIzaSyDaPNDsoNdsWalba6k2jkDgN-GFlEPEgVE';
    }

    async getBooks(value) {
        const data = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${value}&key=${this.API_KEY}`);
        return data.json();
    }
}

const api = new Api();
export default api;