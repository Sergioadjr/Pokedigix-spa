import http from '../http-commons';

class TreinadorDataService {
    async buscarPeloId(id) {
        let resposta = await http.get('/treinadores/' + id);
        return resposta.data;
    }

    async atualizar(id, treinador) {
        let resposta = await http.put('/treinadores/' + id, treinador);
        return resposta.data;
    }
    
    async remover(id) {
        await http.delete('/treinadores/' + id);
    }

    async criar(treinador) {
        let resposta = await http.post('/treinadores', treinador);
        return resposta.data;
    }


    async removerPeloNome(treinador) {
        await http.delete('/treinadores?termo=' + treinador);
    }

    async buscarPokemonsDoTreinador (id) {
        let resposta = await http.get('/treinadores/' + id + '/pokemons');
        return resposta.data;
    }
    
      async buscarTodos() { 
        let resposta = await http.get('/treinadores');
        return resposta.data;
    }
}
export default new TreinadorDataService();