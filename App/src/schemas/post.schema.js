const { z } = require('zod');


const createPostSchema = z.object({

    titulo: z
        .string({
            required_error: 'O título é obrigatório.'
        })
        .trim()
        .min(3, 'O título deve possuir no mínimo 3 caracteres.')
        .max(200, 'O título deve possuir no máximo 200 caracteres.'),


    conteudo: z
        .string({
            required_error: 'O conteúdo é obrigatório.'
        })
        .trim()
        .min(10, 'O conteúdo deve possuir no mínimo 10 caracteres.'),


    criadoPor: z
        .number({
            required_error: 'O campo criadoPor é obrigatório.',
            invalid_type_error: 'O campo criadoPor deve ser um número.'
        })
        .int('O campo criadoPor deve ser um número inteiro.')
        .positive('O campo criadoPor deve ser maior que zero.')

});


const updatePostSchema = z.object({

    titulo: z
        .string({
            required_error: 'O título é obrigatório.'
        })
        .trim()
        .min(3, 'O título deve possuir no mínimo 3 caracteres.')
        .max(200, 'O título deve possuir no máximo 200 caracteres.'),


    conteudo: z
        .string({
            required_error: 'O conteúdo é obrigatório.'
        })
        .trim()
        .min(10, 'O conteúdo deve possuir no mínimo 10 caracteres.')

});


module.exports = {

    createPostSchema,
    updatePostSchema

};