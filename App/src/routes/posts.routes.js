const validate = require('../middlewares/validate.middleware');
const express = require('express');
const { authMiddleware } = require('../middlewares/auth.middleware'); 
const postController = require('../controllers/post.controller');

const {
  createPostSchema,
  updatePostSchema
} = require('../schemas/post.schema');

const router = express.Router();

router.use(authMiddleware);

router.get('/search', postController.search);
router.get('/:id', postController.buscarPorId);

router.get('/', postController.listar);

router.post(
  '/',
  validate(createPostSchema),
  postController.criar
);

router.put(
  '/:id',
  validate(updatePostSchema),
  postController.atualizar
);

router.delete('/:id', postController.remover);

router.post('/:id/comentarios', postController.adicionarComentario);

router.put('/comentarios/:idComentario', postController.atualizarComentario);

router.delete('/comentarios/:idComentario', postController.removerComentario);

module.exports = router;
