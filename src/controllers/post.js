const db = require('../models');
const Post = db.Post;
const createPost = async (data) => {
    console.log(data);

    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const getPosts = async (id) => {
    try {
        const Posts = await Post.findAll({ where: { user_FK: id } });
        return Posts;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

const deletePost = async (id) => {
    try {
        const destroyed = await Post.destroy({ where: { post_id: id } });
        return destroyed;
    } catch (error) {
        console.log('THIS IS HT ERROR, ' + error.message);
    }
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
};
