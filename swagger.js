const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users and Cars List API',
        description: 'API for accessing users and cars informations',
    },
    host: 'cse341-project2-f8lg.onrender.com/api-docs/',
    schemes: ['https'],
    tags: [
    { name: 'Users', description: 'Manipulate informations of the users' },
    { name: 'Cars', description: 'Modify informations of the cars' },]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
