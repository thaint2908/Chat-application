
const mongoose =require('mongoose');
const Schema =mongoose.Schema;


const userSchema  =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatar: String,
    password:{
        type:String,
        required:true
    },
    birthday: Date,
    phoneNumber: String,
    is_active:{
        type:Boolean,
        default:false
    },
    contact:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
},{timestamps:{
    createdAt:'created_at',updatedAt:'updated_at'}})

module.exports = mongoose.model("User",userSchema);