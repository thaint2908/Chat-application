const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    last_message:{
        kind: {
            type:String,
            enum: [
                "text",
                "file",
                "image"
            ]
        },
        date: Date,
        content: {
            type: String,
            require: true
        },
        is_read: {
            type: Number,
            default: 0,
            range: [0, 2]
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },

    },
    messages: [{
        kind: {
            type:String,
            enum: [
                "text",
                "file",
                "image"
            ]
        },
        date: Date,
        content: {
            type: String,
            require: true
        },
        is_read: {
            type: Number,
            default: 0,
            range: [0, 2]
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },

    }]
}, {
    timestamps: {
        createdAt: 'created_at', updatedAt: 'updated_at'
    }
});
module.exports = mongoose.model('Conversation', conversationSchema);