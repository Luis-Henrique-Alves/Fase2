const PostRepository = require('../repositories/post.repository');
const PessoaRepository = require('../repositories/pessoa.repository');
const UserRepository = require('../repositories/user.repository');
const ComentarioRepository = require('../repositories/comentario.repository');

const PostService = require('../services/post.service');
const AuthService = require('../services/auth.service');

const postRepository = new PostRepository();
const pessoaRepository = new PessoaRepository();
const userRepository = new UserRepository();
const comentarioRepository = new ComentarioRepository();

const postService = new PostService(
    postRepository,
    pessoaRepository,
    comentarioRepository 
);

const authService = new AuthService(
    userRepository
);

module.exports = {
    repositories: {
        postRepository,
        pessoaRepository,
        userRepository,
        comentarioRepository 
    },
    services: {
        postService,
        authService
    }
};
