routes.route("/profile/:id").get(function(req,res){
	Restaurant.findById(req.param.id).then((laboratory) => {
		res.json(restaurant);
		res.end();
	});
});

routes.route("/labTechReservation").get(function(req,res){
	Restaurant.find().then((laboratory) => {
		res.json(laboratory);
		res.end();
	});
});

routes.route("/profile").post(function(req,res){
	const restaurant = new Restaurant({
		name: req.body.name,
		address: req.body.address,
	});
	restaurant.save();
	res.json({message: "Restaurant saved"});
});
