const Post = require('../models/post');
const Comment = require('../models/comment');

//create new post
exports.createPost = async (postData) => {
    try {
        const post = new Post(postData);
        return await post.save();
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//get all posts
exports.getPosts = async (user, match, limit, skip, sort) => {
    try {
        return await user.populate({
            path: 'posts',
            match,
            options: {
                limit: limit,
                skip: skip,
                sort
            }
        }).execPopulate();
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//get post by id
exports.getPostById = async (userId, postId) => {
    try {
        await Post.findOne({
            postId,
            author: userId
        });
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//update post
exports.updatePost = async (updatedPost) => {
    try {
        return await updatedPost.save();
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//delete post
exports.deletePost = async (userId, postId) => {
    try {
        return await Post.findOneAndDelete({
            _id: postId,
            author: userId
        });
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//create new post comment
exports.createComment = async (commentData) => {
    try {
        const comment = new Comment(commentData);
        return await comment.save()
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}
//get post comments
exports.getComments = async (postId) => {
    try {
        const post = await Post.findOne({
            _id: postId
        });
        return await post.populate('comments').execPopulate();
    } catch (error) {
        throw new Error({
            error: 'Database error'
        });
    }
}