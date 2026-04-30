const User = require('../models/User');

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.profilePic = req.body.profilePic || user.profilePic;
      user.about = req.body.about || user.about;

      if (req.body.password) {
        const bcrypt = require('bcrypt');
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        profilePic: updatedUser.profilePic,
        about: updatedUser.about
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(403).json({ message: 'You cannot follow yourself' });
    }

    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!targetUser.followers.includes(req.user._id)) {
      await targetUser.updateOne({ $push: { followers: req.user._id } });
      await currentUser.updateOne({ $push: { following: req.params.id } });
      res.status(200).json({ message: 'User has been followed' });
    } else {
      await targetUser.updateOne({ $pull: { followers: req.user._id } });
      await currentUser.updateOne({ $pull: { following: req.params.id } });
      res.status(200).json({ message: 'User has been unfollowed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile, updateUserProfile, followUser };
