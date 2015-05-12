let express = require('express');
let router = express.Router();
let share = require('../db/share.js');
let mongoose = require('mongoose');


router.post('/', (req, res) =>{

	share.add(req.body)
		.then((saved_share) => {
			res.json(saved_share);
		})
		.catch((error) => {

			res.status(400);
			res.json({error: error});
		})

})

module.exports = router;