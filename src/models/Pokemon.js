export default class Pokemon {
    constructor() {
        this.id = null;

        this.nome = null;
        this.altura = null;
        this.peso = null;
        this.genero = null;
        this.nivel = null;
        this.numeroPokedex = null;
        this.felicidade = 0;
        this.tiposId = null;
        this.ataquesId = null;
    }

    populate(obj) {
        this.id = obj.id;

        this.nome = obj.nome;
        this.altura = obj.altura;
        this.peso = obj.peso;
        this.genero = obj.genero;
        this.nivel = obj.nivel;
        this.numeroPokedex = obj.numeroPokedex;
        this.felicidade = obj.felicidade;
        this.tiposId = obj.tiposId;
        this.ataquesId = obj.ataquesId;
    }

    toJson() {
        return {
            id: this.id,

            nome: this.nome,
            altura: this.altura,
            peso: this.peso,
            genero: this.genero,
            nivel: this.nivel,
            numeroPokedex: this.numeroPokedex,
            felicidade: this.felicidade,
            tiposId: this.tiposId,
            ataquesId: this.ataquesId,
        }
    }
}