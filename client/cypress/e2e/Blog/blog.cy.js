describe('Login E2E', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.createUser({
      name: 'Test Test',
      email: 'test@test.com',
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    })

    cy.login({
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    })

    cy.createBlog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'www.test.com',
    })
  })

  it('intial blog is displayed', () => {
    cy.contains('Test Blog - Test Author')
  })
})
