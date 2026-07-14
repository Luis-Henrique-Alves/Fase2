const Pessoa = require('../models/pessoa.model');

class PessoaMapper {

    static toModel(row) {

        if (!row) return null;

        return new Pessoa({

            idPessoa: row.id_pessoa,
            nomePessoa: row.nome_pessoa,
            dataNascimento: row.data_nascimento,
            idTipoPessoa: row.id_tipo_pessoa,
            usuarioAtivo: row.usuario_ativo,
            dataCriacao: row.data_criacao

        });

    }

}

module.exports = PessoaMapper;