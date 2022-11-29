let io;
const dotenv = require('dotenv');

module.exports= {
    init: httpServer => {
        io= require('socket.io')(httpServer,{
            cors: {
                origin: `https://aryanx23.github.io`,
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
