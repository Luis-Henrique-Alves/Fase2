const PostRepository = require('../repositories/post.repository');
const PessoaRepository = require('../repositories/pessoa.repository');

const PostService = require('../services/post.service');

const postRepository = new PostRepository();
const pessoaRepository = new PessoaRepository()

const postService = new PostService(
    postRepository,
    pessoaRepository
);

module.exports = {
    repositories: {
        postRepository,
        pessoaRepository
    },
    services: {
        postService
    }

};