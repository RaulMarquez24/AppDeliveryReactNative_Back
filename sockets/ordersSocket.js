module.exports = (io) => {

    const namespace = io.of('/orders/delivery');

    namespace.on('connection', (socket) => {
        console.log(`NUEVO CLIENTE CONECTADO: ${socket.id} -> /orders/delivery`);
    
        socket.on('disconnect', (data) => {
            console.log(`UN CLIENTE SE DESCONECTO`);
        })
    })

}