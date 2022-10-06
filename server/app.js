const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const mongoose = require("mongoose")

const blogRouter = require("./controllers/blogController")
const usersRouter = require("./controllers/userController")
const loginRouter = require("./controllers/loginController")

const { MONGODB_URI } = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

logger.info("connecting to", MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/users", usersRouter)
app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/testing")
	app.use("/api/testing", testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
