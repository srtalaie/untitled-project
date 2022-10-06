const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	name: String,
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		unique: true,
		required: "Email address is required",
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
			},
			message: "Please enter a valid email",
		},
	},
	passwordHash: {
		type: String,
		required: true,
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Blog",
		},
	],
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

const User = mongoose.model("User", userSchema)

module.exports = User
