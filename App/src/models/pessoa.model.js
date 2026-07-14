class Pessoa {
    constructor({
        idPessoa = null,
        nomePessoa,
        dataNascimento,
        idTipoPessoa,
        usuarioAtivo = true,
        dataCriacao = null
    }) {
        this.idPessoa = idPessoa;
        this.nomePessoa = nomePessoa;
        this.dataNascimento = dataNascimento;
        this.idTipoPessoa = idTipoPessoa;
        this.usuarioAtivo = usuarioAtivo;
        this.dataCriacao = dataCriacao;
    }
}

module.exports = Pessoa;