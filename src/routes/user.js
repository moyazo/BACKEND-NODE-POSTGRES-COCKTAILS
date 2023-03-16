const Router = require('express').Router;
const jsonwebtoken = require('jsonwebtoken');
const {
    updateUserFavListPost,
    getUserFavorites,
} = require('../controllers/user.js');
const getUserByEmail = require('../controllers/user.js').getUserByEmail;
const routerUser = Router();

routerUser.post('/toggle-post-fav/', async (req, res) => {
    try {
        const { postId } = req.body;

        const { user, isAdded } = await updateUserFavListPost({
            userId: req.user.id,
            postId,
        });
        if (isAdded) {
            res.status(200).json('Favorites successfully added');
        } else {
            res.status(200).json('Favorites successfully removed');
        }
    } catch (error) {
        if (error.message === 'No exist this data in database') {
            res.status(404).json(error.message);
        } else {
            res.status(500).json(error.message);
        }
    }
});

routerUser.get('/favList/:userID', async (req, res) => {
    try {
        const userId = req.params.userID;
        if (userId) {
            res.status(403).json('req.params.userID is empty');
        }
        const userFavorites = await getUserFavorites(userId);
        if (userFavorites) {
            res.status(403).json('userFavorites is empty');
        }
        res.status(200).json(userFavorites);
    } catch (error) {
        res.status(500).json('Error at bring userFavorites' + error.message);
    }
});

/**
 * *PROFILE ENDPOINT*
 * *This endpoint calls to our DB in order to get data from one user to show it at the profile section of the front-end*
 * *ENDPOINT* 'localhost:8000/users/profile'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerUser.get('/profile', async (req, res) => {
    try {
        const data = await getUserByEmail(req.user.email);
        await data.reload();
        const user = {
            id: data.id,
            email: data.email,
            name: data.name,
        };
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Error at get Profile' + error.message);
    }
});
/**
 * *ID USER ENDPOINT*
 * *This endpoint calls to our DB in order to get the id from one user to call POST FEEDS ENDPOINT to post a cocktail depending on the user id given*
 * *ENDPOINT* 'localhost:8000/users/profile'
 * @param {Request} req
 * @param {Response} res
 * @returns {JSON}
 */
routerUser.get('/id/:token', async (req, res) => {
    try {
        const payload = jsonwebtoken.decode(
            req.params.token,
            process.env.TOKEN_SECRET
        );
        const data = await getUserByEmail(payload.email);
        const userId = {
            id: data.id,
        };
        res.status(200).json(userId);
    } catch (error) {
        res.status(500).json('Error at bring userId for post' + error.message);
    }
});

module.exports = routerUser;
