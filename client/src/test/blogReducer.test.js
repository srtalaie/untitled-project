import deepFreeze from 'deep-freeze'

import blogReducer from '../reducers/blogReducer'

describe('blog redux tests', () => {
  test('returns new state with action `createBlog`', () => {
    const state = []
    const action = {
      type: 'blogs/createBlog',
      payload: {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'www.test.com',
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState[0]).toEqual(expect.objectContaining(action.payload))
  })

  test('returns new state with action `likeBlog`', () => {
    const state = [
      {
        id: 1,
        title: 'Blog 1',
        author: 'Arthur Blog',
        url: 'www.google.com',
        likes: 100,
      },
      {
        id: 2,
        title: 'Blog 2',
        author: 'Arthur Blog',
        url: 'www.google.com',
        likes: 0,
      },
    ]

    const action = {
      type: 'blogs/likeBlog',
      payload: {
        id: 1,
      },
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])

    expect(newState).toContainEqual({
      id: 1,
      title: 'Blog 1',
      author: 'Arthur Blog',
      url: 'www.google.com',
      likes: 101,
    })
  })
})
