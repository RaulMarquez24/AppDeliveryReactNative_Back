const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const Stripe = require('stripe');
const stripe = new Stripe('sk_test_51NZZSkLbwhf8X80XcLIN0wWfXVHx1LHCAe12SDuGgQomJSmBFnvkZQFyBbRgTImtA79UpOL7wva1XnUg1asVB8Pf00wPUMisgb');

module.exports = {

    async CreatePaymet(req, res) {
        const data = req.body;
        const order = data.order;

        try {
            
            const payment = await stripe.paymentIntents.create({
                amount: data.amount,
                currency: 'EUR',
                description: 'ECOMMERCE REACT NATIVE DELIVERY APP',
                payment_method: data.id, //token
                confirm: true
            });

            console.log('PAYMENT STRIPE: ' + JSON.stringify(payment, null, 3));

            if (payment !== null && payment !== undefined) {
                if (payment.status === 'succeeded') {
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
                            message: `Transaccion exitosa, la orden se ha creado correctamente`,
                            data: `${id}`
                        });
            
                    });
                }else{
                    return res.status(501).json({
                        success: false,
                        message: 'No se pudo efectuar la transaccion',
                        error: error
                    });        
                }
            }else{
                return res.status(501).json({
                    success: false,
                    message: 'No se pudo efectuar la transaccion',
                    error: error
                });        
            }

        } catch (error) {
            console.log('ERROR STRIPE: ' + error);
            return res.status(501).json({
                success: false,
                message: 'Error al efectuar la transaccion',
                error: error
            });
        }
    }

}