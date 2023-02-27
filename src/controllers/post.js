const db = require('../models');
const Post = db.Post;
const createPost = async (data) => {
    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    createPost
};