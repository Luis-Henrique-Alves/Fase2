class Comentario {
  constructor({
    idComentario = null,
    conteudo,
    idUsuario,
    idPost,
    dataCriacao = null,
    isDeleted = false,
    criadoPor
  }) {
    this.idComentario = idComentario;
    this.conteudo = conteudo;
    this.idUsuario = idUsuario;
    this.idPost = idPost;
    this.dataCriacao = dataCriacao;
    this.isDeleted = isDeleted;
    this.criadoPor = criadoPor;
  }
}

module.exports = Comentario;
