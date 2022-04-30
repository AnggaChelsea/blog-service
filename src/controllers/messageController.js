const messagemodel = require('../models/message');
class MessageController {
  static async getMessage(req, res) {
    const message = await messagemodel.find({});
    res.status(200).json({
      message: "success get message",
      data: message,
    });
  }

  static async deleteMessage(req, res) {
    const {
      id
    } = req.params;
    const message = await messagemodel.findByIdAndDelete(id);
    res.status(200).json({
      message: "success delete message",
      data: message,
    });
  }
  static async updateMessage(req, res) {
    const {
      id
    } = req.params;
    const {
      message,
      uploadfile,
      from,
    } = req.body;
    const messageUpdate = await messagemodel.findByIdAndUpdate(
      id, {
        message,
        uploadfile,
        from,
      }, {
        new: true
      }
    );
    res.status(200).json({
      message: "success update message",
      data: messageUpdate,
    });
  }

  static sendMessage(req, res) {
    const sellerId = req.params;
    const {
      buyyerId,
      messages
    } = req.body;
    const message = new messagemodel({
      sellerId,
      buyyerId,
      messages,
    });
    message.save()
      .then(() => {
        res.status(201).json({
          message: "success send message",
          data: message,
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "failed send message",
          data: err,
        });
      });

  }

  static getInox(req, res) {
    const {
      id
    } = req.params;
   const findMessage = messagemodel.find({
        sellerId: id
      })
      .populate('buyyerId')
      .populate('sellerId')
      .then(data => {
        res.status(200).json({
          message: "success get message",
          data: data,
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "failed get message",
          data: err,
        });
      });
  }

}