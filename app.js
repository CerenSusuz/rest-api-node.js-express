const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

app.use(bodyParser.json());

//import routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

//get routes
app.get('/', (req, res) => {
    res.send("testing get");
})

//middlewares
app.use('/posts', () => {
    console.log("there is middleware in here")
})
app.use(cors());

// connect to db
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true },
    () => { console.log("connected to db") }
)


app.listen(5000);