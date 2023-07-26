const Address = require('../models/address');

module.exports = {

    async create(req, res) {

        const address = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Address.create(address, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear la direccion',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Direccion creada correctamente`,
                data: `${id}`
            });
            
        });
    },

    async findByUser(req, res) {
        const id_user = req.params.id_user;

        Address.findByUser(id_user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al obtener las direcciones',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

//     async update(req, res) {
        
//         const address = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

//         Address.update(address, (err, id) => {

//             if (err) {
//                 return res.status(501).json({
//                     success: false,
//                     message: 'Error al editar la categoria',
//                     error: err
//                 });
//             }

//             return res.status(201).json({
//                 success: true,
//                 message: `Categoria actualizada correctamente`,
//                 data: `${id}`
//             });
            
//         });
//     },

// async delete(req, res) {
//     const id = req.params.id;
//     Address.delete(id, (err, data) =>{
//         if (err) {
//             return res.status(501).json({
//                 success: false,
//                 message: 'Error al eliminar la categoria',
//                 error: err
//             });
//         }

//         return res.status(201).json({
//             success: true,
//             message: `Categoria eliminada correctamente`,
//             data: `${id}`
//         });
//     })
// }
}