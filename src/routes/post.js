const Router = require('express').Router;
const { apiCallByFirstLetter } = require('../services/cocktailApi');
const { createPost } = require('../controllers/post')
const routerPostFeed = Router();

routerPostFeed.post('/createPost', async (req, res) => {
    try {
        console.log('entramos')
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

module.exports = routerPostFeed;