const productsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image',3), productsController.create);
    // app.get('/api/products/getAll', passport.authenticate('jwt', {session: false}), productsController.getAll);
    // app.put('/api/products/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image',1), productsController.updateWithImage);
    // app.put('/api/products/update', passport.authenticate('jwt', {session: false}), productsController.update);
    // app.delete('/api/products/delete/:id', passport.authenticate('jwt', {session: false}), productsController.delete);

}