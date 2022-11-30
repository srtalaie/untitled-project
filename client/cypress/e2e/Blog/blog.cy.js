describe('Blog E2E', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('home page can be opened', function () {
    cy.contains('Blogger')
  })

  it('login page can be reached', () => {
    cy.contains('login').click()
  })

  it('user is able to login', () => {
    cy.contains('login').click()

    cy.get('input[name=Username]').type(Cypress.env('username'))
    cy.get('input[name=Password]').type(Cypress.env('password'))
    cy.get('#login-btn').click()

    cy.contains('logged in')
  })
})
