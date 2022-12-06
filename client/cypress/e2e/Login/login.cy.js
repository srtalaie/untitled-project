describe('Login E2E', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Test Test',
      email: 'test@test.com',
      username: Cypress.env('username'),
      password: Cypress.env('password'),
    })
    cy.visit('http://localhost:3000')
  })

  it('home page can be opened', function () {
    cy.contains('Blogger')
  })

  it('login page can be reached', () => {
    cy.contains('login').click()
  })

  it('login fails with incorrect credentials', () => {
    cy.contains('login').click()

    cy.get('input[name=Username]').type('WrongUserName')
    cy.get('input[name=Password]').type('WrongPassWord')
    cy.get('#login-btn').click()

    cy.contains('invalid username or password')
  })

  it('user is able to login', () => {
    cy.contains('login').click()

    cy.get('input[name=Username]').type(Cypress.env('username'))
    cy.get('input[name=Password]').type(Cypress.env('password'))
    cy.get('#login-btn').click()

    cy.contains('logged in')
  })
})
