const orderModel = require('../models/order');
const orderItemsModel = require('../models/order-items');

class OrderController {
    static async getOrder(req, res){
        try {
            const order = await orderModel.find().populate('user','name').sort({'dateOrder' : -1})
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
    
    static async getOrderById(req, res){
        try {
            const order = await orderModel.findById(req.params.id).populate('user','name')
            .sort({'dateOrder' : -1})
            .populate("orderItems")
            .populate({path: 'orderItems', populate: {path: 'product', populate: 'category'}})
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json(order);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async orderUpdateStatus(req, res){
        try {
            const order = await orderModel.findByIdAndUpdate(req.params.id, {
                status: req.body.status
            });
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json({message:"success update status"});
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async deleteOrder(req, res){
        try {
            const order = await orderModel.findByIdAndDelete(req.params.id);
            if(order){
                await order.orderItems.map(async orderItem => {
                    await orderItemsModel.findByIdAndDelete(orderItem);
                })
                return res.status(200).json({
                    message: 'Order deleted'
                });
            }
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    
    static async checkoutOrder(req, res){
        const orderItemsId = Promise.all(req.body.orderItems.map(async orderitem => {
            let newOrderItemId = new orderItemsModel({
                quantity: orderitem.quantity,
                product: orderitem.product
            })
            newOrderItemId = await newOrderItemId.save();

            return newOrderItemId._id;
        }));
        const  orderItemsIds = await orderItemsId;
        
        const totalPrices = await Promise.all(orderItemsIds.map(async orderItemId => {
            const orderItem = await orderItemsModel.findById(orderItemId).populate('product', 'price')
            const totalPrice = orderItem.product.harga_jual * orderItem.quantity;
            return totalPrice;
        }))
        const totalPricess = totalPrices.reduce((a, b) => a + b, 0);
        console.log(totalPricess)
        let order = new orderModel({
            orderItems: orderItemsIds,
            shippingAddress: req.body.shippingAddress,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zipCode: req.body.zipCode,
            phone: req.body.phone,
            totalPrice: totalPricess,
            status: req.body.status,
            user: req.body.user,
        })
        order = await order.save();
        return res.status(201).json(order);

    }

    static async getOrderTotalSales(req,res){
        try {
            const order = await orderModel.aggregate([
                {
                    $group: {
                        _id: null,
                        totalSales: {
                            $sum: "$totalPrice"
                        }
                    }
                }
            ]);
            if(!order){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json({totalsales: order.pop().totalSales});
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async orderCount(req, res){
        try {
            const orderCount = await orderModel.countDocuments();
            if(!orderCount){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json({count: orderCount});
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    static async getOrderUserId(req, res){
        try {
            const userorder = await orderModel.find({user: req.params.id}).populate('user','name')
            .sort({'dateOrder' : -1})
            .populate("orderItems")
            .populate({path: 'orderItems', populate: {path: 'product', populate: 'category'}})
            if(!userorder){
                return res.status(404).json({
                    message: 'Order not found'
                });
            }
            return res.status(200).json(userorder);
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
   
}

module.exports = OrderController;