const db = require('../models');
const Post = db.Post;
const createPost = async (data) => {
    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
const updatePost = async (id, data) => {
    try {
        return Post.update(data, {
            where: { id },
        });
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};

const getPosts = async (id) => {
    try {
        const Posts = await Post.findAll({ where: { user_FK: id } });
        return Posts;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
const getPost = async (id) => {
    try {
        return Post.findByPk(id);
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
const getAllPosts = async () => {
    try {
        const Posts = await Post.findAll();
        return Posts;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};

const deletePost = async (id) => {
    try {
        const destroyed = await Post.destroy({ where: { post_id: id } });
        return destroyed;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};

module.exports = {
    createPost,
    getPosts,
    deletePost,
    getAllPosts,
    getPost,
    updatePost,
};
