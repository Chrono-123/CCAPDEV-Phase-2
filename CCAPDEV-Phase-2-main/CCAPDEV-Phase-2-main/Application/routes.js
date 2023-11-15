app.get('/', function(req, res) => {
	res.sendFile(__dirname + '/public/html/main.html');
});

app.get('/login', function(req, res) => {
	const uName = db.getCollection('laboratory').find('username':req.body.username);
	const password = db.getCollection('laboratory').find('username':req.body.password);
});

app.post('/profile', function(req, res) => {
	const fName = await db.getCollection('laboratory').findOne(query, sort, projection);
	const lName = await db.getCollection('laboratory').findOne(query, sort, projection);
 	const uName = await db.getCollection('laboratory').findOne(query, sort, projection);
 	const password = await db.getCollection('laboratory').findOne(query, sort, projection);
  
 res.send{json.stringify({
  })
});
