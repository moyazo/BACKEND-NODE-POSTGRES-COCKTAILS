const Router = require('express').Router;
const { createPost, getPosts, deletePost } = require('../controllers/post');
const routerPostFeed = Router();

routerPostFeed.post('/createPost', async (req, res) => {
    // CREAR POSTS
    try {
        console.log(req.body);
        const newData = req.body;
        console.log(newData);
        const Post = await createPost(newData);
        if (!Post) res.status(403).json('ERROR 403, can not create new post');
        // const Posts = await getPosts(user_id);
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerPostFeed.get('/:userId', async (req, res) => {
    // POSTS DE USER
    try {
        const user_id = req.params.userId;
        const Posts = await getPosts(user_id);
        if (!Posts) res.status(500).json('ERROR 403, posts do not exist');

        res.status(500).json(Posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerPostFeed.delete('/:postId', async (req, res) => {
    // POSTS DE USER
    try {
        const postId = req.params.postId;
        const deleted = await deletePost(postId);
        if (!Posts) res.status(500).json('ERROR 403, can not delete post');

        res.status(500).json(deleted);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerPostFeed;
