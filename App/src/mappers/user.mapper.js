const User = require('../dtos/user/user.dto');

class UserMapper {

    static toModel(row) {

        if (!row) return null;

        return new User({

            idUsuario: row.idusuario,
            userName: row.username,
            password: row.password,
            idPessoa: row.idpessoa,
            nomePessoa: row.nomepessoa,
            usuarioAtivo: row.usuarioativo,
            codigoTipoPessoa: row.codigotipopessoa,
            descricaoTipoPessoa: row.descricaotipopessoa

        });
    }
}

module.exports = UserMapper;