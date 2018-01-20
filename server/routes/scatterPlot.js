var express = require("express");
var router = express.Router();
const fs = require("fs");

// router.get("/", function(req, res, next) {

// 	res.json("");
// });

router.post("/", function(req, res) {
	console.log(req.body);
	//console.log(process.cwd());
	fs.readFile('./data/scatterPlot.json', 'utf-8', function(err, data) {
		if (err) {
			console.log("fail");
			res.send("failed to read file");
		} else {
			console.log("succeed");
			if (data) {
				resultList = JSON.parse(data);
				resultList.push(req.body);
				str = JSON.stringify(resultList);
			} else {
				str = JSON.stringify(req.body);
			}
			fs.writeFileSync('./data/scatterPlot.json', str);
			res.send("succeed to write file");
		}
	})

});

module.exports = router;