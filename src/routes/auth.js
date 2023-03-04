const { signup, login } = require('../controllers/auth');
const Router = require('express').Router;
const routerAuth = Router();

/**
 * *SIGN UP ENDPOINT*
 * *This endpoint allow gives the front-end the capability to sign up a user*
 * *ENDPOINT* 'localhost:8000/auth/signup'
 * @param {Request} req
 * @param {Response} res
 * @returns {String}
 */
routerAuth.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name){
            res.status(502).json('incorrect email or password');
        }
        const token = await signup(req.body);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR' + error.message);
    }
});
/**
 * *SIGN IN ENDPOINT*
 * *This endpoint allow gives the front-end the capability to sign in a user*
 * *ENDPOINT* 'localhost:8000/auth/login'
 * @param {Request} req
 * @param {Response} res
 * @returns {String}
 */
routerAuth.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        !email || (!password && res.status(502).json('Login failed'));
        const token = await login({ email, password });
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR' + error.message);
    }
});

module.exports = routerAuth;
