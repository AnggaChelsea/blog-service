const products = require("../models/product");
const categories = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName + '-' + Date.now());
  }
});

const uploadOption = multer({storage: storage})
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

  static discound(req, res) {
    const discount = req.params.discount
    const discountProducts = products.find({price: {$lte: discount}})
    if(!discountProducts) {
      res.status(404).json({
        status: 404,
        message: "Products not found"
      })
    }
    res.status(200).json(discountProducts)
  }

  static async addProduct(req, res) {
    const category = await categories.findById(req.body.category);
    console.log("thisis category" , category)
    if (!category) return res.status(404).json('invalid category');
    
    try {
      const product = new products({
        name: req.body.name,
        description: req.body.description,
        richDecription: req.body.richDecription,
        image: basePath,
        images: basePath,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeature: req.body.isFeature,
      });
      console.log(product)
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
  static async countProduct(req, res) {
    const count = req.params.count ? req.params.count : 0 
    const productcount = await products.find({isFeature: true}).limit(+count)
    if(!productcount){
      res.status(404).json({succes:false})
    }
    res.send(productcount)
  } 

  static findFilter(req, res){
    const filtering = {}
    if(req.query.categories){
      let filteringbe = {category: req.query.categories.split(',')}
      filtering.push(filteringbe)
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
  static async homepage(req, res) {
    const product = await products.find({isFeature: true}).limit(4)
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

module.exports = ProductController;