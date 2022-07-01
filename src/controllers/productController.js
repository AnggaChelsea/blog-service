const products = require("../models/product");
const categories = require("../models/category");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("../middleware/jwtAdmin");
const messageModel = require("../models/message");
const moment = require("moment");
const userModel = require("../models/user");
const {
  followeUser
} = require("./userController");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
class ProductController {
  static async getAllProducts(req, res, next) {
    const product = await products.find().populate("category");
    if (!product) {
      await res.status(404).json({
        status: 404,
        message: "Products not found",
      });
      return;
    } else {
      const countlike = product.length;
      res.status(200).json({
        message: "success",
        data: product,
        like: countlike,
      });
    }
  }
  static async filterByAlamat(req, res) {
    const {
      alamat
    } = req.body;
    const product = await products.find({
      alamat: {
        $regex: alamat,
        $options: 'i'
      }
    }).limit(5);
    if (!product) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json(product);
    }
  }
  static async filterbynameregex(req, res) {
    const {
      name
    } = req.body;
    const product = await products.find({
      name: {
        $regex: name,
        $options: 'i'
      }
    }).limit(5);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      return res.status(200).json(product);
    }

  }
  static async filterbylatlong(req, res) {
    const {
      latitude
    } = req.body;
    const latlong = await products.find({
      latitude: {
        $regex: latitude,
        $options: 'i'
      }
    });
    if (!latlong) {
      res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json(latlong);
    }
  }
  static async getFeature(req, res) {
    const product = await products
      .find({
        isFeature: true,
      })
      .populate("category");
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    }
    return res.status(200).json(product);
  }
  static discound(req, res) {
    const discount = req.params.discount;
    const discountProducts = products.find({
      price: {
        $lte: discount,
      },
    });
    if (!discountProducts) {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    }
    res.status(200).json(discountProducts);
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
    const productcount = await products
      .find({
        isFeature: true,
      })
      .limit(+count);
    if (!productcount) {
      res.status(404).json({
        succes: false,
      });
    }
    res.send(productcount);
  }

  // static findFilter(req, res) {
  //   const filtering = {};
  //   if (req.query.categories) {
  //     let filteringbe = {
  //       category: req.query.categories.split(","),
  //     };
  //     filtering.push(filteringbe);
  //   }
  //   const filtered = products.find(filtering);
  //   if (!filtered) {
  //     res.status(404).json({
  //       status: 404,
  //       message: "Products not found",
  //     });
  //   }
  //   res.status(200).json(filtered);
  // }

  static async findDuluProduct(req, res) {
    const name = req.params.query;
    const query = {
      $text: {
        $search: name
      }
    };
    const result = await products.find(query);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({
        status: 404,
        message: "Products not found",
      });
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



  static async newproductweUpload(req, res) {
    const images = req.file;
    const host = "https";
    const prodUrl = "obscure-ravine-40173.herokuapp.com";

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
      image,
      numReviews,
      harga_sewa,
      like,
      baru,
      latitude,
      longitude,

      isFeature,
    } = req.body;
    const basePath = `${host}://${prodUrl}/assets/images/`;
    // const changetolower = name ? "STRING" : name.toLowerCase();
    // const alamatTolower = alamat ? "STRING" : alamat.toLowerCase();
    if (name === "senjata" || name === "senjata api") {
      res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
      return res.status(401).json({
        status: 401,
        message: "product ini berbahaya",
      });
    } else {
      console.log(req.body.hargaJual);

      const product = new products({
        seller,
        name,
        description,
        harga_sewa,
        richDecription,
        brand,
        image,
        harga_jual,
        harga_beli,
        category,
        countInStock,
        rating,
        net,
        numReviews,
        like,
        baru,
        latitude,
        longitude,
        isFeature,
        alamat,
      });
      product
        .save()
        .then((response) => {
          res.status(200).json(response);
          console.log("ini response", response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }

  static async newproductwe(req, res) {
    // const images = req.file.filename;
    const host = "http";
    const prodUrl = "localhost:8001";

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
      image,
      harga_sewa,
      numReviews,
      like,
      baru,
      latitude,
      longitude,
      isFeature,
    } = req.body;
    // const basePath = `${host}://${prodUrl}/src/assets/images/products/${images}`;
    // const changetolower = name ? "STRING" : name.toLowerCase();
    // const alamatTolower = alamat ? "STRING" : alamat.toLowerCase();
    if (name === "senjata" || name === "senjata api" || name === "pistol" || name === "samurai" || name === "ak-47") {
      res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
      return res.status(400).json({
        status: 400,
        message: "product ini berbahaya",
      });
    } else {
      console.log(req.body.hargaJual);

      const product = new products({
        seller,
        name,
        description,
        richDecription,
        brand,
        image,
        harga_jual,
        harga_beli,
        category,
        countInStock,
        rating,
        net,
        harga_sewa,
        numReviews,
        like,
        baru,
        latitude,
        longitude,
        isFeature,
        alamat,
      });
      product
        .save()
        .then((response) => {
          res.status(200).json(response);
          console.log("ini response", response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }

  static async newproduct(req, res) {
    const imageFile = req.file;
    const host = "https";
    const prodUrl = "obscure-ravine-40173.herokuapp.com";
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
    const basePath = `${host}://${prodUrl}/assets/images/`;
    // const changetolower = name ? "STRING" : name.toLowerCase();
    // const alamatTolower = alamat ? "STRING" : alamat.toLowerCase();
    if (name === "senjata" || name === "senjata api") {
      return res.status(401).json({
        status: 401,
        message: "product ini berbahaya",
      });
    } else {
      console.log(req.body.hargaJual);

      const product = new products({
        seller,
        name,
        alamat,
        description,
        richDecription,
        brand,
        image: imageFile,
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
        alamat,
      });
      product
        .save()
        .then((response) => {
          res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
          res.status(200).json(response);
          console.log("ini response", response);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }


  static async feedProduct(req, res) {
    const product = await products.find();
    const banyakLike = 0;
    var getdata = null
    console.log(getdata);
    for (let i = 0; i < product.length; i++) {
      let feed = product[i].like;
      for (let j = 0; j < feed.length; j++) {
        const obj = Object.keys(feed[j]).length;
        banyakLike = obj;
        getdata = obj;
        if (obj >= 3) {
          res.status(200).json({
            message: "success get feed",
            product: product,
          });
        }
      }
    }
  }

  static async viewFeedProduct(req, res) {
    const { productId } = req.params;
    const userId = req.body;
    const productFindandUpdate = await products.findByIdAndUpdate(productId, {
      $push: {
        view: {
          userId: userId,
        },
      },
      $inc: {
        viewProduct: 1,
      },
    },
      {
        new: true,
      }
    );
    if (productFindandUpdate) {
      res.status(200).json({
        message: "success get feed",
      });
    } else {
      res.status(404).json({
        message: "tidak ada feed"
      })
    }
  }

  static async addLikeProduct(req, res) {
    const userLike = req.body;
    const findDuluProduct = await products.findByIdAndUpdate(
      req.params.id, {
      $push: {
        like: userLike,
      },
    }, {
      new: true,
    }
    );
    if (!findDuluProduct) {
      res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }
    findDuluProduct.save();
    res.status(200).json(findDuluProduct);
  }

  static async deleteProduct(req, res) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    product
      .remove()
      .then((response) => {
        res.status(200).json({
          message: "success delete product",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async filterbyname(req, res) {
    const name = req.query.name;
    const product = await products.find(name);
    console.log(req.query.name);
    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Products not found",
      });
    } else {
      return res.status(200).json(product);
    }
  }

  static async getProductByIdx(req, res) {
    const {usercheck} = req.body;
    const find = await products
      .findById(req.params.id)
      .populate("seller", {
        name: 1
      })
      .populate("category")
      .populate("like.userLike", {
        name: 1
      })
      .populate("comment.userId", {
        name: 1
      });
    if (find) {
      await products.findByIdAndUpdate(req.params.id, {
        $push: {
          view: {userId: usercheck},
        },
      }, {
        new: true,
      });

      res.status(200).json(find);
    } else {
      res.status(404).json(err);
    }
  }
  static async filterbyCategory(req, res) {
    const product = await products.find({
      category: req.params.id,
    });
    if (!product) return res.status(404).json("invalid product");
    res.status(200).json(product);
  }

  //feed
  static async feedView(req, res) {
    const checkProduct = await products.find();
    let banyakView = 0;
    console.log('ini banyak view', banyakView);
    for(let i = 0 ; i < checkProduct.length; i++){
      const view = checkProduct[i].view;
      for(let j = 0; j < view.length; j++){
        const obj = Object.keys(view[j]).length;
        banyakView.push(obj);
        if(obj >= 3){
          res.status(200).json({
            message: "success get feed",
            product: checkProduct,
          });
          console.log('feed dapat 1')
        }else{
          console.log('feed tidak dapat 1')
        }
      }
    }
  }

  static async getProductByUser(req, res) {
    const product = await products
      .find({
        seller: req.params.id,
      })
      .populate("seller", {
        name: 1,
        image: 1,
        alamat: 1,
        email: 1,
        created_at: 1,
      })
      .populate("category");
    if (!product) return res.status(404).json("invalid product");
    if (product.length === 0) return res.status(404).json("kosong product");

    res.status(200).json({
      message: "success get product",
      product,
    });
  }

  static async sendMessageToBuy(req, res) {
    const product = await products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    const message = new messageModel({
      productId: req.params.id,
      sellerId: req.body.sellerId,
      buyerId: req.body.buyerId,
      message: req.body.message,
    });
    message
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
  static async getMessageToBuy(req, res) {
    const messageId = req.params.id;
    const message = await messageModel
      .find({
        messageId,
      })
      .populate("sellerId")
      .populate("buyerId")
      .populate("productId");
    if (!message) return res.status(404).json("invalid message");
    if (message.length === 0) return res.status(404).json("kosong message");
    res.status(200).json(message);
  }
  static getproductByIdnew(req, res) {
    const product = products.findById(req.params.id);
    if (!product) return res.status(404).json("invalid product");
    res.status(200).json(product);
  }
  static async getProductById(req, res) {
    const product = await products
      .findByIdAndUpdate(
        req.params.id, {
        $set: {
          numReviews: numReviews + 1,
        },
      }, {
        new: true,
      }
      )
      .populate("seller");
    if (!product) return res.status(404).json("invalid product");
    res.status(200).json({
      data: product,
      seller: product.seller,
    });
  }

  static async filterProductNew(req, res) {
    const nameProduct = req.body;
    const productfind = await products.findOne(nameProduct);
    if (productfind) {
      res.status(200).json(productfind);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  }

  static async updateProductImage(req, res) {
    const image = req.file;
    const basePath = `https://servicedealdulu.herokuapp.com/assets/images/${image.filename}`;

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
      ketentuan,
      numReviews,
      like,
      baru,
      isFeature,
    } = req.body;
    const product = await products.findById(req.params.id);
    const categoryId = await categories.findById(req.body.category);
    if (!categoryId) {
      return res.status(404).json({
        message: "invalid category",
      });
    }
    const changetolower = name.toLowerCase();
    const alamatTolower = alamat.toLowerCase();
    const changeToSPlitHargabeli = harga_beli.split(".").join("");
    const changeToSPlitHargajual = harga_jual.split(".").join("");
    const file = req.file;
    let imagePath;
    if (file) {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/assets/images/`;
      const imagePath = `${basePath}${fileName}`;
    } else {
      imagePath = product.image;
    }
    if (categoryId) { }
    const productFindandUpdate = await products.findByIdAndUpdate(
      req.params.id, {
      // $set: req.body, //if dont want to write to all field
      seller,
      name: changetolower,
      alamat: alamatTolower,
      description,
      richDecription,
      brand,
      harga_jual,
      harga_beli,
      category,
      countInStock,
      rating,
      ketentuan,
      numReviews,
      like,
      baru,
      isFeature,
    }, {
      new: true,
    }
    );
    if (productFindandUpdate) {
      res.status(200).json({
        message: "success update product",
        data: productFindandUpdate,
      });
    } else {
      res.status(500).json({
        message: "server Error",
      });
    }
  }

}

module.exports = ProductController;