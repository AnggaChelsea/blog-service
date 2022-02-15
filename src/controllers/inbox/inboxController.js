const inboxModel = require("../../models/inbox")

class InboxController {
    static async sendMessage(req, res){
        try {
            const {userId, senderId, lastMessage, seen, deleted, inboxHash} = req.body
            const newInbox = await inboxModel.create({userId, senderId, lastMessage, seen, deleted, inboxHash})
            res.status(201).json({
                message: "Successfully send message",
                data: newInbox
            })
        } catch (error) {
            res.status(500).json({
                message: "Failed to send message",
                error
            })
        }
    }
}