let express = require('express');
let router = express.Router();
let share = require('../db/share.js');
let mongoose = require('mongoose');

router.get('/', (req, res) =>{

	let url = decodeURIComponent(req.query.url);

	share.getByArticle(url)
		.then((shares) => {
			res.json(shares);
		})
		.catch((error) => {
			res.status(400);
			res.json({error: error});
		})

})

module.exports = router;