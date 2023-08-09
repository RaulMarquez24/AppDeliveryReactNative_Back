const mercadopago = require('mercadopago');
const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

mercadopago.configure({
    sandbox: true,
    access_token: 'TEST-4332423066954571-102200-779dd861dfaa9f6acb7609a1887ee3f3-191014229' // Access token here
});

module.exports = {

    async createPayment(req, res) {

        let payment = req.body;

        console.log('PAYMENT: ', payment);

        const payment_data = {
            token: payment.token,
            issuer_id: payment.issuer_id,
            payment_method_id: payment.payment_method_id,
            transaction_amount: payment.transaction_amount,
            installments: parseInt(payment.installments),
            payer: {
                email: payment.payer.email,
                identification: {
                    type: payment.payer.identification.type,
                    number: payment.payer.identification.number,
                },
            },
        }

        const data = await mercadopago.payment.create(payment_data).catch((err) => {
            console.log('Error de mercado pago', err);
            return res.status(501).json({
                success: false,
                message: 'Error al crear el pago',
                error: err
            });
        });

        if (data) {
            console.log('Los datos del cliente son correctos', data.response);

            const order = payment.order;

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
                    message: `Orden creada correctamente`,
                    data: `${id}`
                });

            });
        }else{
            return res.status(501).json({
                success: false,
                message: 'Error con algun dato en la peticion'
            });
        }
    }

}