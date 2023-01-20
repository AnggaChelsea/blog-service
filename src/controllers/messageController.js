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
    const seller = req.params;
    const buyyerId = req.body.buyyerId;
    const productId = req.body.productId;
    const messages = req.body.messages;
    const image = req.body.image;
    // const from = req.body.from;
    const newMessage = new messagemodel({
      messages,
      image,
      productId,
      buyyerId,
    });
    newMessage.save();
    res.status(201).json({
      message: "success send message",
      data: newMessage,
    });
  }


  static async sendMessage(req, res) {
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
    console.log('succes1')
    if(newMessage){
      const notifPesanKirim = await userModel.findOneAndUpdate({buyyerId}, {
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
      console.log('succes2')
      const notiftProuducts = await productModel.findOneAndUpdate(productId, {
        $push: {
          notif: {
            buyyerId,
            messages,
          }
        }
      }, {
        new: true
      }
      );
      console.log('succes3')
      const notifPesanTerima = await userModel.findOneAndUpdate(
        seller, {
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
      console.log('succes4')
      if(notifPesanKirim != null && notifPesanTerima != null){
        const pushNotifProduct = await productModel.findOneAndUpdate(productId, {
          $push: {
            pesan: {
              buyyerId: buyyerId,
            }
          }
        }, {
          new: true
        });   
      }
      console.log('succes5')
      newMessage.save()
      .then(() => {
        return res.status(201).json({
          message: "success send message",
          data: message,
          notif: notiftProuducts
        });
      })
      .catch(err => {
        return res.status(500).json({
          message: "failed send message",
          data: err,
        });
      });
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