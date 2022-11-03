// GETTING POST MODEL
const Posts = require("../model/post");
const mongoose = require("mongoose");

// CONTROLLER FOR LIST POSTS
exports.listPosts = async (req, res) => {
  try {
    const postList = await Posts.find({}).sort({ _id: -1 });
    if (postList) {
      return res.status(200).json(postList);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "posts not found",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
};

// CONTROLLER FOR GETTING POST BY ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      return res.status(200).json(post);
    } else {
      return res.status(500).json({
        status: "failed",
        message: "failed to get post",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
};

// CONTROLLER FOR CREATE NEW POST
exports.createPost = async (req, res) => {
  const postData = new Posts(req.body);
  try {
    const createdPost = await postData.save();
    if (createdPost) {
      return res.status(201).json(createdPost);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "failed to add post",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
  // res.send('create post')
};

// CONTROLLER FOR ADDING REVIEW
exports.addComment = async (req, res) => {
  try {
    const userData = { user: req.body.user, comment: req.body.comment };
    const filter = { _id: req.params.id };
    const update = {
      $push: { comments: userData },
    };
    const updatedPost = await Posts.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    if (updatedPost) {
      return res.status(201).json(updatedPost);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "failed to add comment",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
};

// CONTROLLER FOR ADDING REVIEW
exports.addLike = async (req, res) => {
  try {
    const userId = { user: req.body.user };
    const filter = { _id: req.params.id };
    const update = { $push: { likes: userId } };
    const updatedPost = await Posts.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    if (updatedPost) {
      return res.status(201).json(updatedPost);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "failed to like",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
};

// CONTROLLER FOR ADDING REVIEW
exports.addDislike = async (req, res) => {
  try {
    const userId = { user: req.body.user };
    const filter = { _id: req.params.id };
    const update = { $push: { dislikes: userId } };
    const updatedPost = await Posts.findOneAndUpdate(filter, update, {
      returnDocument: "after",
    });
    if (updatedPost) {
      return res.status(201).json(updatedPost);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "failed to dislike",
        error: err,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error: err,
    });
  }
};
