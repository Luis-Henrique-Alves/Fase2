const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { errorHandler } = require('./middlewares/error-handler');

const pessoaRoutes = require('./routes/pessoas.routes');
const postRoutes = require('./routes/posts.routes');

const {
    swaggerUi,
    swaggerSpec
} = require('./config/swagger');


const app = express();


app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use('/api/pessoas', pessoaRoutes);

app.use('/api/posts', postRoutes);



app.use(errorHandler);



module.exports = app;