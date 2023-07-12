const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {

    async getAll(req, res) {
        Category.getAll((err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al listar las categorias',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },

    async create(req, res) {
        const category = JSON.parse(req.body.category); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                category.image = url;
            }
        }

        Category.create(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Categoria creada correctamente`,
                data: `${id}`
            });
            
        });
    },

    async updateWithImage(req, res) {
        const category = JSON.parse(req.body.category); // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                category.image = url;
            }
        }

        Category.update(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Categoria actualizada correctamente`,
                data: `${id}`
            });
            
        });
    },

    async update(req, res) {
        
        const category = req.body; // CAPTURAR LOS DATOS QUE ENVIA EL CLIENTE

        Category.update(category, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al editar la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Categoria actualizada correctamente`,
                data: `${id}`
            });
            
        });
    },

    async delete(req, res) {
        const id = req.params.id;
        Category.delete(id, (err, data) =>{
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al eliminar la categoria',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: `Categoria eliminada correctamente`,
                data: `${id}`
            });
        })
    }
}