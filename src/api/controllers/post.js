const postService = require('../services/post');
const {
    ObjectID
} = require('mongodb');



//create new post
exports.createPost = async (req, res) => {
    try {
        let postData = {
            ...req.body,
            author: req.user._id
        }
        const post = await postService.createPost(postData)
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}

//get all post
exports.getPosts = async (req, res) => {
    const match = {}
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const sort = {}

    if (req.query.published) {
        match.published = req.query.published === 'true'
    }
    if (req.query.sortBy && req.query.orderBy) {
        sort[req.query.sortBy] = req.query.orderBy === 'desc' ? -1 : 1;
    }
    try {
        const user = await postService.getPosts(req.user, match, limit, skip, sort);
        res.status(200).send(user.posts);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}
//get post by id
exports.getPostById = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).send({
            error: 'Bad request'
        })
    }
    try {
        const post = await postService.getPostById(req.user._id, postId);
        if (!post) {
            return res.status(200).send(post);
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        });
    }
}
//update post
exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'title'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        res.status(400).send({
            error: 'Bad request'
        });
    }
    try {
        const post = await postService.getPostById(req.user._id, postId);
        if (!post) {
            res.status(404).send({
                error: 'Content not found'
            });
        }
        updates.forEach((update) => post[update] = req.body[update]);
        await postService.updatePost(post);
        res.send(post);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
}
//delete post
exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    if (!ObjectID.isValid(postId)) {
        return res.status(400).send({
            error: 'Bad request'
        });
    }
    try {
        const deletePost = await postService.deletePost(req.user._id, postId);
        if (!deletePost) {
            return res.status(404).send({
                error: 'Content not found'
            });
        }
        res.status(200).send(deletePost);
    } catch (error) {
        res.status(500).send({
            error: 'Internal sever error'
        })
    }
}

//create post comment
exports.createPostComment = async (req, res) => {
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
    let commentData = {
        ...req.body,
        author: userId,
        postId: postId
    };
    try {
        const comment = await postService.createComment(commentData);
        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        });
    }
}
//get post comments
exports.getPostComments = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await postService.getComments(postId);
        res.status(200).send(post.comments);
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        });
    }
}