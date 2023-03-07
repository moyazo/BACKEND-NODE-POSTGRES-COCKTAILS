const db = require('../models/index.js');
const user = require('../models/user.js');
const User = db.User;
const Post = db.Post;

const getUserId = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

/**
 * *GET USER BY EMAIL*
 * *This function is called at users route. Get a user by email from our DB*
 * @param {String} email
 * @returns {User}
 */
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email: email } });
        return user;
    } catch (error) {
        console.log('este es el error ' + error.message);
    }
};

const updateUserFavListPost = async ({ userId, postId }) => {
    const user = await User.findByPk(userId, {
        attributes: { exclude: ['password', 'salt'] },
        include: {
            model: db.Post,
            as: 'postsFavorites',
        },
    });
    const currentFavList = user.postsFavorites.map((item) => item.id) || [];

    const existed = currentFavList.includes(postId);

    let isAdded = false;
    if (!existed) {
        console.log(postId)
        const post = await Post.findByPk(postId);
        if (!post) {
            throw new Error('Post not found');
        }
        user.addPostsFavorites(post);
        isAdded = true;
    } else {
        const newList = currentFavList.filter((item) => item !== postId);
        user.setPostsFavorites(newList);
    }

    return { user, isAdded };
};


const getUserFavorites = async (userId) => {
    try {
        const user = await User.findByPk(userId,{include: {
            attributes: { exclude: ['password', 'salt'] },
            model: db.Post,
            as: 'postsFavorites',
        }});
        return user.postsFavorites;
    } catch (error) {
        console.log('Error at bring user favorites' + error.message);
    }
    
}
module.exports = {
    getUserByEmail,
    getUserId,
    updateUserFavListPost,
    getUserFavorites
};
