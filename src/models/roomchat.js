const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = Schema({
    message :{
        type:String,
        minlength:1,
        required:true
    },
    uploadimage:{
        type:String,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    messageto:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    }
})
const chatrooms = mongoose.model('chatrooms', ChatRoomSchema);
module.exports = chatrooms;