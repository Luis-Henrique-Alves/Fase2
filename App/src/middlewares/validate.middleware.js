function validate(schema) {

    return (req, res, next) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            return res.status(400).json({

                success: false,

                message: 'Erro de validação.',

                errors: result.error.issues.map(issue => ({

                    campo: issue.path.join('.'),
                    mensagem: issue.message

                }))

            });

        }

        req.body = result.data;

        next();

    };

}

module.exports = validate;