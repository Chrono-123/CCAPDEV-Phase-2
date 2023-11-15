app.get('/', function(req, res) => {
	res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/login', function(req, res) => {
 res.
});

app.post('/profile', function(req, res) => {
 const fName = await db.findOne();
 const lName = await db.findOne();
 const uName = await db.findOne();
 const password = await db.findOne();
  
 res.send{json.stringify({
  })
});