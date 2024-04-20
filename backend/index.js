const express = require('express')
const jwt = require('jsonwebtoken')
const users = require('./users');
const { ysbSessionMiddleware } = require('./middlewares/ydbSession');
let { runDbDriver } = require('./config/db')
let { TypedValues } = require('ydb-sdk')
const { Users } = require("./routes/users/controllers/typedData");
const bcrypt = require('bcryptjs');

const PORT = 5000;

const tokenKey = '1a2b-3c4d-5e6f-7g8h';

const indexRouter = require('./routes/index');


const app = express()

runDbDriver()

app.use(express.json())

app.use(ysbSessionMiddleware);

app.use((req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            (err, payload) => {
                if (err) next();
                else if (payload) {
                    for (let user of users) {
                        if (user.id === payload.id) {
                            req.user = user;
                            next();
                        }
                    }

                    if (!req.user) next();
                }
            }
        );
    }

    next();
});

app.post('/api/auth', async (req, res) => {
    try {
        const query =
            `
        DECLARE $login AS Utf8;
        DECLARE $password AS Utf8;
        SELECT id, login, password, FullName
        FROM admin_users
        WHERE login = $login`
            ;

        const preparedQuery = await req.ydbSession.prepareQuery(query);

        const {resultSets} = await req.ydbSession.executeQuery(preparedQuery, {
            "$login": TypedValues.utf8(req.body.login),
        });

        const userData = Users.createNativeObjects(resultSets[0])

        const areSame = await bcrypt.compare(req.body.password, userData[0].password)

        if (areSame) {
            return res.status(200).json({
                id: userData[0].id,
                login: userData[0].login,
                FullName: userData[0].FullName,
                token: jwt.sign({ id: userData[0].id }, tokenKey),
            });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/user', (req, res) => {
    if (req.user) return res.status(200).json(req.user);
    else
        return res
            .status(401)
            .json({ message: 'Not authorized' });
});

app.get('/', (req, res) => {
    res.status(200).json('Сервер 5000 порт')
})



app.use('/', indexRouter);

app.listen(PORT, () => console.log('Server started on Port:' + PORT))