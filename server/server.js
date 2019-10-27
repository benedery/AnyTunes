const express = require('express');
const cors = require('cors');
const logger = require('morgan')
const app = express();

const apiRouter = require("./routes/api")
const queryRouter = require("./routes/query")
const usersRouter = require("./routes/users")

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up mongoose connection
const mongoose = require('mongoose');
const config = require('./config/keys');
mongoose.connect(process.env.MONGODB_URI || config.dev_db_url.uri, {
    useCreateIndex: true, useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log("connected to DB")
});

// routes
app.use('/api', apiRouter)
app.use('/users', usersRouter)
app.use('/query', queryRouter)

const PORT = process.env.PORT || 4005
app.listen(PORT || 4003, () => {
    console.log(`app listen on port ${PORT}`)
})