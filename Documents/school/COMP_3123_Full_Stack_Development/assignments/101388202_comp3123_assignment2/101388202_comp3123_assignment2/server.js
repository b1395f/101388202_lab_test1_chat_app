const path = require('path');
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const empRoutes = require("./routes/employee");
const homeRoute = require('./routes/home');

const app = express();

const SERVER_PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const DB_CONNECTION_STRING = "mongodb+srv://dbUser:dbPassword@cluster0.tgqhflm.mongodb.net/F2023_comp3123?retryWrites=true&w=majority";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/', homeRoute);
app.use('/api/v1/emp', empRoutes);

app.use(express.static('build'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});