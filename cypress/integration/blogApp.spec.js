// blogApp.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pito Somo',
      username: 'pitossomo',
      password: 'pitossomo'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#usernameField').type('pitossomo')
      cy.get('#passwordField').type('pitossomo')
      cy.get('#loginBtn').click()

      cy.contains('Hello, pitossomo')
    })

    it('fails with wrong credentials', function() {
      cy.get('#usernameField').type('pirossomo')
      cy.get('#passwordField').type('pirossomo')
      cy.get('#loginBtn').click()

      cy.get('#errorAlerts')
        .should('contain','Wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })
})