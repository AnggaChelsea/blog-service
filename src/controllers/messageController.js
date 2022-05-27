const messagemodel = require('../models/message');
const userModel = require('../models/user');
const productModel = require('../models/product');
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
        image,
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

  static async sendMessage(req, res) {
    const sellerId = req.params;
    const {
      buyyerId,
      messages,
      image,
      productId
    } = req.body;
    const notifPesanKirim = await userModel.findByIdAndUpdate(buyyerId, {
      $push: {
        PesanKirim: {
          sellerId,
          messages,
          image,
          productId
        }
      }
    }, {
      new: true
    });
    const notifPesanTerima = await userModel.findByIdAndUpdate(
      sellerId, {
        $push: {
         PesanTerima: {
            buyyerId: buyyerId,
            messages: messages,
            image: image,
            productId: productId
          }
        }
      }, {
        new: true
      }
    );
    if(notifPesanKirim && notifPesanTerima){
      const message = new messagemodel({
        sellerId,
        buyyerId,
        messages,
        productId,
        image
      });
      const pushNotifProduct = await productModel.findByIdAndUpdate(productId, {
        $push: {
          pesan: {
            buyyerId: buyyerId,
          }
        }
      }, {
        new: true
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
  
      res.status(200).json({
        message: "success send message",
        data: notifPesanKirim,
      });
      
    }
   
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

module.exports = MessageController;