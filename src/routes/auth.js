const { signup, login } = require('../controllers/auth');
const Router = require('express').Router;
const routerAuth = Router();

routerAuth.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        !email ||
            (!password && res.status(502).json('incorrect email or password'));
        const token = await signup(req.body);
        res.status(200).json(token);
    } catch (error) {
        res.status(500).json('THIS IS THE ERROR' + error.message);
    }
});

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
