const productModel = require("../../models/allproducts");

class GetProduct {
    static async getproduct(req, res, next) {
        const product = await productModel.find();
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Products not found",
            });
        }
        return res.status(200).json(product);
    }
    static async createNewProducts(req, res) {
        const product = await productModel.create(req.body);
        if (!product) {
            return res.status(404).json({
                status: 404,
                message: "Products not found",
            });
        }
        return res.status(200).json(product);
    }
}

module.exports = GetProduct;