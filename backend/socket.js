let io;
const dotenv = require('dotenv');

module.exports= {
    init: httpServer => {
        io= require('socket.io')(httpServer,{
            cors: {
                origin: `http://aryan-rai.me`,
            }});
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error("Socket.io is not initialized!");
        }
        return io;
    }
};