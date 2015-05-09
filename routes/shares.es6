let express = require('express');
let router = express.Router();
let share = require('../db/share.js');
let mongoose = require('mongoose');

router.post('/', (req, res) =>{

	console.log(req.body);

	share.add(req.body, (share) => {
		console.log('saved share to db: ', share);
		res.json(share);
	});
})

module.exports = router;