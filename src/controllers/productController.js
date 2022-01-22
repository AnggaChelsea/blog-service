const products = require("../models/product");
const categories = require("../models/category");
const mongoose = require("mongoose");
class ProductController {
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
  static async getFeature(req, res) {
    const product = await products.find({isFeature: true}).populate('category')
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Products not found"
      })
    } else {
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
    if (!category) return res.status(404).json('invalid category');
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
  static updateProduct(req, res) {
    // if (!mongoose.isValidaObjectId(req.params.id)) {
    //   res.status(400).json('invalid id');
    // }
    const category = categories.findById(req.body.category);
    if (!category) return res.status(404).json('invalid category');
    products.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    .then((response) => {
        res.status(200).json({
          message: "success update product",
          data: response
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static countProduct(req, res) {
    const productcount = products.find()
    productcount.count((err, count) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(count);
    });
    if(!productcount){
      res.status(404).json({succes:false})
    }
    res.send(productcount)
  } 
  static findFilter(req, res){
    const filtering = {}
    if(req.query.categories){
      filtering = {category: req.query.categories.split(',')}
    }
    const filtered = products.find(filtering)
    if(!filtered) {
      res.status(404).json({
        status: 404,
        message: "Products not found"
      })
    }
    res.status(200).json(filtered)
  }
}

module.exports = ProductController;