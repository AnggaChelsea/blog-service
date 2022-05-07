const chartModel = require('../models/chart');

class ChartItems {
    static async addCart(req, res) {
        const { productId, userId, quantity } = req.body;
        const newChart = new chartModel({
            productId,
            userId,
            quantity
        });
        
        await newChart.save();
        res.status(201).json({
            message: 'Successfully added to cart',
            data: newChart
        });
    }
    static async getCartByUser(req, res) {
        const { userId } = req.params;
        const cart = await chartModel.find({ userId }).populate('productId')
        // let countProduct = 0;
        // for(let i = 0; i < cart.productId.length; i++) {
        //     if(cart.productId[i] === '0') countProduct++;
        // }
        res.status(200).json({
            message: 'Successfully get cart',
            data: cart,
            // totalCart: countProduct
        });

    }
}
module.exports = ChartItems;