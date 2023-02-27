const Router = require('express').Router;
const { apiCallByFirstLetter } = require('../services/cocktailApi');
const { createPost,getPosts } = require('../controllers/post')
const routerPostFeed = Router();

routerPostFeed.post('/createPost', async (req, res) => {
    try {
        const newData = req.body;
        console.log(newData)
        const Post = await createPost(newData);
        if(!Post)
            res.status(500).json('ERROR 403, can not create new post');
        
            res.status(500).json(Post);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

routerPostFeed.get('/:userId', async (req, res) => {
    try {
        const user_id = req.params.userId;
        const Posts = await getPosts(user_id);
        if(!Posts)
            res.status(500).json('ERROR 403, posts do not exist');
        
            res.status(500).json(Posts);
    } catch (error) {
        console.log(error);
        res.status(500).json('No new documents found' + error.message);
    }
});

module.exports = routerPostFeed;