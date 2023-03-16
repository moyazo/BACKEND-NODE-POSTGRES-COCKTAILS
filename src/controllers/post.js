const db = require('../models');
const Post = db.Post;
const subCocktail = db.subCocktail;
/**
 * *createPost*
 * *This function creates a new Post*
 * @param {JSON} data
 * @returns {Post}
 */
const createPost = async (data) => {
    try {
        const newPost = await Post.create(data);
        return newPost;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
/**
 * *updatePost*
 * *This function update the post depending on the id given and the data the front-end wants to modify*
 * @param {String} id
 * @param {JSON} data
 * @returns {JSON}
 */
const updatePost = async (id, data) => {
    try {
        return Post.update(data, {
            where: { id },
        });
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
/**
 * *getPostsByUserId*
 * *This function call to all the posts by user id from our DB*
 * @param {String} id
 * @returns {JSON}
 */
const getPostsByUserId = async (id) => {
    try {
        const Posts = await Post.findAll({ where: { user_FK: id } });
        return Posts;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
/**
 * *getPost*
 * *This function call to a the post by id from our DB*
 * @param {String} id
 * @returns {JSON}
 */
const getPost = async (id) => {
    try {
        return Post.findByPk(id);
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
/**
 * *getAllPosts*
 * *This function call to a all posts from our DB*
 * @returns {JSON}
 */
const getAllPosts = async (userId) => {
    try {
        const posts = await Post.findAll();
        if (userId) {
            const postsIds = posts.map((post) => post.id);
            const favoritesPosts = await db.postUserFavorites.findAll({
                where: {
                    post_favorite_FK: postsIds,
                    user_favorites_FK: userId,
                },
            });
            return posts.map((post) => {
                const isFav = !!favoritesPosts.find(
                    (item) => item.post_favorite_FK === post.id
                );
                return { ...post.dataValues, isFav };
            });
        }
        return posts;
    } catch (error) {
        console.log('THIS IS THE ERROR, ' + error.message);
    }
};
/**
 * *deletePost*
 * *This function delete a post by id from our DB*
 * @returns {Boolean}
 */
const deletePost = async (id) => {
    const post = await Post.findOne({ where: { id } });
    if (!post) {
        throw new Error('Post not found');
    }
    const destroyed = await Post.destroy({ where: { id } });
    return destroyed;
};

module.exports = {
    createPost,
    getPostsByUserId,
    deletePost,
    getAllPosts,
    getPost,
    updatePost,
};
