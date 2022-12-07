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

  it('cancel button closes new blog form', () => {
    cy.get('button').contains('new blog').click()

    cy.get('button').contains('cancel').click()

    cy.get('button').contains('new blog').should('be.visible')
  })

  it('user can create a new blog', () => {
    cy.get('button').contains('new blog').click()

    cy.get('input[name=Title]').type('Test Blog #2')
    cy.get('input[name=Author]').type('Tester Testington')
    cy.get('input[name=Url]').type('www.test.com')

    cy.get('#submit-btn').click()

    cy.contains('Test Blog #2 - Tester Testington')
  })

  it('user can like a blog', () => {
    cy.get('#view-hide-btn').contains('view').click()

    cy.get('.blog-likes').contains('0')

    cy.get('button').contains('+Like').click()

    cy.get('.blog-likes').contains('1')
  })
})
