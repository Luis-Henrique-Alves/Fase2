const PostService = require('../../services/post.service');


describe('PostService', () => {


    let postService;
    let postRepositoryMock;
    let pessoaRepositoryMock;

    beforeEach(() => {


        postRepositoryMock = {
            listar: jest.fn(),
            buscarPorId: jest.fn(),
            search: jest.fn(),
            criar: jest.fn(),
            atualizar: jest.fn(),
            remover: jest.fn()
        };

        pessoaRepositoryMock = {
            buscarPorId: jest.fn()

        };

        postService = new PostService(
            postRepositoryMock,
            pessoaRepositoryMock

        );

    });

    describe('criar', () => {



        it('deve permitir que professores criem posts', async () => {
            pessoaRepositoryMock.buscarPorId
                .mockResolvedValue({
                    id_pessoa: 1,
                    codigo_tipo_pessoa: 'P'
                });

            const post = {
                titulo: 'Meu primeiro post',
                conteudo: 'Conteúdo do meu primeiro post',
                criadoPor: 1
            };

            postRepositoryMock.criar
                .mockResolvedValue({
                    idPost: 10,
                    ...post
                });

            const resultado =
                await postService.criar(post);

            expect(resultado)
                .toEqual({

                    idPost: 10,

                    ...post

                });
            expect(
                pessoaRepositoryMock.buscarPorId
            )
            .toHaveBeenCalledWith(1);
            expect(
                postRepositoryMock.criar
            )
            .toHaveBeenCalledWith(post);

        });


        it('não deve permitir que alunos criem posts', async () => {
            pessoaRepositoryMock.buscarPorId
                .mockResolvedValue({
                    id_pessoa: 2,
                    codigo_tipo_pessoa: 'A'
                });

            const post = {
                titulo: 'Post bloqueado',
                conteudo: 'Aluno tentando criar post',
                criadoPor: 2
            };

            await expect(
                postService.criar(post)
            )
            .rejects
            .toMatchObject({
                message:
                    'Apenas professores podem criar posts. :)',
                statusCode: 403
            });

            expect(
                postRepositoryMock.criar
            )
            .not
            .toHaveBeenCalled();

        });

        it('deve retornar erro quando usuário não existe', async () => {
            pessoaRepositoryMock.buscarPorId
                .mockResolvedValue(null);

            const post = {
                titulo: 'Teste',
                conteudo: 'Teste de usuário inexistente',
                criadoPor: 999
            };

            await expect(
                postService.criar(post)

            )
            .rejects
            .toMatchObject({
                message:
                    'Usuário não encontrado',

                statusCode: 404

            });

            expect(
                postRepositoryMock.criar
            )
            .not
            .toHaveBeenCalled();

        });

    });

    describe('buscarPorId', () => {



        it('deve retornar um post existente', async () => {
            const post = {
                idPost: 1,
                titulo: 'Post teste'
            };

            postRepositoryMock.buscarPorId
                .mockResolvedValue(post);

            const resultado =
                await postService.buscarPorId(1);

            expect(resultado)
                .toEqual(post);

            expect(
                postRepositoryMock.buscarPorId
            )
            .toHaveBeenCalledWith(1);

        });

        it('deve retornar erro quando post não existe', async () => {

            postRepositoryMock.buscarPorId
                .mockResolvedValue(null);

            await expect(

                postService.buscarPorId(999)
            )
            .rejects
            .toMatchObject({
                message:
                    'Post não encontrado',


                statusCode: 404
            });
        });
    });

    describe('listar', () => {
        it('deve listar posts', async () => {
            const posts = [

                {
                    idPost: 1,
                    titulo: 'Post 1'
                },

                {
                    idPost: 2,
                    titulo: 'Post 2'
                }
            ];

            postRepositoryMock.listar
                .mockResolvedValue(posts);

            const resultado =
                await postService.listar();

            expect(resultado)
                .toEqual(posts);

            expect(
                postRepositoryMock.listar
            )
            .toHaveBeenCalled();
        });
    });

    describe('search', () => {
        it('deve pesquisar posts', async () => {
            const posts = [
                {
                    idPost: 1,
                    titulo: 'Node JS'
                }

            ];

            postRepositoryMock.search
                .mockResolvedValue(posts);

            const resultado =
                await postService.search(
                    'node'
                );

            expect(resultado)
                .toEqual(posts);

            expect(
                postRepositoryMock.search
            )
            .toHaveBeenCalledWith(
                'node'
            );

        });

    });

    describe('atualizar', () => {
        it('deve atualizar um post existente', async () => {
            postRepositoryMock.buscarPorId
                .mockResolvedValue({
                    idPost: 1
                });

            const dadosAtualizados = {
                titulo: 'Novo título',
                conteudo: 'Novo conteúdo'
            };

            postRepositoryMock.atualizar
                .mockResolvedValue({
                    idPost: 1,
                    ...dadosAtualizados

                });

            const resultado =
                await postService.atualizar(
                    1,
                    dadosAtualizados

                );

            expect(resultado)
                .toEqual({
                    idPost: 1,
                    ...dadosAtualizados

                });

            expect(
                postRepositoryMock.atualizar
            )
            .toHaveBeenCalledWith(
                1,
                dadosAtualizados
            );

        });

        it('não deve atualizar post inexistente', async () => {
            postRepositoryMock.buscarPorId
                .mockResolvedValue(null);
            await expect(
                postService.atualizar(
                    99,
                    {}

                )

            )
            .rejects
            .toMatchObject({
                message:
                    'Post não encontrado',


                statusCode: 404
            });

        });

    });

    describe('remover', () => {
        it('deve remover um post existente', async () => {
            postRepositoryMock.buscarPorId
                .mockResolvedValue({

                    idPost: 1

                });

            postRepositoryMock.remover
                .mockResolvedValue({

                    idPost: 1
                });

            const resultado =
                await postService.remover(1);

            expect(resultado)
                .toEqual({

                    idPost: 1

                });



            expect(
                postRepositoryMock.remover
            )
            .toHaveBeenCalledWith(1);

        });

        it('não deve remover post inexistente', async () => {

            postRepositoryMock.buscarPorId
                .mockResolvedValue(null);

            await expect(
                postService.remover(99)

            )
            .rejects
            .toMatchObject({
                message:
                    'Post não encontrado',


                statusCode: 404


            });

        });

    });

});