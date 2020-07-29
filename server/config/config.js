//Puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Entorno
let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb+srv://ledezmarcos:secreto123@cluster0.aolnh.mongodb.net/<dbname>?retryWrites=true&w=majority';
}

process.env.urlBD = urlBD;