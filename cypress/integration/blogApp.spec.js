// blogApp.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

import blogService from "../../src/services/blogs"
import loginService from "../../src/services/login"

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
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('#loginForm')
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#usernameInput').type('pitossomo')
      cy.get('#passwordInput').type('pitossomo')
      cy.get('#loginBtn').click()

      cy.contains('Hello, pitossomo')
    })

    it('fails with wrong credentials', function() {
      cy.visit('http://localhost:3000')
      cy.get('#usernameInput').type('pirossomo')
      cy.get('#passwordInput').type('pirossomo')
      cy.get('#loginBtn').click()

      cy.get('#errorAlerts')
        .should('contain','Wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'pitossomo', password: 'pitossomo' })
        .then(response => {
          localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function() {
      cy.contains('New blog...').click()
      cy.get('#authorInput').type('José Nilton')
      cy.get('#titleInput').type('A volta dos que não foram')
      cy.get('#urlInput').type('www.voltadosquenaoforam.com')
      cy.get('#newBlogBtn').click()

      cy.contains('A volta dos que não foram, José Nilton')
    })
  })
})