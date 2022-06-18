const productModel = require('../../models/product');
const userModel = require('../../models/user');
var fileupload = require("express-fileupload");

class PostProduct {
  static async postProduct(req, res) {
    const image = req.files
    const {
      seller,
      name,
      alamat,
      description,
      richDecription,
      brand,
      harga_jual,
      harga_beli,
      category,
      countInStock,
      rating,
      net,
      numReviews,
      like,
      baru,
      isFeature,
    } = req.body;
    const newProduct = await new productModel({
        seller,
        name,
        alamat,
        description,
        richDecription,
        brand,
        harga_jual,
        harga_beli,
        category,
        image: image,
        countInStock,
        rating,
        net,
        numReviews,
        like,
        baru,
        isFeature,
      })
      .save()
      .then((success) => {
        res.status(200).json({
          message: "success post product",
          success: success,
          data: newProduct,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "error post product",
          error: err,
        });
      });
  }
}
module.exports = PostProduct;