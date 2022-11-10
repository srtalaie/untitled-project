import { useEffect, useState } from "react"
import Blog from "./components/Blog"
import { getAll, setToken } from "./services/blogs"
import login from "./services/login"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")

	useEffect(() => {
		getAll().then((blogs) => setBlogs(blogs))
	}, [])

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem("loggedInUser")
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON)
			setUser(user)
			setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const loggedInUser = await login({
				username,
				password,
			})

			window.localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser))

			setToken(loggedInUser.token)
			setUser(loggedInUser)

			setUsername("")
			setPassword("")
		} catch (error) {
			console.log(error)
			setMessage(error.response.data.message)
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	const handleLogOut = () => {
		window.localStorage.removeItem("loggedInUser")
		setUser(null)
		setToken(null)
	}

	return (
		<div>
			<div>
				<p>{message}</p>
			</div>
			{user === null ? (
				<div>
					<h2>Login</h2>
					<form onSubmit={handleLogin}>
						<div>
							username
							<input
								type="text"
								value={username}
								name="Username"
								onChange={({ target }) => setUsername(target.value)}
							/>
						</div>
						<div>
							password
							<input
								type="password"
								value={password}
								name="Password"
								onChange={({ target }) => setPassword(target.value)}
							/>
						</div>
						<button type="submit">login</button>
					</form>
				</div>
			) : (
				<div>
					<h2>blogs</h2>
					<p>
						{user.name} logged in <button onClick={handleLogOut}>logout</button>
					</p>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
