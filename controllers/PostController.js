const Post = require("../models/postModels");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "succes",
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json({
      status: "succes",
      data: { post },
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.json({
      status: "succes",
      data: { post },
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "succes",
      data: { post },
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "succes",
    });
  } catch (error) {
    res.status(500);
    console.error(error);
  }
};
