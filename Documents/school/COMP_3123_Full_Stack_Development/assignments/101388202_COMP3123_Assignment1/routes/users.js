const express = require("express")
const UserModel = require('../models/User')

const routes = express.Router()
//POST
//http://localhost:3002/api/v1/user/signup
routes.post("/signup", async (req, res) => {
    try {
        const newUser = new UserModel({
            ...req.body
        })
        await newUser.save()
        res.status(201).send(newUser);

    } catch(error) {
        res.status(500).send({message: "Invalid"});
    }
})

//POST
//http://localhost:3002/api/v1/user/login
routes.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        if (password === user.password) {
            res.status(200).json({ message: "User logged in successfully" });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }


    } catch(error) {
        res.status(500).send({message: "Invalid"});

    }
})



module.exports = routes