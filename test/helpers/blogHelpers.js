const initialBlogs = [
  {
    title: 'Blog 1',
    author: 'First Author',
    url: 'www.google.com',
    likes: 0,
    comments: ['Wow', 'Gr8'],
    userId: '1',
  },
  {
    title: 'Blog 2',
    author: 'Second Author',
    url: 'www.yahoo.com',
    likes: 40,
    comments: ['Noice'],
    userId: '2',
  },
  {
    title: 'Blog 3',
    author: 'First Author',
    url: 'www.google.com',
    likes: 0,
    comments: [],
    userId: '1',
  },
]

const checkFields = (blogs, field) => {
  return blogs.every((blog) => {
    field in blog
  })
}

module.exports = {
  initialBlogs,
  checkFields,
}
