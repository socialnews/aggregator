let express = require('express');
let router = express.Router();
let Share = require('../models/share.js').share;
let mongoose = require('mongoose');

router.post('/', (req, res) =>{

	// mongoose.connect('mongodb://localhost/test')

	// let share = new Share(req.body);

	// share.save(function (err) {
	//   if (err){
	//   	console.log('Blowout')
	//   	res.json({error: err})
	//   }

	//   else{
	//   	Share.find(function (err, share) {
	//   	  if (err){ 
	//   	  	res.json({error: err})
	//   	  	return console.error(err);
	//   	  }
	//   	  console.log(share)
	//   	  res.json(share);
	//   	})
	//   }
	// });

	// db.connection.close();
	// res.json(share);
	res.json(req.body);
})

module.exports = router;