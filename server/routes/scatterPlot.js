var express = require("express");
var router = express.Router();
const fs = require("fs");

// router.get("/", function(req, res, next) {

// 	res.json("");
// });

router.post("/saveResults", function(req, res) {
	//console.log(req.body);
	var myDate = new Date();
	myDate.toLocaleDateString(); //获取当前日期
	var date = myDate.toLocaleString().replace(/:/g, '-');
	var filename = './data/results/' + date + '.json';
	fs.createWriteStream(filename);
	console.log(filename);
	fs.readFile(filename, 'utf-8', function(err, data) {
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
			fs.writeFileSync(filename, str);
			res.send("succeed to write file");
		}
	})

});

router.post("/saveData", function(req, res) {
	//console.log(req.body);
	var myDate = new Date();
	myDate.toLocaleDateString(); //获取当前日期
	var date = myDate.toLocaleString().replace(/:/g, '-');
	var filename = './data/circlesData/' + date + '.json';
	fs.createWriteStream(filename);
	console.log(filename);
	fs.readFile(filename, 'utf-8', function(err, data) {
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
			fs.writeFileSync(filename, str);
			res.send("succeed to write file");
		}
	})

});

module.exports = router;