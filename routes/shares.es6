let express = require('express');
let router = express.Router();

router.post('/', (req, res) =>{
	// res.json(req.body);
	res.json({example: 'weee'});
})

module.exports = router;