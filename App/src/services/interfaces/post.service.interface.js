class IPostService {
    async listar() {
        throw new Error(
            'Método listar não implementado'
        );
    }

    async buscarPorId(idPost) {
        throw new Error(
            'Método buscarPorId não implementado'
        );
    }

    async search(termo) {
        throw new Error(
            'Método search não implementado'
        );

    }

    async criar(post) {
        throw new Error(
            'Método criar não implementado'
        );

    }

    async atualizar(idPost, post) {

        throw new Error(
            'Método atualizar não implementado'
        );
    }

    async remover(idPost) {
        throw new Error(
            'Método remover não implementado'
        );

    }

}

module.exports = IPostService;