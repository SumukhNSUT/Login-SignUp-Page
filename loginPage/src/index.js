const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
// import model from config.js
const collection = require("./config");

const app = express();
// convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("login");
});
app.get("/signup", (req, res) => {
	res.render("signup");
});

// register user
app.post("/signup", async (req, res) => {
	const data = {
		name: req.body.username,
		password: req.body.password,
	};

	// check if user already exists
	const existingUser = await collection.findOne({ name: data.name });

	if (existingUser) {
		res.send("User already exists. Choose a different username.");
	} else {
		// hash the password using bcrypt
		// to prevent hacking
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(data.password, saltRounds);

		data.password = hashedPassword;

		const userData = await collection.insertMany(data);
		console.log(userData);
	}
});
// login user
app.post("/login", async (req, res) => {
	try {
		const check = await collection.findOne({ name: req.body.username });
		if (!check) {
			res.send("username cannot be found!");
		}

		const isPasswordMatch = await bcrypt.compare(
			req.body.password,
			check.password
		);
		if (isPasswordMatch) {
			res.render("home");
		} else {
			req.send("Wrong password!");
		}
	} catch (error) {
		res.send("Wrong details!");
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
