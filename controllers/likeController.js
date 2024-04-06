// const Comment = require("../models/comments")
// exports.createComment = async (req, res) => {
//   try {
//     const { postId, userId, text } = req.body;
//     const comment = await Comment.create({ postId, userId, text });
//     res.status(201).json({ comment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getCommentsByPostId = async (req, res) => {
//   try {
//     const postId = req.params.postId;
//     const comments = await Comment.find({ postId });
//     res.status(200).json({ comments });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// likeController.js

// const Like = require('../models/likeModel');
const Like = require("../models/like")
// exports.likePost = async (req, res) => {
//   try {
//     const { userId, postId } = req.body;

//     // Check if the user has already liked the comment
//     const existingLike = await Like.findOne({ userId, postId });

//     if (existingLike) {
//       return res.status(400).json({ message: 'Comment already liked' });
//     }

//     // Create a new like
//     const newLike = new Like({ userId, postId });
//     await newLike.save();

//     res.status(201).json({ message: 'Post liked successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.unlikePost = async (req, res) => {
//   try {
//     const { userId, postId } = req.body;

//     // Find and delete the like
//     await Like.findOneAndDelete({ userId, postId });

//     res.status(200).json({ message: 'Comment unliked successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.toggleLike = async (req, res) => {
    try {
      const { userId, postId } = req.body;
  
      // Find the like for the user and post
      let like = await Like.findOne({ userId, postId });
  
      if (!like) {
        // If like doesn't exist, create a new one
        like = new Like({ userId, postId, liked: true });
        await like.save();
      } else {
        // If like exists, toggle the liked status
        like.liked = !like.liked;
        await like.save();
      }
  
      // Get the total like count for the post
      const totalLikes = await Like.countDocuments({ postId, liked: true });
  
      res.status(200).json({ liked: like.liked, totalLikes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getTotalLikes = async (req, res) => {
    try {
      const postId = req.params.postId;
      const totalLikes = await Like.countDocuments({ postId, liked: true });
      res.status(200).json({ totalLikes });
      console.log(totalLikes)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };