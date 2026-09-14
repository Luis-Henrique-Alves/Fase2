const {
    services
} = require('../config/container');

const {
    postService
} = services;

class PostController {

     async listar(req, res, next) {
        try {
             const page = parseInt(req.query.page) || 1;
             const limit = parseInt(req.query.limit) || 10; 

            const result = await postService.listar(page, limit);   

             return res.status(200).json({
              success: true,
             ...result,
             });
            } 
        catch (error) {
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
        const { text, page = 1, limit = 10 } = req.query;

        const result = await postService.search(text, Number(page), Number(limit));

        return res.status(200).json({
        success: true,
        data: result.data,
        total: result.total
        });
     } 
        catch (error) {
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

    async adicionarComentario(req, res, next) {
        try {
            const { id } = req.params; // id do post
            const { conteudo, idUsuario } = req.body;

            const comentario = await postService.adicionarComentario(id, conteudo, idUsuario);

            return res.status(201).json({
            success: true,
            data: comentario
         });
        } catch (error) {
            next(error);
            }
        }
async atualizarComentario(req, res, next) {
    try {
      const { idComentario } = req.params;
      const { conteudo } = req.body;

      const comentario = await postService.atualizarComentario(idComentario, conteudo);

      return res.status(200).json({
        success: true,
        data: comentario
      });
    } catch (error) {
      next(error);
    }
  }

  async removerComentario(req, res, next) {
    try {
      const { idComentario } = req.params;

      await postService.removerComentario(idComentario);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}



module.exports = new PostController();