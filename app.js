require('dotenv').config();

const express = require('express');
const app = express();
const connectDB = require('./config/db');
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// register view engine as ejs
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 8000;

// listening to request only if connected to DB
connectDB()
    .then((res) => {
        app.listen(PORT, () => console.log(`Server is up & running at port: ${PORT}`))
    })

app.get('/', (req, res) => {
    res.redirect('blogs')
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us'})
});

// routes
const blogRoutes = require('./routes/blogRoutes');

app.use('/blogs', blogRoutes);