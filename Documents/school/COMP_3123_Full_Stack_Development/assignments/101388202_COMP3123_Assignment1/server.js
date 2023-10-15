const express = require("express");
const empRoutes = require("./routes/employees");
const userRoutes = require("./routes/users");
const mongoose=require('mongoose');


const app = express();


const SERVER_PORT = 3002

app.use(express.json());
app.use(express.urlencoded());
const DB_CONNECTION_STRING = "mongodb+srv://dbUser:dbPassword@cluster0.tgqhflm.mongodb.net/F2023_comp3123?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);


app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment – I (10%) COMP 3123 – Full Stack Development – I</h1>")
    })



app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})