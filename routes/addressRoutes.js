const addressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    app.post('/api/address/create', passport.authenticate('jwt', { session: false }), addressController.create);
    // app.get('/api/address/getAll', passport.authenticate('jwt', {session: false}), addressController.getAll);
    // app.put('/api/address/update', passport.authenticate('jwt', {session: false}), addressController.update);
    // app.delete('/api/address/delete/:id', passport.authenticate('jwt', {session: false}), addressController.delete);

}