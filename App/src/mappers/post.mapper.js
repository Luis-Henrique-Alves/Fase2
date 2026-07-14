const Post = require('../models/post.model');


class PostMapper {


    static toModel(row) {


        if (!row) return null;

        return new Post({
            idPost:
                row.id_post,
            titulo:
                row.titulo,
            conteudo:
                row.conteudo,
            criadoPor:
                row.criado_por,
            dataCriacao:
                row.data_criacao,
            isDeleted:
                row.is_deletednp
        });

    }
}


module.exports = PostMapper;