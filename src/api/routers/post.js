'use strict'
const router = require('express').Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const auth = require('../middleware/auth');
const {
    ObjectID
} = require('mongodb');

router.route('/')
    .post(auth, async (req, res) => {
        const post = new Post({
            ...req.body,
            author: req.user._id
        });
        try {
            await post.save();
            res.status(201).send(post);
        } catch (error) {
            res.status(400).send({
                error: error.message
            });
        }
    })
    .get(auth, async (req, res) => {
        try {
            const posts = await Post.find({})
            res.status(200).send(posts);
        } catch (error) {
            res.status(500).send({
                error: error.message
            });
        }
    })

module.exports = router;