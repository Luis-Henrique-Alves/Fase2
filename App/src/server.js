require('dotenv').config();

const app = require('./app');

const database = require('./config/database');


const PORT = process.env.PORT || 3000;


database.connect()
.then(client => {

    console.log('Banco conectado');

    client.release();


    app.listen(PORT, () => {

        console.log(
            `API executando na porta ${PORT}`
        );

    });


})
.catch(error => {

    console.error(
        'Erro ao conectar no banco:',
        error
    );

});