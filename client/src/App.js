import { useEffect, useState } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs))
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const loggedInUser = await loginService.login({
				username,
				password,
			})
			setUser(loggedInUser)
			setUsername("")
			setPassword("")
		} catch (error) {
			setMessage("Wrong Credentials")
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
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
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	)
}

export default App
