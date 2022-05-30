const chartModel = require('../models/chart');
const transactionModel = require('../models/transaction');
const orderModel = require('../models/order');
const userModel = require('../models/user');
const productModel = require('../models/product');
const checkoutlistModel = require('../models/checkout')
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
        const findProduct = await productModel.findById(productId);
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
        } else if (findProduct.countInStock < 0) {
            res.status(500).json({
                message: 'Product sudah habis'
            });
        } else if (find === null) {
            const newChart = await new chartModel({
                productId,
                userId,
                quantity,
                totalHarga: quantity * findProduct.harga_jual
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
        }).populate('productId', { name: 1 }).populate('userId', { name: 1 });

        const totalAllQty = cart.reduce((acc, curr) => {
            return acc + curr.quantity;
        }, 0);
        let hasilT = 0
        console.log(hasilT)
        for (let i = 0; i < cart.length; i++) {
            const haillop = (cart[i].totalHarga * cart[i].quantity)
            console.log(haillop * totalAllQty)
            // hasilT.push(haillop)
            hasilT = (haillop * totalAllQty)

        }
        // console.log(hasilT)
        const totalprice = cart.totalHarga * totalAllQty;
        // const total = cart.reduce((acc, curr) => {
        //     return acc + curr.totalAllQty * curr.productId.harga_jual;
        // }, 0);
        
        res.status(200).json({
            message: 'Successfully get cart',
            data: cart,
            total: hasilT,
            totalAllQty
        });
    }
    static async chooseToCheckout(req, res) {
        const {
            cartid,
            userId
        } = req.body;
        const createCheckoutList = await new checkoutlistModel({
            cartid,
            userId
        })
        if (createCheckoutList) {
            createCheckoutList.save();
            res.status(201).json({
                message: 'success add to checkout list',
                data: createCheckoutList
            })
        } else {
            res.status(400).json({
                message: 'error system'
            })
        }
    }
    static async getCheckList(req, res) {
        let reciveTotal;
        console.log(reciveTotal)
        const userId = req.params;
        const findList = await checkoutlistModel.findOne(userId).populate('cartid.cartid').populate('cartid.cartid.productId')
        const totalShouldPay = findList.cartid
        for(let i = 0; i < totalShouldPay.length; i++){
            console.log(totalShouldPay[i].cartid.totalHarga)
            const hasiltotalCheckout = totalShouldPay[i].cartId
            // reciveTotal.push(hasiltotalCheckout.totalHarga)
        }
        console.log(totalShouldPay)
        const findProduct = await productModel.findOne(findList.cartid.productId)
        if (findList != null) {
            res.status(200).json({
                message: 'get success',
                data: findList,
                findProduct
            })
        } else {
            res.status(404).json({
                message: 'data kosong'
            })
        }
    }
    static async checkout(req, res) {
        const cartId = req.params.cartId;
        const cart = await chartModel.findById(cartId).populate('productId');
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
            user: cart.userId,
        });
        const notification = await userModel.findByIdAndUpdate(cart.productId.seller, {
            $set: {
                notification: [{
                    user: cart.userId,
                    message: `${cart.productId} telah dipesan`,
                    status: 'unread'
                }]
            }
        });
        const newTransaction = await new transactionModel({
            userId: cart.userId,
            productId: cart.productId,
            quantity: cart.quantity,
            status: false,
            productSeller: notification,
            message: 'Pesanan akan diproses, mohon lakukan pembayaran ke system kami, agar pesanan bisa di kirim'
        });
        await newTransaction.save();
        await savetoOrder.save();
        await chartModel.findByIdAndDelete(cartId);
        res.status(200).json({
            message: 'Successfully checkout',
            data: newTransaction
        });
    }

    static async removeCart(req, res) {

    }
    static async getOrder(req, res) {
        const orderId = req.params.userId;
        const order = await orderModel.findById(orderId).populate('productOrder').populate('user');
        if (order) {
            res.status(200).json({
                message: 'Successfully get order',
                data: order
            });
        } else {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

    static async getOrderByUser(req, res) {
        const userId = req.params.userId;
        const order = await orderModel.findOne(userId).populate('productOrder').populate('user');
        if (order) {
            res.status(200).json({
                message: 'Successfully get order',
                data: order,
            });
        } else {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }

    }
    static async getTransactionById(req, res) {
        const transactionUserId = req.params.transactionUserId;
        const transaction = await transactionModel.findOne(transactionUserId).populate('productId').populate('userId');
        if (transaction) {
            res.status(200).json({
                message: 'Successfully get transaction',
                data: transaction
            });
        } else {
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }

}
module.exports = ChartItems;