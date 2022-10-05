import http from '../http-commons'

class PokemonDataService {
    async criar(pokemon) {
        let resposta = await http.post('/pokemons', pokemon);
        return resposta.data;
    }

    async atualizar(id, pokemon) {
        let resposta = await http.put('/pokemons/' + id, pokemon);
        return resposta.data;
    }

    async buscarTodos() {
        let resposta = await http.get('/pokemons');
        return resposta.data;
    }

    async buscarPeloId(id) {
        let resposta = await http.get('/pokemons/' + id);
        return resposta.data;
    }

    async buscarPeloNome(nome) {
        let resposta = await http.get('/pokemons?termo=' + nome);
        return resposta.data;
    }

    async buscarPeloIdDoTipo(id) {
        let resposta = await http.get('/pokemons/tipo/' + id);
        return resposta.data;
    }

    async remover(remover) {
        await http.delete('/pokemons?termo=' + nome);
    }

    async remover(id) {
        await http.delete('/pokemons/' + id);
    }
}

export default new PokemonDataService();