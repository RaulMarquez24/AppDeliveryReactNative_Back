const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

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
                    const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});
                
                    const data = {
                        id: myUser.id,
                        name: myUser.name,
                        lastname: myUser.lastname,
                        email: myUser.email,
                        phone: myUser.phone,
                        image: myUser.image,
                        session_token: `JWT ${token}`
                    }

                    return res.status(201).json({
                        success: true,
                        message: `El usuario fue autenticado`,
                        data: data
                    });
                }else {
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
    }

}