const commentModel = require('../../models/comment');
const productModel = require('../../models/product');
const userModel = require('../../models/user');

class CommentController {
  static async getAllComments(req, res) {
    try {
      const comments = await commentModel.find({});
      res.status(200).json({
        message: 'success',
        data: comments
      });
    } catch (error) {
      res.status(500).json({
        message: 'error',
        data: error
      });
    }
  }

  static async addComment(req, res) {
    try {
      const {
        productId,
        userId,
        comment
      } = req.body;
      const newComment = await commentModel.create({
        productId,
        userId,
        comment
      });
      res.status(201).json({
        message: 'success',
        data: newComment
      });
    } catch (error) {
      res.status(500).json({
        message: 'error',
        data: error
      });
    }
  }

  static async getCommentById(req, res) {
    try {
      const {
        id
      } = req.params;
      const comment = await commentModel.findById(id);
      res.status(200).json({
        message: 'success',
        data: comment
      });
    } catch (error) {
      res.status(500).json({
        message: 'error',
        data: error
      });
    }
  }

  static async updateComment(req, res) {
    try {
      const {
        id
      } = req.params;
      const {
        comment
      } = req.body;
      const updateComment = await commentModel.findByIdAndUpdate(id, {
        comment
      });
      res.status(200).json({
        message: 'success',
        data: updateComment
      });
    } catch (error) {
      res.status(500).json({
        message: 'error',
        data: error
      });
    }
  }

  static async deleteComment(req, res) {
    try {
      const {
        id
      } = req.params;
      const deleteComment = await commentModel.findByIdAndDelete(id);
      res.status(200).json({
        message: 'success',
        data: deleteComment
      });
    } catch (error) {
      res.status(500).json({
        message: 'error',
        data: error
      });
    }
  }
}

module.exports = CommentController;