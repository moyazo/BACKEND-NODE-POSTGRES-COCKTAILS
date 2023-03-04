const Router = require('express').Router;
const {
    createPost,
    getPosts,
    deletePost,
    getAllPosts,
    getPost
} = require('../controllers/post');
const routerFeed = Router();

routerFeed.post('/createPost', async (req, res) => {
    // CREATE POSTS
    try {
        if (!req.body) res.status(403).json('BODY EMPTY');
        const newData = req.body;
        const Post = await createPost(newData);
        if (!Post) res.status(403).json('ERROR 403, can not create new post');
        // const Posts = await getPosts(user_id);
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerFeed.get('/posts/:userId', async (req, res) => {
    // POSTS DE USER
    try {
        if (!req.params.userId) res.status(403).json('id user empty');
        const user_id = req.params.userId;
        const Posts = await getPosts(user_id);
        if (!Posts) res.status(403).json('USER DO NOT HAVE POSTS');
        res.status(200).json(Posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
routerFeed.get('/:postId', async (req, res) => {
    // POSTS DE USER
    try {
        if (!req.params.postId) res.status(403).json('postId empty');
        const postId = req.params.postId;
        const Post = await getPost(postId);
        if (!Post) res.status(403).json('USER DO NOT HAVE POSTS');
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
routerFeed.get('/all-posts', async (req, res) => {
    // POSTS DE USER
    try {
        const Posts = await getAllPosts();
        if (!Posts) res.status(403).json('POSTS EMPTY');
        res.status(200).json(Posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerFeed.delete('/:postId', async (req, res) => {
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

module.exports = routerFeed;
