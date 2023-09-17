if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const registerRoute = require('./Routes/registerRoute');

app.use(express.json());
app.use(cors());

const dbConnect = process.env.MONGO_DB;
mongoose.connect(dbConnect);

app.use(function(req, res, next) {
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//user files

app.use('/registerRoute', registerRoute);

app.listen(process.env.PORT, () => console.log('server listening on port'));
