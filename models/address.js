const db = require('../config/config');
const Address = {};

Address.create = (address, result) => {
    const sql = `
    INSERT INTO 
        address(
            address,
            postal_code,
            city,
            lat,
            lng,
            id_user,
            created_at,
            updated_at
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            address.address,
            address.postal_code,
            address.city,
            address.lat,
            address.lng,
            address.id_user,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {
                console.log('Id de la nueva direccion: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

// Address.getAll = (result) => {

//     const sql = `
//     SELECT
//         id,
//         name,
//         description,
//         image
//     FROM
//         categories
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

// Address.update = (address, result) => {
//     const sql = `
//     UPDATE 
//         categories
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
//             address.name,
//             address.description,
//             address.image, 
//             new Date(), 
//             address.id
//         ],
//         (err, res) => {
//             if (err) {
//                 console.log('error: ', err);
//                 result(err, null);
//             } else {
//                 console.log('Id de la categoria actualizada: ', address.id);
//                 result(null, address.id);
//             }
//         }
//     )
// }

// Address.delete = (id, result) => {
//     const sql = `
//     DELETE FROM
//         categories 
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

module.exports = Address;