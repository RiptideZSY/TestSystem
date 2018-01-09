var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
	//res.send("respond with a resource");
	// res.render('linechart', {
	// 	test: '123'
	// });
	res.json("");
});

router.post("/", function(req, res) {
	// if (!req.body.hasOwnProperty('type') ||
	// 	!req.body.hasOwnProperty('width')) {
	// 	res.statusCode = 400;
	// 	return res.send('Error 400: Post syntax incorrect.');
	// }

	res.json(true);
	console.log("hahaha!");
	console.log(req.body);
	//var fso = new ActiveXObject("Scripting.FileSystemObject");
	//var f1 = fso.createtextfile("test.txt", true)
	//f1.write(req.body);
});

module.exports = router;