const User  = require('../../models/User');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const ObjectId = require('mongoose').Types.ObjectId;
const Conversation = require('../../models/Conversation')
const fs = require('fs');
const {createConversation} = require("../Conversations/conversation");

exports.getProfile = async  (req,res) =>{
    const userId = req.userId;
    const user = await User.findById(userId);
    res.status(200).json(user);
};
exports.getContacts = async (req,res) =>{
    const userId = req.userId;
    const {search} = req.query;
    let match = {};
    if(search){
         match = {
            name:search
        }
    }
    const users = await User.findById(userId).populate({
        path:"contact",
        match:match,
    });
    const contacts = [];
    for (const c of users.contact) {
        contacts.push(c);
    }

    res.status(200).json(contacts);
}
exports.editProfile = async (req,res) => {
    const userId = req.userId;
    const {name, phoneNumber, birthday} = req.body;
    const user = await User.findById(userId);
    if(name){
        user.name = name;
    }
    if(phoneNumber){
        user.phoneNumber = phoneNumber;
    }
    if(birthday){
        user.birthday = birthday;
    }
    await user.save();
    return res.status(200).json({
        name:user.name,
        phoneNumber:user.phoneNumber,
        birthday:user.birthday
    });
};
exports.editAvatar = async (req,res) =>{
    const userId = req.userId;
    const newAvatar = req.file.filename;
    const user = await User.findById(userId);
    const oldAvatar =path.join(appDir,"public",`${user.avatar}`);
    if(newAvatar && user.avatar && oldAvatar){
        fs.unlink(oldAvatar, (err) => {
            if (err) throw err;
        });
    }
    user.avatar = newAvatar;
    await user.save();
    return res.status(200).json({avatar:user.avatar});
};
exports.addContact = async (req,res) =>{
    const userId = req.userId;
    const {email} = req.body;
    const user = await User.findById(userId);
    const contact = await User.findOne({email:email});
    if(!contact){
        return res.status(404).json({message:"User does not exist"});
    }
    if(user.contact.includes(contact._id)){
        return res.status(409).json({message:"Contact has already"});
    }
    let members = [ObjectId(userId),contact._id];
    createConversation(members);
    user.contact.push(contact._id);
    user.save();
    console.log(contact)
    return res.status(200).json({data:contact,message:"Add contact successfully"});
}