const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {

    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear la orden',
                    error: err
                });
            }

            for (const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {
                        return res.status(501).json({
                            success: false,
                            message: 'Error al crear los productos en la orden',
                            error: err
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: `Orden creada correctamente`,
                data: `${id}`
            });

        });
    },

    async findByStatus(req, res) {
        const status = req.params.status;

        Order.findByStatus(status, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.products = JSON.parse(d.products);
                d.delivery = JSON.parse(d.delivery);
            }

            return res.status(201).json(data);
        });
    },

    async findByDeliveryAndStatus(req, res) {
        const id_delivery = req.params.id_delivery;
        const status = req.params.status;

        Order.findByDeliveryAndStatus(id_delivery, status, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al listar las ordenes',
                    error: err
                });
            }

            for (const d of data) {
                d.address = JSON.parse(d.address);
                d.client = JSON.parse(d.client);
                d.products = JSON.parse(d.products);
                d.delivery = JSON.parse(d.delivery);
            }

            return res.status(201).json(data);
        });
    },

    async updateToDispatched(req, res) {

        const order = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Order.updateToDispatched(order.id, order.id_delivery, (err, id_order) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Orden actualizada correctamente`,
                data: `${id_order}`
            });

        });
    },

    async updateToOnTheWay(req, res) {

        const order = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Order.updateToOnTheWay(order.id, order.id_delivery, (err, id_order) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Orden actualizada correctamente`,
                data: `${id_order}`
            });

        });
    },

    async updateToDelivered(req, res) {

        const order = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Order.updateToDelivered(order.id, order.id_delivery, (err, id_order) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar la orden',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Orden actualizada correctamente`,
                data: `${id_order}`
            });

        });
    },

    // async delete(req, res) {
    //     const id = req.params.id;
    //     Order.delete(id, (err, data) =>{
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