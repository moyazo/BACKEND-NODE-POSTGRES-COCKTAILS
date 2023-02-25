const express = require('express');
const bodyParser = require('body-parser');
const routerAuth = require('./src/routes/auth.js');
const cocktailRouter = require('./src/routes/random.js');
const routerRandomApi = require('./src/routes/syncRandom');
const routerFirstLetterApi = require('./src/routes/syncFirstLetter');
const dotenv = require('dotenv');
const ensureAuthenticated = require('./src/middleware/auth.js');
const cors = require('cors');

dotenv.config();

const startApp = async () => {
    const app = express();

    app.use(cors());

    const port = process.env.PORT;

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
