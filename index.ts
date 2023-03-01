import express from 'express';
import bodyParser from 'body-parser';

import routerAuth from './src/routes/auth.js';
import cocktailRouter from './src/routes/random.js';
import routerRandomApi from './src/routes/syncRandom';

import routerFirstLetterApi from './src/routes/syncFirstLetter';
import routerSubCategoryApi from './src/routes/syncSubCategory';
import routerPostFeed from './src/routes/post';
import dotenv from 'dotenv';

import ensureAuthenticated from './src/middleware/auth.js';
import cors from 'cors';
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
    app.use('/auth', routerAuth);
    app.use('/cocktails', cocktailRouter);
    app.use('/sync-random', routerRandomApi);
    app.use('/sync-firstLetter', routerFirstLetterApi);

    app.use('/sync-subCategory', routerSubCategoryApi);
    app.use('/feed', routerPostFeed);

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
