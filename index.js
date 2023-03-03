const express = require('express');
const bodyParser = require('body-parser');

const routerAuth = require('./src/routes/auth.js');
const cocktailRouter = require('./src/routes/cocktail.js');
const routerUser = require('./src/routes/user');
const routerFirstLetterApi = require('./src/routes/syncFirstLetter');
const routerCategoryApi = require('./src/routes/category');
const routerSubCategoryApi = require('./src/routes/subCategory');
const routerFeed = require('./src/routes/post');
const dotenv = require('dotenv');

const ensureAuthenticated = require('./src/middleware/auth.js');
const cors = require('cors');
const app = express();
dotenv.config();
const startApp = async () => {
    const port = process.env.PORT;
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(ensureAuthenticated);
    app.use('/categories', routerCategoryApi);
    app.use('/auth', routerAuth);
    app.use('/user', routerUser);
    app.use('/cocktails', cocktailRouter);
    app.use('/feed', routerFeed);

    try {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

startApp();
