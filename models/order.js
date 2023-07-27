const db = require('../config/config');
const Order = {};

Order.create = (order, result) => {
    const sql = `
    INSERT INTO 
        orders(
            id_client,
            id_address,
            status,
            timestamp,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            order.id_client,
            order.id_address,
            'PAGADO', // 1. PAGADO 2. DESPACHADO 3. EN CAMINO 4. ENTREGADO
            Date.now(),
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                console.log('Id de la nueva orden: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

// Order.getAll = (result) => {

//     const sql = `
//     SELECT
//         id,
//         name,
//         description,
//         image
//     FROM
//         orders
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

// Order.update = (order, result) => {
//     const sql = `
//     UPDATE 
//         orders
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
//             order.name,
//             order.description,
//             order.image, 
//             new Date(), 
//             order.id
//         ],
//         (err, res) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//             } else {
//                 console.log('Id de la categoria actualizada: ', order.id);
//                 result(null, order.id);
//             }
//         }
//     )
// }

// Order.delete = (id, result) => {
//     const sql = `
//     DELETE FROM
//         orders 
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

module.exports = Order;