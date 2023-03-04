const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const saltRounds = 10;
const getUserByEmail = require('./user.js').getUserByEmail;
const User = db.User;

/**
 * *SIGN UP*
 * *This function is called at auth route. Save a new User in our DB*
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @returns {String}
 */
const signup = async ({ email, password, name }) => {
    const existedUser = await getUserByEmail(email);

    if (existedUser) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        salt,
    });
    await user.save();

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
    });
};
/**
 * *SIGN IN*
 * *This function is called at auth route. Sign in User from our DB*
 * @param {String} email
 * @param {String} password
 * @returns {String}
 */
const login = async ({ email, password }) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('User does not exist');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Invalid password');
    }

    return jsonwebtoken.sign({ email: user.email }, process.env.TOKEN_SECRET, {
        expiresIn: '24h',
    });
};

module.exports = { signup, login };
