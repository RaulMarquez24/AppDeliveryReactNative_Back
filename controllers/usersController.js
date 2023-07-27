const User = require('../models/user');
const Rol = require('../models/rol')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage')

module.exports = {

    findDeliveryMen(req, res) {
        User.findDeliveryMen((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al listar los repartidores',
                    error: err
                });
            }
            return res.status(201).json(data);
        });
    },

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            // console.log('USUARIO: ',myUser);
            // console.log('ERROR: ',err);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al logear el usuario',
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El usuario no fue encontrado',
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: JSON.parse(myUser.roles)
                }

                return res.status(201).json({
                    success: true,
                    message: `El usuario fue autenticado`,
                    data: data
                });
            } else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARA REALIZAR ESTA PETICION
                    success: false,
                    message: 'El password es incorrecto',
                });
            }
        }
        );
    },

    register(req, res) {
        const user = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al registrar usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Usuario creado correctamente`,
                data: data // EL ID DEL NUEVO USUARIO REGISTRADO
            });
        });
    },

    async registerWithImage(req, res) {
        const user = JSON.parse(req.body.user); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al registrar usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            Rol.create(user.id, 3, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error al registrar el rol de usuario',
                        error: err
                    });
                }

            });

            return res.status(201).json({
                success: true,
                message: `Usuario creado correctamente`,
                data: user
            });
        });
    },

    async updateWithImage(req, res) {
        const user = JSON.parse(req.body.user); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.update(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Usuario actualizado correctamente`,
                data: user
            });

        });
    },

    async updateWithoutImage(req, res) {
        const user = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        User.updateWithoutImage(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Usuario actualizado correctamente`,
                data: user
            });

        });
    },

}