const db = require('../config/config');
const OrderHasProducts = {};

OrderHasProducts.create = (id_order, id_product, quantity, result) => {
    const sql = `
    INSERT INTO 
        order_has_products(
            id_order,
            id_product,
            quantity,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            id_order,
            id_product,
            quantity,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                console.log('Id de la nueva orden_has_products: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

// OrderHasProducts.getAll = (result) => {

//     const sql = `
//     SELECT
//         id,
//         name,
//         description,
//         image
//     FROM
//         order_has_products
//     ORDER BY
//         name
//     `;

//     db.query(
//         sql,
//         (err, data) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//             } else {
//                 console.log('Listado de categorias: ', data);
//                 result(null, data);
//             }
//         }
//     )
// }

// OrderHasProducts.update = (orderHasProducts, result) => {
//     const sql = `
//     UPDATE 
//         order_has_products
//     SET
//         name = ?,
//         description = ?,
//         image = ?,
//         updated_at= ?
//     WHERE
//         id = ?
//     `;

//     db.query(
//         sql,
//         [
//             orderHasProducts.name,
//             orderHasProducts.description,
//             orderHasProducts.image, 
//             new Date(), 
//             orderHasProducts.id
//         ],
//         (err, res) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//             } else {
//                 console.log('Id de la categoria actualizada: ', orderHasProducts.id);
//                 result(null, orderHasProducts.id);
//             }
//         }
//     )
// }

// OrderHasProducts.delete = (id, result) => {
//     const sql = `
//     DELETE FROM
//         order_has_products 
//     WHERE 
//         id = ?
//     `;

//     db.query(
//         sql,
//         id,
//         (err, res) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//             } else {
//                 console.log('Id de la categoria eliminada: ', id);
//                 result(null, id);
//             }
//         }
//     )
// }

module.exports = OrderHasProducts;