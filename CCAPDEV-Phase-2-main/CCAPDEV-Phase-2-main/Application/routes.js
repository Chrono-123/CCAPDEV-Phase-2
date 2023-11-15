app.get('/', function(req, res) => {
	res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/