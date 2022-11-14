import { useState } from "react"

const Blog = ({ blog }) => {
	const [isVisible, setIsVisible] = useState(false)

	const handleVisibility = () => {
		setIsVisible(!isVisible)
	}
	return (
		<div>
			{blog.title} - {blog.author}
			<button id="view-hide-btn" onClick={handleVisibility}>
				{isVisible ? "hide" : "view"}
			</button>
			<div id="details">
				{isVisible ? (
					<>
						<div className="blog-link">
							link:
							<a
								href={`http://${encodeURI(blog.url)}`}
								target="_blank"
								rel="noreferrer"
							>
								{blog.url}
							</a>
						</div>
						<div className="blog-likes">likes: {blog.likes}</div>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	)
}

export default Blog
