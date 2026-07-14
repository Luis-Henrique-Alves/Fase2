const validate = require('../middlewares/validate.middleware');

const express = require('express');

const router = express.Router();

const postController = require('../controllers/post.controller');

const {
    createPostSchema,
    updatePostSchema
} = require('../schemas/post.schema');

router.get(
    '/',
    postController.listar
);

router.get(

    '/search',
    postController.search
);

router.get(
    '/:id',
    postController.buscarPorId
);

router.post(
    '/',
    validate(createPostSchema),
    postController.criar
);

router.put(
    '/:id',
    validate(createPostSchema),
    postController.atualizar
);

router.delete(
    '/:id',
    postController.remover
);

module.exports = router;