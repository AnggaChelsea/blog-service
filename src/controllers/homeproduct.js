const products = require("../models/product");
const categories = require("../models/category");

class HomeProduct{
    static async getAllProducts(req, res) {
        const product = await products.find().populate('category') /*.select('name -_id image'); */
        if (!product) {
          res.status(404).json({
            status: 404,
            message: "Products not found"
          })
        } else {
          res.status(200).json(product)
        }
      }
}

module.exports = HomeProduct;
