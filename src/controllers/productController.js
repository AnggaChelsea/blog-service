const products = require("../models/product");

class ProductController {
  static async getAllProducts(req, res) {
    const product = await products.find();
    if (!product) {
      res.status(404).json({
          status: 404,
          message: "Products not found"
        })
    }else{
      res.status(200).json(product)
    }
  }

  static async addProduct(req, res) {
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