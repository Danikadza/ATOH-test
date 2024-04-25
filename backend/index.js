const express = require('express')
const { ysbSessionMiddleware } = require('./middlewares/ydbSession');
let { runDbDriver } = require('./config/db')
const cors = require('cors');

const PORT = 5000;

const indexRouter = require('./routes/index');

const app = express()

runDbDriver()

app.use(express.json())

app.use(cors());

app.use(ysbSessionMiddleware);

app.get('/', (req, res) => {
    res.status(200).json('Сервер 5000 порт')
})

app.use('/', indexRouter);

app.listen(PORT, () => console.log('Server started on Port:' + PORT))