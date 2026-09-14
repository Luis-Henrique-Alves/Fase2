const IPostService = require('./interfaces/post.service.interface');
const PostListDTO = require("../dtos/post/post-list.dto");
const { AppError } = require('../middlewares/error-handler');

class PostService extends IPostService {

    constructor(
        postRepository,
        pessoaRepository,
        comentarioRepository
    ) {
        super();
        this.postRepository = postRepository;
        this.pessoaRepository = pessoaRepository;
        this.comentarioRepository = comentarioRepository;
    }

    async listar(page = 1, limit = 10) {
        const { posts, total } = await this.postRepository.listar(page, limit);

        const dto = posts.map(
            (post) =>
                new PostListDTO({
                    idPost: post.id_post,
                    titulo: post.titulo,
                    autor: post.nome_criador,
                    descricao:
                        post.conteudo.length > 50
                            ? post.conteudo.substring(0, 50) + "..."
                            : post.conteudo,
                    dataCriacao: post.data_ultima_alteracao || post.data_criacao,
                })
        );

        return { data: dto, total };
    }

    async buscarPorId(idPost) {
        const post = await this.postRepository.buscarPorId(idPost);

        if (!post) {
            throw new AppError('Post não encontrado', 404);
        }

        const comentarios = await this.comentarioRepository.buscarPorPost(idPost);

        return { post, comentarios };
    }

    async search(texto) {
        return await this.postRepository.search(texto.trim());
    }

    async criar(post) {
        const pessoa = await this.pessoaRepository.buscarPorId(post.criadoPor);

        if (!pessoa) {
            throw new AppError('Usuário não encontrado', 404);
        }

        if (pessoa.codigo_tipo_pessoa !== 'P') {
            throw new AppError('Apenas professores podem criar posts. :)', 403);
        }

        return await this.postRepository.criar(post);
    }

    async atualizar(idPost, post) {
        const postExistente = await this.postRepository.buscarPorId(idPost);

        if (!postExistente) {
            throw new AppError('Post não encontrado', 404);
        }

        return await this.postRepository.atualizar(idPost, post);
    }

    async remover(idPost) {
        const postExistente = await this.postRepository.buscarPorId(idPost);

        if (!postExistente) {
            throw new AppError('Post não encontrado', 404);
        }

        return await this.postRepository.remover(idPost);
    }

    async adicionarComentario(idPost, conteudo, idUsuario) {
        const postExistente = await this.postRepository.buscarPorId(idPost);

        if (!postExistente) {
            throw new AppError('Post não encontrado', 404);
        }

        return await this.comentarioRepository.adicionarComentario({
            conteudo,
            idUsuario,
            idPost
        });
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

module.exports = PostService;
