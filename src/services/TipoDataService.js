import http from '../http-commons'

class TipoDataService {
    async buscarTodos(){
        let resposta = await http.get('/tipos');
        return resposta.data;
    }

    async buscarPeloId(id){
        let resposta = await http.get('/tipos/${id}');
        return resposta.data;
    }

    async buscarPeloNome(nome){
        let resposta = await http.get('/tipos?termo=${nome}');
        return resposta.data;
    }

        async criar(tipos){
        let resposta = await http.post('/tipos', tipos)
        return resposta.data;
    }

    async atualizar(id, tipos){
        let resposta = await http.put('/tipos/${id}', tipos);
        return resposta.data;
    }

    async remover(id){
        await http.delete('/tipos/${id}');
    }

    async removerPeloNome(nome){
        await http.delete('/tipos?termo=${nome}');
    }
}

export default new TipoDataService();