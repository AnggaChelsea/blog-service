const products = require("../models/product");
const categories = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("../middleware/jwtAdmin");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/images/");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName + "-" + Date.now());
  },
});

const uploadOption = multer({
  storage: storage
});
class ProductController {
  static async getAllProducts(req, res, next) {
    const product = await products
      .find()
      .populate("category"); /*.select('name -_id image'); */
    if (!product) {
      await res.status(404).json({
        status: 404,
        message: "Products not found",
      });
      return

    } else {
      res.status(200).json({
        message: "success",
        data: product
      });
    }
  }
  static async getFeature(req, res) {
    const product = await products
      .find({
        isFeature: true
      })
      .populate("category");
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    } else {
      res.status(200).json(product);
    }
  }

  static getProductbyId(req, res) {uploadfile,
    products
      .findById(req.params.id)
      .populate("category")
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static discound(req, res) {
    const discount = req.params.discount;
    const discountProducts = products.find({
      price: {
        $lte: discount
      }
    });
    if (!discountProducts) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    }
    res.status(200).json(discountProducts);
  }

  static async addProduct(req, res) {

    const {
      seller,
      name,
      description,
      richDecription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeature
    } = req.body;
    const product = await new products({
      seller,
      name,
      description,
      richDecription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeature,
    });
    product.save().then((response) => {
     return res.status(200).json(response);
    }).catch((err) => {
     return res.status(500).json(err);
    });

  }
  static updateProduct(req, res) {
    const category = categories.findById(req.body.category);
    if (!category) return res.status(404).json("invalid category");
    products
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .then((response) => {
        res.status(200).json({
          message: "success update product",
          data: response,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async countProduct(req, res) {
    const count = req.params.count ? req.params.count : 0;
    const productcount = await products.find({
      isFeature: true
    }).limit(+count);
    if (!productcount) {
      res.status(404).json({
        succes: false
      });
    }
    res.send(productcount);
  }

  static findFilter(req, res) {
    const filtering = {};
    if (req.query.categories) {
      let filteringbe = {
        category: req.query.categories.split(",")
      };
      filtering.push(filteringbe);
    }
    const filtered = products.find(filtering);
    if (!filtered) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    }
    res.status(200).json(filtered);
  }
  static async homepage(req, res) {
    const product = await products.find({
      isFeature: true
    }).limit(4);
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    } else {
      res.status(200).json(product);
    }
  }
  static async getFeedsProduct(req, res) {
    const product = await products.find({
      "$where": "this.rating > 10"
    }).limit(4);
    if (!product) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    } else {
      res.status(200).json(product);
    }
  }

  static async getProductbyCategory(req, res) {
    const procat = products.find().populate("category");
    if (!procat) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    }
    res.status(200).json(procat);
  }

  static async addProductByCategory(req, res) {
    const category = await categories.findById(req.body.category);
    console.log(category);
    if (!category) return res.status(404).json("invalid category");
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
      console.log(product);
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
  static async uploadImage(req, res, next) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    if (!req.file) return res.status(400).json("no file uploaded");
    const image = `${basePath}/${req.file.filename}`;
    product.images = image;
    product
      .save()
      .then(() => {
        res.status(200).json({
          message: "success upload image",
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async addimageupload(req, res) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    if (!req.file) return res.status(400).json("no file uploaded");
    const image = `${basePath}/${req.file.filename}`;
    product.images = image;
    product
      .save()
      .then(() => {
        return res.status(200).json({
          message: "success upload image",
          data: product,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async newproduct(req, res) {
    const {
      seller,
      name,
      description,
      richDecription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeature,
    } = req.body;
    const product = new products({
      seller,
      name,
      description,
      richDecription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      numReviews,
      isFeature,
    });
    product
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async addLikeProduct(req, res) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    product.rating = product.rating + 1;
    product
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async deleteProduct(req, res) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    product
      .remove()
      .then((response) => {
        res.status(200).json({
          message: "success delete product"
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async filterbyCategory(req, res){
    const product = await products.find({
      category: req.params.id
    });
    if (!product) return res.status(404).json("invalid product");
    res.status(200).json(product);
  }
  static async getProductByUser(req,res){
    const product = await products.find({
      seller: req.params.id
    });
    if (!product) return res.status(404).json("invalid product");
    if (product.length === 0) return res.status(404).json("kosong product");
    res.status(200).json(product);
  }
}

module.exports = ProductController;