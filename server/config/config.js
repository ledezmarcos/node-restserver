//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Entorno
let urlBD;

//Vencimiento del Token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticacion
process.env.SEED = process.env.SEED || 'secret';

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = process.env.mongo_uri;
}

process.env.urlBD = urlBD;