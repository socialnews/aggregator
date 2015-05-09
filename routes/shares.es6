let express = require('express');
let router = express.Router();

router.post('/', (req, res) =>{
	res.json(req.body);
})

module.exports = router;