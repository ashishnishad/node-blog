const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try{
        const post = await Post.create({
            ...req.body,
            createdBy: req.user.id
        });

        res.status(201).json(post);
    } catch (err){
        res.status(400).json({ error: err.message });
    }
}

exports.getPosts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page-1)*limit;

        const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
        const total = await Post.countDocuments();

        res.status(200).json({posts, total, page, limit});
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err){
        res.status(500).json({ error: err.message });
    }
}

exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) res.status(404).json({ message: 'Post not found' });

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (err){
        res.status(500).json({ message: 'Error deleting post', error: err.message });
    }
}