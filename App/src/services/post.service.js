const IPostService = require('./interfaces/post.service.interface');

const {
    AppError
} = require('../middlewares/error-handler');


class PostService extends IPostService {


    constructor(
        postRepository,
        pessoaRepository
    ) {

        super();

        this.postRepository = postRepository;
        this.pessoaRepository = pessoaRepository;

    }

    async listar() {

        return await this.postRepository.listar();

    }

    async buscarPorId(idPost) {

        const post = await this.postRepository.buscarPorId(
            idPost
        );


        if (!post) {

            throw new AppError(
                'Post não encontrado',
                404
            );

        }


        return post;

    }

    async search(texto) {

        return await this.postRepository.search(
            texto.trim()
        );

    }

    async criar(post) {
        const pessoa =
            await this.pessoaRepository.buscarPorId(
                post.criadoPor
            );

        if (!pessoa) {

            throw new AppError(
                'Usuário não encontrado',
                404
            );

        }

        if (pessoa.codigo !== 'P') {

            throw new AppError(
                'Apenas professores podem criar posts. :)',
                403
            );

        }

        return await this.postRepository.criar(
            post
        );

    }

    async atualizar(
        idPost,
        post
    ) {


        const postExistente =
            await this.postRepository.buscarPorId(
                idPost
            );

        if (!postExistente) {

            throw new AppError(
                'Post não encontrado',
                404
            );

        }

        return await this.postRepository.atualizar(
            idPost,
            post
        );

    }

    async remover(idPost) {
        const postExistente =
            await this.postRepository.buscarPorId(
                idPost
            );

        if (!postExistente) {

            throw new AppError(
                'Post não encontrado',
                404
            );

        }

        return await this.postRepository.remover(
            idPost
        );

    }

}


module.exports = PostService;