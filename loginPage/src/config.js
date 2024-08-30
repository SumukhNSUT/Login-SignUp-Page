const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");

// check karo ki connection hua h ya nhi
connect
	.then(() => {
		console.log("Database connected successfully!");
	})
	.catch(() => {
		console.log("Database cannot be connected!");
	});

// ab schema banao
const LoginSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// collection part
const connection = new mongoose.model("users", LoginSchema);
module.exports = connection;
