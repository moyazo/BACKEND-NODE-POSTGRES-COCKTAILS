const jsonwebtoken = require('jsonwebtoken');
const db = require('../models/index.js');
const User = db.User;

const ensureAuthenticated = async (req, res, next) => {
    req.path.includes('/auth') && next();

    !req.headers.authorization &&
        res.status(403).json({ message: 'You are not authenticated' });

    const token = req.headers.authorization.split(' ')[1];

    !token && res.status(403).json({ message: 'Invalid token' });

    const payload = jsonwebtoken.decode(token, process.env.TOKEN_SECRET);

    !payload ||
        (!payload.email && res.status(403).json({ message: 'Invalid token' }));

    const user = await User.findOne({ where: { email: payload.email } });

    !user && res.status(403).json({ message: 'Invalid token' });

    req.user = user;

    return next();
};

module.exports = ensureAuthenticated;
