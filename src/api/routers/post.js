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
    });

//Read single post
router.route('/:id')
    .get(auth, async (req, res) => {
        const _id = req.params.id;
        if (!ObjectID.isValid(_id)) {
            return res.status(400).send({
                error: 'Bad request'
            })
        }
        try {
            const post = await Post.findOne({
                _id,
                author: req.user._id
            });
            if (!post) {
                return res.status(200).send(post);
            }
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    })
    .put(auth, async (req, res) => {
        const postid = req.params.id;
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'title'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (isValidOperation) {
            res.status(400).send({
                error: 'Bad request'
            });
        }
        try {
            const post = await Post.findOne({
                _id: postid,
                author: req.user._id
            })
            if (!post) {
                res.status(404).send({
                    error: 'Content not found'
                });
            }
            updates.forEach((update) => post[update] = req.body[update]);
            await post.save();
            res.send(post);
        } catch (error) {
            res.status(500).send({
                error: error.message
            });
        }
    })
    .delete(auth, async (req, res) => {
        const postId = req.params.id;
        if (!ObjectID.isValid(postId)) {
            return res.status(400).send({
                error: 'Bad request'
            });
        }
        try {
            const deletePost = await Post.findOneAndDelete({
                _id: postId,
                author: req.user._id
            });
            if (!deletePost) {
                return res.status(404).send({
                    error: 'Content not found'
                });
            }
        } catch (error) {
            res.status(500).send({
                error: 'Internal sever error'
            })
        }
    })



module.exports = router;