const pool = require('../config/database');

const IUserRepository = require('./interfaces/user.repository.interface');
const UserMapper = require('../mappers/user.mapper')


class UserRepository extends IUserRepository {

    async findByUserName(userName) {

        const query = `
            SELECT
            u.id_usuario idusuario,
            u.user_name username,
            u.password password,
            u.id_pessoa idpessoa,
            p.nome_pessoa nomepessoa,
            p.usuario_ativo usuarioativo,
            tp.codigo_tipo_pessoa codigotipopessoa,
            tp.descricao_tipo_pessoa descricaotipopessoa
            FROM usuario u
            INNER JOIN pessoa p
            ON p.id_pessoa = u.id_pessoa
            INNER JOIN tipo_pessoa tp
            ON tp.id_tipo_pessoa = p.id_tipo_pessoa
            WHERE u.user_name = $1
        `;


        const result = await pool.query(
            query,
            [userName]
        );

        return result? UserMapper.toModel(result.rows[0]) : null;

    }
}


module.exports = UserRepository;