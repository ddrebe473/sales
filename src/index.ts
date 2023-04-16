const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./db/connect');

const app = express();
const port = 8080;

app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const routeUsers = require('./routes/users');
app.use('/api/users', routeUsers)

//server
app.listen(port, () => {
    console.log(`listening on ${port}`);
    connectDB(process.env.TOKEN);
    console.log(process.env.TOKEN);
});

export{}