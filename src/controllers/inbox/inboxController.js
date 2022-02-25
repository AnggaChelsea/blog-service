const inboxModel = require("../../models/inbox")
const productModel = require("../../models/product")
const messageModel = require("../../models/message")
class InboxController {
    static async sendMessage(req, res) {
        try {
            const {
                userId,
                senderId,
                lastMessage,
                seen,

            } = req.body
            const newInbox = await inboxModel.create({
                userId,
                senderId,
                lastMessage,
                seen,

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
    static async getInboxByUserId(req, res) {
        try {
            const inbox = await inboxModel.find({
                    reciveId: req.params.id
                })
                .populate('reciveId')
                .populate('senderId')
            if (inbox === null) {
                res.status(400).json({
                    message: "Inbox not found",
                    data: inbox
                })
            }
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
    static async getInboxByUserIdAndSenderId(req, res) {
        try {
            const inbox = await inboxModel.find({
                    userId: req.params.id,
                    senderId: req.params.senderId
                })
                .populate('reciveId')
                .populate('senderId')
            if (inbox === null) {
                res.status(400).json({
                    message: "Inbox not found",
                    data: inbox
                })
            }
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

    static async getInboxById(req, res) {
        try {
            const inbox = await inboxModel.findById(req.params.id)
                .populate('reciveId')
                .populate('senderId')
            if (inbox === null) {
                res.status(400).json({
                    message: "Inbox not found",
                    data: inbox
                })
            }
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
    static async sendMessageForBuy(req, res) {
        const message = await new messageModel({
            productId: req.body.productId,
            senderId: req.body.senderId,
            reciverId: req.body.reciverId,
            message: req.body.message,
            seen: false,
        })
        message.save()
            .then((message) => {
                res.status(201).json({
                    message: "Successfully send message",
                    data: message
                })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }
}
module.exports = InboxController