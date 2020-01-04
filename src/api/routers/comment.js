'use strict'
const router = require('express').Router();
const Comment = require('../models/comment');
const Post = require('../models/post');
const auth = require('../middleware/auth');
const {
    ObjectID
} = require('mongodb');

router.route('/:id/comment')
    .post(auth, async (req, res) => {
        const postId = req.params.id;
        const userId = req.user._id;
        if (!ObjectID.isValid(postId)) {
            return res.status(400).send({
                error: 'Bad request'
            });
        }

        if (!ObjectID.isValid(userId)) {
            return res.status(400).send({
                error: 'Bad request'
            });
        }
        const comment = new Comment({
            ...req.body,
            author: userId,
            postId: postId
        });
        try {
            await comment.save();
            res.status(201).send(comment);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    })
    .get(auth, async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await Post.findOne({
                _id: postId
            });
            await post.populate('comments').execPopulate();
            res.status(200).send(post.comments);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    })

module.exports = router;