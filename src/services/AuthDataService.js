import http from '../http-commons'

class AuthDataService {
    async criar(cadastro) {
        let resposta = await http.post('/singup', cadastro)
        return resposta.data;
    }
}

export default new AuthDataService();