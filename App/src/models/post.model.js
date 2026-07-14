class Post {

    constructor({
        idPost = null,
        titulo,
        conteudo,
        criadoPor,
        dataCriacao = null,
        isDeleted = false
    }) {

        this.idPost = idPost;
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.criadoPor = criadoPor;
        this.dataCriacao = dataCriacao;
        this.isDeleted = isDeleted;

    }

}

module.exports = Post;