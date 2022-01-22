const categories = require('../models/category');

class CategoryController {
    static async getAllCategories(req, res) {
        const category = await categories.find();
        if (!category) {
            res.status(404).json({
                status: 404,
                message: "Categories not found"
            })
        } else {
            res.status(200).json(category)
        }
    }
    static async addCategory(req, res) {
        try {
            const category = new categories({
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color,
            });
            category
                .save()
                .then((response) => {
                    res.status(200).json({message:"success add category", data:response});
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        } catch (err) {
            res.status(500).json(err);
        }
    }
    static deleteCategory(req, res) {
        categories.findByIdAndDelete(req.params.id)
            .then((response) => {
                res.status(200).json({message:"success delete category", data:response});
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }
}


module.exports = CategoryController;