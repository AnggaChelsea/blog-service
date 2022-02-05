const Product = require('../models/product');

class HomeController {
    static index(req, res) {
        Product.find({}, (err, products) => {
            if (err) {
                res.status(500).json({ message: err });
            } else {
                res.status(200).json({ message: "success", data: products });
            }
        });
    }
}