const pool = require('../config/database');

const IPostRepository = require('./interfaces/post.repository.interface');

const PostMapper = require('../mappers/post.mapper');



class PostRepository extends IPostRepository {

    async listar() {


        const query = `
            SELECT
                pt.id_post,
                pt.titulo,
                pt.conteudo,
                pt.criado_por,
                p.nome_pessoa AS nome_criador,
                pt.data_criacao,
                pt.is_deleted
            FROM post pt
            INNER JOIN pessoa p
            ON p.id_pessoa = pt.criado_por
            WHERE pt.is_deleted = FALSE
            ORDER BY pt.data_criacao DESC;
        `;

        const result = await pool.query(query);


        return result.rows.map(
            PostMapper.toModel
        );

    }


    async buscarPorId(idPost) {


        const query = `
            SELECT
                pt.id_post,
                pt.titulo,
                pt.conteudo,
                pt.criado_por,
                p.nome_pessoa AS nome_criador,
                pt.data_criacao,
                pt.is_deleted
            FROM post pt
            INNER JOIN pessoa p
            ON p.id_pessoa = pt.criado_por
            WHERE pt.id_post = $1
            AND pt.is_deleted = FALSE;
        `;

        const result = await pool.query(
            query,
            [idPost]
        );


        return PostMapper.toModel(
            result.rows[0]
        );

    }

    async criar(post) {


        const query = `
            INSERT INTO post
            (
                titulo,
                conteudo,
                criado_por
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            RETURNING *;
        `;



        const values = [

            post.titulo,
            post.conteudo,
            post.criadoPor

        ];

        const result = await pool.query(
            query,
            values
        );

        return PostMapper.toModel(
            result.rows[0]
        );

    }

    async atualizar(
        idPost,
        post
    ) {
        const query = `
            UPDATE post
            SET
                titulo = $1,
                conteudo = $2
            WHERE id_post = $3
            RETURNING *;
        `;

        const result = await pool.query(
            query,
            [
                post.titulo,
                post.conteudo,
                idPost
            ]
        );

        return PostMapper.toModel(
            result.rows[0]
        );

    }

    async remover(idPost) {
        const query = `
            UPDATE post
            SET
                is_deleted = TRUE
            WHERE id_post = $1
            RETURNING *;
        `;

        const result = await pool.query(
            query,
            [idPost]
        );

        return PostMapper.toModel(
            result.rows[0]
        );

    }

    async search(text) {
        const query = `
            SELECT
                pt.id_post,
                pt.titulo,
                pt.conteudo,
                pt.criado_por,
                p.nome_pessoa AS nome_criador,
                pt.data_criacao,
                pt.is_deleted
            FROM post pt
            INNER JOIN pessoa p
            ON p.id_pessoa = pt.criado_por
            WHERE pt.is_deleted = FALSE
            AND
            (
                pt.titulo ILIKE $1
                OR
                pt.conteudo ILIKE $1
            )
            ORDER BY pt.data_criacao DESC;
        `;

        const result = await pool.query(
            query,
            [`%${text}%`]
        );

        return result.rows.map(
            PostMapper.toModel
        );

    }

}

module.exports = PostRepository;