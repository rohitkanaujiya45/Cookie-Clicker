const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { clickUserData, getUserData } = require("./jobs");
const port = 3001;
const app = express();
app.use(cors('*'));
app.use(express.json());


const uri = 'mongodb+srv://root:root@cluster0.61l9t.mongodb.net/cookieClicker?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


app.post("/click/events", clickUserData);
app.post("/fetch/events", getUserData);


app.listen(port, () => {
    console.log('Server is running on http://localhost:3001');
});