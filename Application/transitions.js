app.get('/', (req, res) => {
    res.redirect('/main');
});

app.get('/main', (req, res) => {
    res.render('index', {
        title: "DLSU Lab Reservation"
    });
    if (change === 'login'){
        res.render('Login', {

        });
    }
});

app.get('/main/Login', (req, res) => {
    if(found === true){
        res.redirect('/home');
    }
});