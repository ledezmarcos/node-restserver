const express = require('express');
const Usuario = require('../modelos/usuario');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken, verificaAdmin } = require('../middlewares/autenticacion');

app.get('/usuario', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre email img role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });
            });



        })
});

app.post('/usuario', [verificaToken, verificaAdmin], function(req, res) {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', [verificaToken, verificaAdmin], function(req, res) {
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});


app.delete('/usuario/:id', [verificaToken, verificaAdmin], function(req, res) {
    let id = req.params.id;
    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No se encuentra el usuario'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    }); */
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            mensaje: 'usuario eliminado satisfactoriamente'
        });

    });
});

module.exports = app;