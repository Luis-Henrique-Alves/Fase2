class IComentarioRepository {

    async adicionarComentario({ conteudo, idUsuario, idPost }) {

        throw new Error(
            'Método adicionarComentario deve ser implementado'
        );

    }

        async buscarPorPost(idPost ) {

        throw new Error(
            'Método buscarPorPost deve ser implementado'
        );

    }

}

module.exports = IComentarioRepository;