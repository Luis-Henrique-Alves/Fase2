class AppError extends Error {

    constructor(
        message,
        statusCode = 500
    ) {

        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;

    }

}


function errorHandler(
    err,
    req,
    res,
    next
) {

    console.error(err);


    if (err.isOperational) {

        return res.status(err.statusCode)
            .json({

                success: false,
                message: err.message

            });

    }


    return res.status(500)
        .json({

            success: false,
            message: 'Erro interno do servidor'

        });

}

module.exports = {
    errorHandler,
    AppError
};