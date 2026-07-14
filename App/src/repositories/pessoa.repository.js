const pool = require('../config/database');

const IPessoaRepository = require('./interfaces/pessoa.repository.interface');


class PessoaRepository extends IPessoaRepository {


    async buscarPorId(idPessoa) {

        const query = `
            SELECT
                p.id_pessoa,
                p.nome_pessoa,
                p.id_tipo_pessoa,
                tp.codigo_tipo_pessoa
            FROM pessoa p
            INNER JOIN tipo_pessoa tp
            ON tp.id_tipo_pessoa = p.id_tipo_pessoa
            WHERE p.id_pessoa = $1;
        `;


        const result = await pool.query(
            query,
            [idPessoa]
        );


        return result.rows[0] || null;

    }


}


module.exports = PessoaRepository;