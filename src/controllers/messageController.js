const messagemodel = require('../models/message');
class MessageController {
    static async getMessage(req, res) {
        const message = await messagemodel.find({});
        res.status(200).json({
        message: "success get message",
        data: message,
        });
    }
    static async addMessage(req, res) {
        const {
        message,
        uploadfile,
        from,
        } = req.body;
        const userId = req.params.id;
        const newMessage = new messagemodel({
        message,
        uploadfile,
        from,
        });
        newMessage
        .save()
        .then((response) => {
            res.status(200).json({
            message: "success add message",
            data: response,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
    static async deleteMessage(req, res) {
        const { id } = req.params;
        const message = await messagemodel.findByIdAndDelete(id);
        res.status(200).json({
        message: "success delete message",
        data: message,
        });
    }
    static async updateMessage(req, res) {
        const { id } = req.params;
        const {
        message,
        uploadfile,
        from,
        } = req.body;
        const messageUpdate = await messagemodel.findByIdAndUpdate(
        id,
        {
            message,
            uploadfile,
            from,
        },
        { new: true }
        );
        res.status(200).json({
        message: "success update message",
        data: messageUpdate,
        });
    }
     static async senderMessage(req, res){
        const { id } = req.params;
        const {
        message,
        uploadfile,
        from,
        } = req.body;
        const messageUpdate = await messagemodel.findByIdAndUpdate(
        id,
        {
            message,
            uploadfile,
            from,
        },
        { new: true }
        );
        res.status(200).json({
        message: "success update message",
        data: messageUpdate,
        });
    }
    }