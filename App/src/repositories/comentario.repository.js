const pool = require("../config/database");
const Comentario = require("../models/comentario.model");

class ComentarioRepository {
  async adicionarComentario({ conteudo, idUsuario, idPost }) {
  const query = `
    INSERT INTO comentario (conteudo, id_usuario, id_post)
    VALUES ($1, $2, $3)
    RETURNING id_comentario AS "idComentario",
              conteudo,
              id_usuario AS "idUsuario",
              id_post AS "idPost",
              data_criacao AS "dataCriacao",
              is_deleted AS "isDeleted";
  `;

  const result = await pool.query(query, [conteudo, idUsuario, idPost]);
  const idComentario = result.rows[0].idComentario;

  const joinQuery = `
    SELECT 
      c.id_comentario AS "idComentario",
      c.conteudo,
      c.data_criacao AS "dataCriacao",
      c.is_deleted AS "isDeleted",
      u.id_usuario AS "idUsuario",
      u.user_name AS "userName",
      p.nome_pessoa AS "criadoPor"
    FROM comentario c
    JOIN usuario u ON c.id_usuario = u.id_usuario
    JOIN pessoa p ON u.id_pessoa = p.id_pessoa
    WHERE c.id_comentario = $1;
  `;

  const joinResult = await pool.query(joinQuery, [idComentario]);
  return new Comentario(joinResult.rows[0]);
}


  async buscarPorPost(idPost) {
    const query = `
     SELECT 
     c.id_comentario AS "idComentario",
     c.conteudo,
     c.data_criacao AS "dataCriacao",
      c.is_deleted AS "isDeleted",
      u.id_usuario AS "idUsuario",
      u.user_name AS "userName",
      p.nome_pessoa AS "criadoPor"
     FROM comentario c
     JOIN usuario u ON c.id_usuario = u.id_usuario
     JOIN pessoa p ON u.id_pessoa = p.id_pessoa
     WHERE c.id_post = $1
     ORDER BY c.data_criacao DESC;
    `;

    const result = await pool.query(query, [idPost]);
    return result.rows.map(row => new Comentario(row));
  }

  async atualizarComentario(idComentario, conteudo) {
    const query = `
      UPDATE comentario
      SET conteudo = $1,
          data_ultima_alteracao = NOW()
      WHERE id_comentario = $2
      RETURNING id_comentario AS "idComentario",
                conteudo,
                data_criacao AS "dataCriacao",
                is_deleted AS "isDeleted",
                id_usuario AS "idUsuario",
                id_post AS "idPost";
    `;
    const result = await pool.query(query, [conteudo, idComentario]);
    return result.rows[0];
  }

  async removerComentario(idComentario) {
    const query = `
      UPDATE comentario
      SET is_deleted = TRUE
      WHERE id_comentario = $1
      RETURNING id_comentario AS "idComentario";
    `;
    const result = await pool.query(query, [idComentario]);
    return result.rows[0];
  }

  async buscarPorId(idComentario) {
  const query = `
    SELECT * FROM comentario WHERE id_comentario = $1;
  `;
  const result = await pool.query(query, [idComentario]);
  return result.rows[0];
}
}

module.exports = ComentarioRepository;
