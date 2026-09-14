class PostListDTO {
  constructor({ idPost, titulo, autor, descricao, dataCriacao }) {
    this.idPost = idPost;
    this.titulo = titulo;
    this.autor = autor;
    this.descricao = descricao;
    this.dataCriacao = dataCriacao;
  }
}

module.exports = PostListDTO;
