const products = require("../models/product");
const categories = require("../models/category");
class ProductController {
  static async getAllProducts(req, res) {
    const product = await products.find() /*.select('name -_id image'); */
    if (!product) {
      res.status(404).json({
          status: 404,
          message: "Products not found"
        })
    }else{
      res.status(200).json(product)
    }
  }

  static getProductbyId(req, res) {
    products.findById(req.params.id).populate('category')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async addProduct(req, res) {
    const category = await categories.findById(req.body.category);
    if(!category) return res.status(404).json('invalid category');
    try {
      const product = new products({
        name: req.body.name,
        description: req.body.description,
        richDecription: req.body.richDecription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeature: req.body.isFeature,
      });
      product
        .save()
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ProductController;