const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const Post = require('../models/Post');


router.get('/', async(req, res) => {
    try {
        const posts = await Post.find();
        res.json();
    } catch (err) {
        res.json({ message: err })
    }
});

router.post('/', async(req, res) => {
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (error) {
        res.json({ message: error })
    }
});

router.get('/:postId', async(req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({ message: error })
    }
});

router.delete('/:postId', async(req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost)
    } catch (error) {
        res.json({ message: error })
    }
})

route.patch('/:postId', async(req, res) => {
    try {
        const updatePost = await Post.updateOne({ id: req.params.postId }, { $set: { title: req.body.title } });
        res.json(updatePost);
    } catch (error) {
        res.json({ message: error })
    }
})





module.exports = router;