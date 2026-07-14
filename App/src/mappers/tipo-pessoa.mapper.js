const TipoPessoa = require('../models/tipo-pessoa.model');

class TipoPessoaMapper {

    static toModel(row) {

        if (!row) return null;

        return new TipoPessoa({

            idTipoPessoa: row.id_tipo_pessoa,
            codigoTipoPessoa: row.codigo_tipo_pessoa,
            descricaoTipoPessoa: row.descricao_tipo_pessoa

        });
    }
}

module.exports = TipoPessoaMapper;