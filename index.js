const express = require('express');
const bodyParser = require('body-parser');
const routerAuth = require('./src/routes/auth.js');
const cocktailRouter = require('./src/routes/cocktail.js');
const routerUser = require('./src/routes/user');
const routerCategoryApi = require('./src/routes/category');
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
    app.use('/users', routerUser);
    app.use('/cocktails', cocktailRouter);
    app.use('/feeds', routerFeed);

    try {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    } catch (error) {
        console.log('Error at run App ' + error.message);
        process.exit(1);
    }
};

startApp();
