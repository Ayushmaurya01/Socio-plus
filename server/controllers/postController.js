const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  try {
    const { fileType, fileUrl, description, location } = req.body;
    
    const newPost = await Post.create({
      userId: req.user._id,
      fileType,
      fileUrl,
      description,
      location
    });

    const post = await Post.findById(newPost._id).populate('userId', 'username profilePic');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    let posts;

    if (!currentUser.following || currentUser.following.length === 0) {
      posts = await Post.find({})
        .populate('userId', 'username profilePic')
        .populate('comments.userId', 'username profilePic')
        .sort({ createdAt: -1 });
    } else {
      const userIds = [...currentUser.following, req.user._id];
      posts = await Post.find({ userId: { $in: userIds } })
        .populate('userId', 'username profilePic')
        .populate('comments.userId', 'username profilePic')
        .sort({ createdAt: -1 });
    }
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post.likes.includes(req.user._id)) {
      await post.updateOne({ $push: { likes: req.user._id } });
      res.status(200).json({ message: 'Post liked' });
    } else {
      await post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).json({ message: 'Post unliked' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    const comment = {
      userId: req.user._id,
      text: req.body.text
    };

    post.comments.push(comment);
    await post.save();

    const updatedPost = await Post.findById(req.params.id).populate('comments.userId', 'username profilePic');
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getFeedPosts, likePost, commentPost };
