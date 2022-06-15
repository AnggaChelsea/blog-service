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

  static async sendMessage1(req, res) {
    const sellerId = req.params._id;
    const buyyerId = req.body.buyyerId;
    const productId = req.body.productId;
    const message = req.body.message;
    const image = req.body.image;
    // const from = req.body.from;
    const newMessage = new messagemodel({
      message,
      image,
      // from,
      sellerId,
      productId,
      buyyerId,
    });
    await newMessage.save();
    res.status(201).json({
      message: "success send message",
      data: newMessage,
    });
  }


  static async sendMessage(req, res) {
    const sellerId = req.params._id;
    const {
      seller,
      buyyerId,
      messages,
      image,
      productId
    } = req.body;
    const newMessage = await new messagemodel({
      buyyerId,
      seller,
      messages,
      image,
      productId
    });
    if(newMessage){
      const notifPesanKirim = await userModel.findByIdAndUpdate({_id:buyyerId}, {
        $push: {
          PesanKirim: {
            seller,
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
      if(notifPesanKirim != null && notifPesanTerima != null){
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
            return res.status(201).json({
              message: "success send message",
              data: message,
              notif: pushNotifProduct
            });
          })
          .catch(err => {
            return res.status(500).json({
              message: "failed send message",
              data: err,
            });
          });
          return res.status(200).json({
          message: "success send message",
          data: notifPesanKirim,
        })
      }
    }else{
      return res.status(500).json({
         message: "failed send message",
         data: err,
       });
    }
  }

  static async getPesanByBuyyerId(req, res) {
    const {
      id
    } = req.params;
    const findMessage = messagemodel.find({
        buyyerId: id
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