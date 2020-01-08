'use strict'
const router = require('express').Router();
const postController = require('../controllers/post')
const auth = require('../middleware/auth');

//[/api/posts/]
router.route('/')
    .post(auth, postController.createPost)
    .get(auth, postController.getPosts);

//[/api/posts/:id]
router.route('/:id')
    .get(auth, postController.getPostById)
    .put(auth, postController.updatePost)
    .delete(auth, postController.deletePost)
//[/api/posts/:id/comment]
router.route('/:id/comment')
    .post(auth, postController.createPostComment)
    .get(auth, postController.getPostComments)

module.exports = router;