class IPostRepository {

    listar() {
        throw new Error(
            'Método listar deve ser implementado'
        );
    }

    buscarPorId(idPost) {
        throw new Error(
            'Método buscarPorId deve ser implementado'
        );
    }

    search(termo) {
        throw new Error(
            'Método search deve ser implementado'
        );
    }

    criar(post) {
        throw new Error(
            'Método criar deve ser implementado'
        );
    }

    atualizar(idPost, post) {
        throw new Error(
            'Método atualizar deve ser implementado'
        );
    }


    remover(idPost) {
        throw new Error(
            'Método remover deve ser implementado'
        );
    }
}

module.exports = IPostRepository;