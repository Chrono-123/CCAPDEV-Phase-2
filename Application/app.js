import transition from "transitions.js";
const express = require('express');
const exphbs = require('express-handlebars');


const port = 3000;

const app = express();

app.use(express.static('/Application'));
app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(transition);

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

