require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
app.use(express.static('public'));

// register view engine as ejs
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

// listening to request only if connected to DB
connectDB()
    .then((res) => {
        app.listen(PORT, () => console.log(`Server is up & running at port: ${PORT}`))
    })

app.get('/', (req, res) => {
    res.render('home', { title: 'Home'});
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us'})
});

// routes
const blogRoutes = require('./routes/blogRoutes');

app.use('/blogs', blogRoutes);