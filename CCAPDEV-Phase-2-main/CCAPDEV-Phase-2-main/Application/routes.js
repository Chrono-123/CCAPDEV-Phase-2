app.get('/', function(req, res) => {
	res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/login', function(req, res) => {
 res.
});

app.post('/profile', function(req, res) => {
 const fName = await db.findOne(query, sort, projection);
 const lName = await db.findOne(query, sort, projection);
 const uName = await db.findOne(query, sort, projection);
 const password = await db.findOne(query, sort, projection);
  
 res.send{json.stringify({
  })
});