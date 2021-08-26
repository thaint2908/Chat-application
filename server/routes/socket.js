const {JOIN, OUT_ROOM,SEND_MESSAGE, RECEIVED_MESSAGE, TEST} = require("../util/socketEvent")
const isAuth = require('../middlewares/isAuth');
const socketController = require('../controllers/Socket/socket');


const socketRouter =(io,socket) =>{
    console.log("Connected",`${socket.id}`);
    socket.on(JOIN, data => socketController.join(io,socket,data));
    socket.on('disconnect', () => socketController.disconnect(io,socket));
    socket.on(SEND_MESSAGE, data => socketController.sendMessage(io, socket, data));
    socket.on(OUT_ROOM,data => socketController.outRoom(io,socket,data));
    // socket.on(RECEIVED_MESSAGE, data => socketController.receivedMessage(io,socket,data));
    // socket.on(TYPING, data => socketController.typing(io, socket, data));
    // socket.on(IS_READ, data => socketController.isRead(io, socket, data));
    socket.on(TEST, data => socketController.test(io,socket,data))
}
module.exports = socketRouter;