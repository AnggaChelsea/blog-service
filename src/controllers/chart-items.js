const chartModel = require('../models/chart');
const transactionModel = require('../models/transaction');
const orderModel = require('../models/order');
class ChartItems {
    static async addCart(req, res) {
        const {
            productId,
            userId,
            quantity
        } = req.body;

        const find = await chartModel.findOne({
            userId,
            productId
        });
        if (find !== null) {
            const findupdate = await chartModel.findOneAndUpdate({
                userId,
                productId
            }, {
                $inc: {
                    quantity: +quantity
                }
            });
            findupdate.save();
            res.status(200).json({
                message: 'Successfully add cart',
                data: findupdate
            });

        } else if (find === null) {
            const newChart = await new chartModel({
                productId,
                userId,
                quantity
            });
            await newChart.save();
            res.status(201).json({
                message: 'Successfully added to cart',
                data: newChart
            });
        } else {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }

    }
    static async getCartByUser(req, res) {
        const {
            userId
        } = req.params;
        const cart = await chartModel.find({
            userId
        }).populate('productId')
        const total = cart.reduce((acc, curr) => {
            return acc + curr.quantity * curr.productId.harga_jual;
        }, 0);
        res.status(200).json({
            message: 'Successfully get cart',
            data: cart,
            total
        });
    }
    static async checkout(req, res) {
        const cartId = req.params.cartId;
        const cart = await chartModel.findById(cartId).populate('productId');
        const total = cart.quantity * cart.productId.harga_jual;
        const {
            productOrder,
            provinsi,
            kabupaten,
            kecamatan,
            desa,
            alamatSesuaiKTP,
            kodePos,
            phone,
            user
        } = req.body;
        const savetoOrder = await new orderModel({
            productOrder: [cartId],
            provinsi,
            kabupaten,
            kecamatan,
            desa,
            alamatSesuaiKTP,
            kodePos,
            phone,
            user: cart.userId
        });
        const newTransaction = await new transactionModel({
            userId: cart.userId,
            productId: cart.productId,
            quantity: cart.quantity,
            total
        });
        await newTransaction.save();
        await savetoOrder.save();
        await chartModel.findByIdAndDelete(cartId);
        res.status(200).json({
            message: 'Successfully checkout',
            data: newTransaction
        });
    }
}
module.exports = ChartItems;