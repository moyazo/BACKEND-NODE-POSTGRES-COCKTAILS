const Router = require('express').Router;
const jsonwebtoken = require('jsonwebtoken');
// const updateUserFavListRover =
//     require('../controllers/user.js').updateUserFavListRover;
// const updateUserFavListApod =
//     require('../controllers/user.js').updateUserFavListApod;
const getUserByEmail = require('../controllers/user.js').getUserByEmail;
const routerUser = Router();

// routerUser.post('/addFavoritesRover/:roverId', async (req, res) => {
//     try {
//         const { roverId } = req.params;
//         const { user, isAdded } = await updateUserFavListRover({
//             userId: req.user.id,
//             roverId,
//         });
//         console.log(isAdded);
//         if (isAdded) {
//             res.status(200).json('Favorites successfully added');
//         } else {
//             res.status(200).json('Favorites successfully removed');
//         }
//     } catch (error) {
//         if (error.message === 'No exist this data in database') {
//             res.status(404).json(error.message);
//         } else {
//             console.error(error);
//             res.status(500).json(error.message);
//         }
//     }
// });

// routerUser.post('/addFavoritesApod/:apodId', async (req, res) => {
//     try {
//         const { apodId } = req.params;
//         console.log(apodId);
//         const { user, isAdded } = await updateUserFavListApod({
//             userId: req.user.id,
//             apodId,
//         });
//         console.log(isAdded);
//         res.status(200).json({ isAdded });
//     } catch (error) {
//         if (error.message === 'No exist this data in database') {
//             res.status(404).json(error.message);
//         } else {
//             console.error(error);
//             res.status(500).json(error.message);
//         }
//     }
// });

// routerUser.get('/favList', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             where: { id: req.user.id },
//             attributes: {
//                 exclude: ['password', 'salt', 'createdAt', 'updatedAt'],
//             },
//             include: [
//                 {
//                     model: db.rover,
//                     through: 'userRover',
//                     as: 'roverFavorites',
//                 },
//                 {
//                     model: db.apod,
//                     through: 'userApod',
//                     as: 'apodFavorites',
//                 },
//             ],
//         });

//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// });

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
        console.log(error);
        res.status(500).json(error.message);
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
        console.log(req.params.token);
        const data = await getUserByEmail(payload.email);
        const userId = {
            id: data.id,
        };
        res.status(200).json(userId);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});

module.exports = routerUser;
