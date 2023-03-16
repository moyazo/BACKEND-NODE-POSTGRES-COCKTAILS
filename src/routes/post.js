const Router = require('express').Router;
const {
    createPost,
    getPostsByUserId,
    deletePost,
    getAllPosts,
    getPost,
    updatePost,
} = require('../controllers/post');
const routerFeed = Router();

/**
 * *CREATE POST ENDPOINT*
 * *This endpoint allows to the front-end create a post for the user and save it in our DB*
 * *ENDPOINT* 'localhost:8000/feeds'
 * @param {Request} req
 * @param {Response} res
 * @returns {Boolean}
 */
routerFeed.post('/', async (req, res) => {
    try {
        if (!req.body) res.status(403).json('BODY EMPTY');
        const newData = req.body;
        const Post = await createPost(newData);
        if (!Post) {
            res.status(403).json('ERROR 403, can not create new post');
        }
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
/**
 * *UPDATE POST ENDPOINT*
 * *This endpoint allows to the front-end modify a post from our DB*
 * *ENDPOINT* 'localhost:8000/feeds/:postId'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerFeed.put('/:postId', async (req, res) => {
    // CREATE POSTS
    try {
        if (!req.params.postId) res.status(403).json('postId empty');
        const postId = req.params.postId;
        if (!req.body) {
            res.status(403).json('BODY EMPTY');
        }
        const newData = req.body;
        const Post = await updatePost(postId, newData);
        if (!Post) {
            res.status(403).json('ERROR 403, can not create new post');
        }
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
/**
 * *GET BY USER ID ENDPOINT*
 * *This endpoint send to the front-end the data of all posts by user id of our DB*
 * *ENDPOINT* 'localhost:8000/feeds/posts/:userId'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerFeed.get('/posts/:userId', async (req, res) => {
    try {
        if (!req.params.userId) res.status(403).json('id user empty');
        const user_id = req.params.userId;
        const Posts = await getPostsByUserId(user_id);
        if (!Posts) res.status(403).json('USER DO NOT HAVE POSTS');
        res.status(200).json(Posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
/**
 * *GET BY ID ENDPOINT*
 * *This endpoint send to the front-end the data of a post by id of our DB*
 * *ENDPOINT* 'localhost:8000/feeds/:userId'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerFeed.get('/:postId', async (req, res) => {
    // POSTS DE USER
    try {
        if (!req.params.postId) res.status(403).json('postId empty');
        const postId = req.params.postId;
        const Post = await getPost(postId);
        if (!Post) res.status(403).json('POST NOT FOUND');
        res.status(200).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
/**
 * *GET ALL POSTS ENDPOINT*
 * *This endpoint send to the front-end the data of all posts of our DB*
 * *ENDPOINT* 'localhost:8000/feeds'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerFeed.get('/', async (req, res) => {
    // POSTS DE USER
    try {
        const posts = await getAllPosts(req.user.id);
        if (!posts) res.status(403).json('POSTS EMPTY');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});
/**
 * *DELETE POST ENDPOINT*
 * *This endpoint allow to the front-end delete a post by id of our DB*
 * *ENDPOINT* 'localhost:8000/feeds/:postId'
 * @param {Request} req
 * @param {Response} res
 * @returns {Boolean}
 */
routerFeed.delete('/:postId', async (req, res) => {
    // POSTS DE USER
    console.log('entramos');
    try {
        const postId = req.params.postId;
        const deleted = await deletePost(postId);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = routerFeed;
