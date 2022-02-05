const ChatRooms = require('../models/roomchat');

class ChatController {
    static ChatUser(req, res){
        const {message, uploadimage, messageto} = req.body;
        const userId = req.params.id;
        let userid = usermodel.findOne({id:userId})
        .then(user => {
            const newChat = new ChatRooms({
                message,
                uploadimage,
                messageto:userid
            })
            newChat.save()
            .then((response)=>{
                res.status(200).json({response, user:userid, "message":"success add chat"});
            })
            .catch((err)=>{
                res.status(500).json(err);
            })
        })
    }
    static getInbox(req, res) {
        const userId = req.params.id;
        ChatRooms.find({userId})
        .populate('userId')
        .select("-password")
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    }
}
module.exports = ChatController;