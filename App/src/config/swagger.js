const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');


const swaggerSpec = YAML.load(
    path.join(__dirname, '../docs/openapi.yaml')
);

module.exports = {
    swaggerUi,
    swaggerSpec
};