const express = require("express");
const path = require("path");
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 8000;

// publicstatic path
const staticPath = (path.join(__dirname, "../public"));
const templetesPath = (path.join(__dirname, "../templetes/views"));
const partialsPath = (path.join(__dirname, "../templetes/partials"));

app.set('view engine', 'hbs');
app.set('views', templetesPath)
app.use(express.static(staticPath));

hbs.registerPartials(partialsPath);


// routing
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/about", (req, res) => {
    res.render('about');
});
app.get("/weather", (req, res) => {
    res.render('weather');
});

app.get("*", (req, res) => {
    res.render('error', {
        errmesg: "Opps! Page Not Found"
    });
});

// lisitnining
app.listen(port, () => {
    console.log(`lisiting port at ${port}`)

});