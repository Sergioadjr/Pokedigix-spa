import http from '../http-commons'

class PokemonDataService {
    async criar(pokemon) {
        let resposta = await hhtp.post('/pokemons', pokemon);
        return resposta.data;
    }

    async atualizar(id, pokemon) {
        let resposta = await hhtp.put('/pokemons/${id}', pokemon);
        return resposta.data;
    }

    async buscarTodos() {
        let resposta = await http.get('/pokemons');
        return resposta.data;
    }

    async buscarPeloId(id) {
        let resposta = await hhtp.get('/pokemons/${id}');
        return resposta.data;
    }

    async buscarPeloNome(nome) {
        let resposta = await hhtp.get('/pokemons?termo=${nome}');
        return resposta.data;
    }

    async buscarPeloIdDoTipo(id) {
        let resposta = await hhtp.get('/pokemons/tipo/${id}');
        return resposta.data;
    }

    async remover(remover) {
        await hhtp.delete('/pokemons?termo=${nome}');
    }

    async remover(id) {
        await hhtp.delete('/pokemons/${id}');
    }
}

export default new PokemonDataService();