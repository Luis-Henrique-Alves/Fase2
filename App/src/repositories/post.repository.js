const pool = require('../config/database');

const IPostRepository = require('./interfaces/post.repository.interface');

const PostMapper = require('../mappers/post.mapper');



class PostRepository extends IPostRepository {
   async listar(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const query = `
      SELECT
        pt.id_post,
        pt.titulo,
        pt.conteudo,
        p.nome_pessoa AS nome_criador,
        pt.data_criacao,
        pt.data_ultima_alteracao
      FROM post pt
      INNER JOIN pessoa p
        ON p.id_pessoa = pt.criado_por
      WHERE pt.is_deleted = FALSE
      ORDER BY pt.data_criacao DESC
      LIMIT $1 OFFSET $2;
    `;

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM post pt
      WHERE pt.is_deleted = FALSE;
    `;

    const result = await pool.query(query, [limit, offset]);
    const countResult = await pool.query(countQuery);

    return {
      posts: result.rows,
      total: Number(countResult.rows[0].total),
    };
  }

    async buscarPorId(idPost) {


        const query = `
          SELECT
    pt.id_post,
    pt.titulo,
    pt.conteudo,
    u.id_usuario as criado_por,
    p.id_pessoa,
    p.nome_pessoa AS nome_criador,
    pt.data_criacao,
    pt.is_deleted
FROM post pt
INNER JOIN usuario u ON u.id_usuario = pt.criado_por
INNER JOIN pessoa p ON p.id_pessoa = u.id_pessoa
WHERE pt.id_post = $1 AND 
pt.is_deleted = FALSE;
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

    async search(text, page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const query = `
        SELECT
        pt.id_post AS "idPost",
        pt.titulo,
        pt.conteudo AS "descricao",
        p.nome_pessoa AS "autor",
        pt.data_criacao AS "dataCriacao"
        FROM post pt
        INNER JOIN pessoa p
        ON p.id_pessoa = pt.criado_por
        WHERE pt.is_deleted = FALSE
        AND (pt.titulo ILIKE $1 OR pt.conteudo ILIKE $1)
        ORDER BY pt.data_criacao DESC
        LIMIT $2 OFFSET $3;
         `;

        const countQuery = `
        SELECT COUNT(*) AS total
        FROM post pt
        WHERE pt.is_deleted = FALSE
        AND (pt.titulo ILIKE $1 OR pt.conteudo ILIKE $1);
    `;

    const result = await pool.query(query, [`%${text}%`, limit, offset]);
    const countResult = await pool.query(countQuery, [`%${text}%`]);

    return {
    data: result.rows,
    total: Number(countResult.rows[0].total),
    };
}

 async atualizarComentario(idComentario, conteudo) {
    const comentarioExistente = await this.comentarioRepository.buscarPorId(idComentario);
    if (!comentarioExistente) {
      throw new AppError("Comentário não encontrado", 404);
    }
    return await this.comentarioRepository.atualizarComentario(idComentario, conteudo);
  }

  async removerComentario(idComentario) {
    const comentarioExistente = await this.comentarioRepository.buscarPorId(idComentario);
    if (!comentarioExistente) {
      throw new AppError("Comentário não encontrado", 404);
    }
    return await this.comentarioRepository.removerComentario(idComentario);
  }

}

module.exports = PostRepository;