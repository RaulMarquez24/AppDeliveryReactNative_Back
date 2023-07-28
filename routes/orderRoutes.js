const ordersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), ordersController.create);
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), ordersController.findByStatus);
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), ordersController.findByDeliveryAndStatus);
    app.put('/api/orders/updateToDispatched', passport.authenticate('jwt', {session: false}), ordersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheWay', passport.authenticate('jwt', {session: false}), ordersController.updateToOnTheWay);
    // app.put('/api/orders/update', passport.authenticate('jwt', {session: false}), ordersController.update);
    // app.delete('/api/orders/delete/:id', passport.authenticate('jwt', {session: false}), ordersController.delete);

}