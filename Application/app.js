const express = require('express');
const exphbs = require('express-handlebars');

const port = 3000;

const app = express();

app.use(express.static('/Application'));
app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.json());



const navigation = {
    title: "Laboratory Reservation",
    home: "/home",
    reservation: "/reservation",
    search: "/search",
    profile: "/profile",
    main: "/main"

}


app.get('/', (req, res) => {
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    res.render('index', {
        title: "DLSU Lab Reservation"
    });
 });

 app.get('/main', (req, res) => {
    const acctChoice = JSON.parse(acctChoice);
    if (acctChoice.acct === "login"){
        res.render('Login', {

        });
    }
 })



app.listen(port, () => {
    console.log("Server is running on port: " + port);
});

