const Conversation = require('../../models/Conversation');
const ObjectId = require('mongoose').Types.ObjectId;

exports.postMessage = async (req, res) => {
    const contentType = req.get("Content-Type");
    console.log(req)
    if (contentType.includes("application/x-www-form-urlencoded")) {
        return sendTextMessage(req, res);
    }
    if (contentType.includes("multipart/form-data")) {
        return sendFileMessage(req, res);
    }
};
exports.getAllConversations = async (req, res) => {
    const userId = req.userId;
    const {receiverId, search} = req.query;
    if (receiverId) {
        const conversation = await Conversation.findOne({
            members: [ObjectId(userId), ObjectId(receiverId)],
        })
        return res.status(200).json(conversation);
    }
    if (search) {
        const conversations = await Conversation.find({
            members: ObjectId(userId)
        }).populate({
            path: "members",
            match: {name: search, _id: {$ne: userId}}
        });
        const selectedConversation = conversations.filter(conversation => {
            return conversation.members.length > 0;
        })
        return res.status(200).json(selectedConversation);
    }
    const conversations = await Conversation.find({
        members: ObjectId(userId),
        messages: {$not: {$size: 0}}
    }).populate("members")
    conversations.sort((a, b) => {
        const aMessagesLength = a.messages.length;
        if (aMessagesLength === 0) {
            return false
        }
        const bMessagesLength = b.messages.length;
        const aDate = new Date(a.messages[aMessagesLength - 1].date);
        const bDate = new Date(b.messages[bMessagesLength - 1].date);
        return bDate - aDate;
    })
    return res.status(200).json(conversations);
};

exports.getConversation = async (req, res) => {
    const {conversationId} = req.params;
    const page = Number(req.query.page);
    const userId = req.userId;
    console.log("query:", req.query);
    const limit = 7;
    let conversation = await Conversation.findOne({
        members: ObjectId(userId),
        _id: ObjectId(conversationId),
    }).populate({
        path: "members",
    })
    if (conversation) {
        conversation.messages.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            return bDate - aDate;
        });
        let index = conversation.messages.length - 1;
        while (index > 0 && (conversation.messages[index].sender === userId || (!conversation.messages[index].is_read && conversation.messages[index].sender !== userId))) {
            conversation.messages[index].is_read = 1;
            index--;
        }
        conversation.last_message.is_read = 1;
        await conversation.save();
    }
    if (!conversation) {
        return res.status(401).json({messages: "Unauthorized Error"})
    }
    const totalPage = Math.ceil(conversation.messages.length / limit);
    const messages = conversation.messages.slice((page - 1) * limit, page * limit);
    return res.status(200).json( {
        conversation: {
            ...conversation._doc,
            messages,
            paging: {
                "total_page": totalPage,
                "per_page":limit,
                "cur_page":page,
                "total_items": conversation.messages.length
            }
        },
    });

};
exports.getMessageImages = async (req, res) => {
    const {conversationId} = req.params;
    const userId = req.userId;
    const conversations = await Conversation.findOne({
        members: ObjectId(userId),
        _id: ObjectId(conversationId),
    });
    if (!conversations) {
        return res.status(401).json({messages: "Unauthorized Error"})
    }
    const messages = conversations.messages;
    let images = [];

    messages.map(message => {
        if (message.kind === "image") {
            const curImg = message.content.split("|")
            images = images.concat(curImg)
        }
    })
    console.log(messages);
    // const conversationImages = conversations.messages.kind.includes("image");
    return res.status(200).json(images)
};


exports.getConversationFiles = async (req, res) => {
    const {conversationId} = req.params;
    const userId = req.userId;
    const conversations = await Conversation.findOne({
        members: ObjectId(userId),
        _id: ObjectId(conversationId),
    });
    if (!conversations) {
        return res.status(401).json({messages: "Unauthorized Error"})
    }
    const messages = conversations.messages;
    const files = [];
    messages.forEach(message => {
        if (message.kind === "file") {
            files.push(message);
        }
    })
    // const conversationImages = conversations.messages.kind.includes("image");
    return res.status(200).json(files)
}
// exports.deleteConversation = async (req,res) =>{
//
// };

exports.createConversation = async (members) => {
    const conversation = await Conversation.create({
        members: members,
    })
}
const sendTextMessage = async (req, res) => {
    const userId = req.userId;
    const {conversationId} = req.params;
    const {content} = req.body;
    const conversation = await Conversation.findById(conversationId);
    const message = {
        kind: "text",
        date: Date.now(),
        content: content,
        sender: ObjectId(userId)
    };
    conversation.last_message = message;
    conversation.messages.push(message);
    conversation.save();
    return res.status(200).json(conversation);
};
const sendFileMessage = async (req, res) => {
    const userId = req.userId;
    const {conversationId} = req.params;
    let kind = "file";
    const filenames = [];
    let content = "";
    if (req.files[0].mimetype === "image/jpeg") {
        kind = "image";
    }

    req.files.map(file => {
        if (file.mimetype !== req.files[0].mimetype) {
            return res.status(422).json({message: "Something went wrong"});
        }
        filenames.push(file.filename)
    })
    content = filenames.join("|");
    const conversation = await Conversation.findById(conversationId);

    const messages = {
        kind: kind,
        date: Date.now(),
        content: content,
        sender: ObjectId(userId)
    };
    console.log(messages)
    conversation.messages.push(messages);
    conversation.last_message = messages;
    conversation.save();
    return res.status(200).json({content: content});
}
