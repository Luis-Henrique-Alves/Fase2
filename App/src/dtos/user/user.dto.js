class User {
    constructor({
        idUsuario,
        userName,
        password,
        idPessoa,
        nomePessoa,
        usuarioAtivo,
        codigoTipoPessoa,
        descricaoTipoPessoa
    }) {
        this.idUsuario = idUsuario;
        this.userName = userName;
        this.password = password;
        this.idPessoa = idPessoa;
        this.nomePessoa = nomePessoa;
        this.usuarioAtivo = usuarioAtivo;
        this.codigoTipoPessoa = codigoTipoPessoa;
        this.descricaoTipoPessoa = descricaoTipoPessoa;
    }
}

module.exports = User;