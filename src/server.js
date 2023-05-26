const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/formReto1', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión exitosa a la base de datos MongoDB');
    })
    .catch(error => {
        console.error('Error al conectar a la base de datos MongoDB:', error);
    });

// Definición del esquema y modelo de datos
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta para recibir los datos del formulario
app.post('/datos', (req, res) => {
    const { nombre, apellido, correo } = req.body;

    const nuevoUsuario = new Usuario({
        nombre,
        apellido,
        correo
    });

    nuevoUsuario.save()
        .then(() => {
            console.log('Datos guardados en la base de datos.');
            res.status(200).send('Datos guardados en la base de datos.');
        })
        .catch(error => {
            console.error('Error al guardar los datos en la base de datos:', error);
            res.status(500).send('Error al guardar los datos en la base de datos.');
        });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor Express escuchando en el puerto 3000');
});