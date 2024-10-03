
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require('uuid');

const app = express();
const items = [];
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", function (req, res) {
	const today = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long"
	};
	const day = today.toLocaleDateString("en-US", options);

	res.render("list", {
		listtitle: day,
		newListItems: items,
		version: "1.0.0"
	});
});

app.post("/", (req, res) => {
	if (req.body.newItem === "") {
		res.redirect("/");
		return;
	}

	const item = {
		id: uuidv4(),
		name: req.body.newItem,
		isDone: false
	}

	items.push(item);
	res.redirect("/");
});

app.post("/update-item", (req, res) => {
	const itemId = req.body.id;
	const item = items.find(item => item.id === itemId);

	if (item) {
		item.isDone = req.body.isDone === "true";
		res.redirect("/");
	} else {
		res.redirect("/");
	}
});

app.listen(3000, function () {
	console.log("Server started on port 3000.");
});
