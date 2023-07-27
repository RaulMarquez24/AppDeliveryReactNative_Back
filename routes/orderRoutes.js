const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), ordersController.create);
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), ordersController.findByStatus);
    // app.put('/api/orders/updateWithImage', passport.authenticate('jwt', {session: false}), upload.array('image',1), ordersController.updateWithImage);
    // app.put('/api/orders/update', passport.authenticate('jwt', {session: false}), ordersController.update);
    // app.delete('/api/orders/delete/:id', passport.authenticate('jwt', {session: false}), ordersController.delete);

}