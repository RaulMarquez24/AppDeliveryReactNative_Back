const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async create(req, res) {
        const product = JSON.parse(req.body.product); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el producto, no tiene imagenes',
            });
        } else {
            Product.create(product, (err, id_product) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error al registrar el producto',
                        error: err
                    });
                }

                product.id = id_product;
                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);
                        //HASTA AQUI BIEN
                        if (url != undefined && url != null) { //CREO LA IMAGEN EN FIREBASE

                            if (inserts == 0) { //IMAGEN1
                                product.image1 = url;
                            }else if (inserts == 1) { //IMAGEN2
                                product.image2 = url;
                            }else if (inserts == 2) { //IMAGEN3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Error al registrar el producto',
                                    error: err
                                });
                            }

                            inserts = inserts + 1;

                            if (inserts == files.length) { //TERMINO DE ALMACENAR LAS TRES IMAGENES
                                return res.status(201).json({
                                    success: true,
                                    message: `El producto se almaceno correctamente`,
                                    data: data
                                });
                            }

                        });
                    });
                }

                start();

            });
        }
    },

    async findByCategory(req, res) {
        const id_category = req.params.id_category;

        Product.findByCategory(id_category, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al listar los productos',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    async updateWithImage(req, res) {
        const product = JSON.parse(req.body.product); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar el producto, no tiene imagenes',
            });
        } else {
            Product.update(product, (err, id_product) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Error al actualizar el producto',
                        error: err
                    });
                }

                product.id = id_product;
                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);
                        //HASTA AQUI BIEN
                        if (url != undefined && url != null) { //CREO LA IMAGEN EN FIREBASE

                            if (inserts == 0) { //IMAGEN1
                                product.image1 = url;
                            }else if (inserts == 1) { //IMAGEN2
                                product.image2 = url;
                            }else if (inserts == 2) { //IMAGEN3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Error al actualizar el producto',
                                    error: err
                                });
                            }

                            inserts = inserts + 1;

                            if (inserts == files.length) { //TERMINO DE ALMACENAR LAS TRES IMAGENES
                                return res.status(201).json({
                                    success: true,
                                    message: `El producto se actualizó correctamente`,
                                    data: data
                                });
                            }

                        });
                    });
                }

                start();

            });
        }
    },

    async update(req, res) {

        const product = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Product.update(product, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar el producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Producto actualizado correctamente`,
                data: data
            });

        });
    },

    async delete(req, res) {
        const id = req.params.id;
        Product.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al eliminar el producto',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Producto eliminado correctamente`,
                data: `${id}`
            });
        })
    }
}