let express = require('express');
let router = express.Router();
let share = require('../db/share.js');
let mongoose = require('mongoose');

router.post('/', (req, res) =>{

	share.add(req.body).spread((saved_share) => {
		res.json(saved_share);
	});
})

module.exports = router;