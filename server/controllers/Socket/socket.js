
const Conversation = require('../../models/Conversation');
const User = require('../../models/User');
const {RECEIVED_MESSAGE} = require("../../util/socketEvent");


    const users = {};
exports.join = async (io,socket,data) =>{
    const {userId} =data;
    if(userId){
        users[socket.id] = userId
        socket.join(userId);
        console.log(socket.rooms)
        const user = await User.findById(userId);
        user.is_active = true;
         await user.save();
    }
}
exports.disconnect = async (io,socket) =>{
    console.log(`Disconnected: ${socket.id}`);
    const userId = users[socket.id];
    console.log("userId",userId);
    console.log("users",users);
    const user = await User.findById(userId);
    console.log(user);
    user.is_active = false;
    await user.save();
    delete users[socket.id];
}
exports.outRoom = async (io,socket,userId) =>{
    const user = await User.findById(userId);
    user.is_active = false;
    await user.save();
    socket.leave(userId);
}

exports.sendMessage =  async (io,socket,data) =>{
    const {conversationId,message,senderId,receiverId} = data;
    let date  = Date.now();
    data = {
        ...data,
        date:date,
    }
    io.to(receiverId).emit(RECEIVED_MESSAGE,data);
}
exports.receivedMessage = async (io,socket,data) =>{
    const {receiverId} = data;
    io.to(receiverId).emit(RECEIVED_MESSAGE,{
    })
}
exports.seenMessages = async (io,socket,data) =>{

}