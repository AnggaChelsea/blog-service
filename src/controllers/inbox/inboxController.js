const inboxModel = require("../../models/inbox")

class InboxController {
    static async sendMessage(req, res) {
        try {
            const {
                userId,
                senderId,
                lastMessage,
                seen,
                deleted,
                inboxHash
            } = req.body
            const newInbox = await inboxModel.create({
                userId,
                senderId,
                lastMessage,
                seen,
                deleted,
                inboxHash
            })
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
    static async chattouser(req, res) {
        const {
            senderId,
            reciveId,
            message,
            lastMessage,
            seen,
            deleted,
            inboxHash
        } = req.body
        const newInbox = new inboxModel({
            senderId,
            reciveId,
            message,
            lastMessage,
            seen,
            deleted,
            inboxHash
        })
        newInbox.save()
            .then((inbox) => {
                res.status(201).json({
                    message: "Successfully send message",
                    data: inbox
                })

            })
            .catch((err) => {
                res.status(500).json(err)
            })

    }
    static async getInbox(req, res) {
        try {
            const inbox = await inboxModel.find({
                userId: req.params.id
            }).populate('senderId').populate('reciveId')
            res.status(200).json({
                message: "Successfully get inbox",
                data: inbox
            })
        } catch (error) {
            res.status(500).json({
                message: "Failed to get inbox",
                error
            })
        }
    }
}

module.exports = InboxController