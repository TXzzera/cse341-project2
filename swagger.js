const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users and Cars List API',
        description: 'API for accessing users and cars informations',
    },
    host: 'localhost:8082',
    schemes: ['http'],
    tags: [
    { name: 'Users', description: 'Manipulate informations of the users' },
    { name: 'Cars', description: 'Modify informations of the cars' },]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
