const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());

const DB_HOST = "cluster0.tgqhflm.mongodb.net"
const DB_USER = "dbUser"
const DB_PASSWORD = "dbUser"
const DB_NAME = "restaurant_schema"
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisines: String,
    city: String,
    restaurant_id: Number,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    try {
        const restaurants = await Restaurant.find({ cuisines: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/restaurants', async (req, res) => {
    const sortBy = req.query.sortBy || 'ASC';
    try {
        const restaurants = await Restaurant.find({}, { id: 1, cuisines: 1, name: 1, city: 1, restaurant_id: 1 })
            .sort({ restaurant_id: sortBy === 'ASC' ? 1 : -1 });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/restaurants/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine;
    try {
        const restaurants = await Restaurant.find({ cuisines: cuisine, city: { $ne: 'Brooklyn' } }, { _id: 0, cuisines: 1, name: 1, city: 1 })
            .sort({ name: 1 });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});