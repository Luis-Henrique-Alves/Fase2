const {
    services
} = require('../config/container');

const {
    postService
} = services;

class PostController {

    async listar(req, res, next) {
        try {
            const posts = await postService.listar();

            return res.status(200).json({
                success: true,
                data: posts
            });

        } catch(error) {
            next(error);

        }
    }

    async buscarPorId(req, res, next) {
        try {
            const {
                id
            } = req.params;

            const post = await postService.buscarPorId(
                id
            );

            return res.status(200).json({

                success: true,
                data: post
            });

        } catch(error) {

            next(error);

        }

    }

    async search(req, res, next) {

        try {

            const {text} = req.query;

            const posts = await postService.search(
                text
            );

            return res.status(200).json({
                success: true,
                data: posts

            });

        } catch(error) {
            next(error);
        }

    }

    async criar(req, res, next) {

        try {
            const post = await postService.criar(
                req.body
            );

            return res.status(201).json({
                success: true,
                data: post

            });

        } catch(error) {

            next(error);
        }

    }

    async atualizar(req, res, next) {
        try {
            const {id} = req.params;

            const post = await postService.atualizar(
                id,
                req.body
            );

            return res.status(200).json({
                success: true,
                data: post

            });

        } catch(error) {
            next(error);

        }

    }

    async remover(req, res, next) {

        try {
            const {id} = req.params;

            await postService.remover(
                id
            );

            return res.status(204).send();

        } catch(error) {

            next(error);
        }
    }
}



module.exports = new PostController();