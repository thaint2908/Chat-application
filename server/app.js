

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const multer = require('multer');
const path = require('path');
const conversationSchema = require('./models/Conversation');
const http = require("http");
const userRouter = require('./routes/user');
const conversationRouter = require('./routes/conversations');
const authRouter = require('./routes/auth');
const cors = require('cors');
const socketRouter = require('./routes/socket');

const MONGODB_URI = 'mongodb://localhost:27017/chat-app';
const app = express();

const {nonAccentVietnamese} = require('./util/non-vietnamese');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const  fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public');
    },
    filename: function (req, file, cb) {
        const mimetype = file.mimetype.split('/')[1];
        cb(null, Date.now()+ '-' + file.originalname);
    }
});
// app.use(multer({storage:fileStorage}).single("avatar"));
app.use(multer({storage: fileStorage}).array('content'));


app.use('/users',userRouter);
app.use('/auth',authRouter);
app.use('/',conversationRouter);

app.use('/public',express.static("public"));

//lưu file ảnh


const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => socketRouter(io,socket));


mongoose
    .connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        httpServer.listen(8080, () => {
            console.log("Server is running on port 8080")
        });
    })
    .catch(err => {
        console.log(err);
    })

// const user = new User({
//     name: 'test1',
//     email: 'test@abc.com',
//     password: 'test'
// });
// user.save()
//     .then(savedUser => {
//         const test = new conversationSchema({
//             members:[{
//                 userId: savedUser._id, // lam clg day:))a
//             }],
//             messages:[{
//                 body:'abc',
//                 from: savedUser._id,
//             }]
//         });
//
//         test.save()
//             .then(res =>{
//                 console.log(res)})
//             .catch(err=>{
//                 console.log(err);
//             })
//     })
//     .catch(err => {
//         console.log(err);
//     });
//
//
