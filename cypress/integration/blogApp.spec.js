/// <reference types="cypress" />
const { _ } = Cypress

Cypress.Commands.add('createBlog', ({ author, url, title, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      author, title, url,
      likes: likes || 0
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    body: { username, password },
  }).then(response => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Pito Somo',
      username: 'pitossomo',
      password: 'pitossomo'
    }
    const user2 = {
      name: 'Bruce Wayne',
      username: 'batman',
      password: 'selina'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user1)
    cy.request('POST', 'http://localhost:3003/api/users', user2)

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
      cy.login({ username:'pitossomo', password: 'pitossomo' })
    })

    it('A blog can be created', function() {
      cy.visit('http://localhost:3000')
      cy.contains('New blog...').click()
      cy.get('#authorInput').type('José Nilton')
      cy.get('#titleInput').type('A volta dos que não foram')
      cy.get('#urlInput').type('www.voltadosquenaoforam.com')
      cy.get('#newBlogBtn').click()

      cy.contains('A volta dos que não foram, José Nilton')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          author: 'João Banana',
          title: 'As tranças da vovó careca',
          url: 'www.trancasdavovocareca.com'
        })
      })

      it('the user can like a blog', function() {
        cy.visit('http://localhost:3000')
        cy.contains('like').click()
      })

      it('other users beside the creator of the blog cannot delete it', function() {
        cy.clearLocalStorage()
        cy.login({ username: 'batman', password: 'selina' })
        cy.visit('http://localhost:3000')
        cy.contains('show').click()
        cy.get('.deleteBtn').should('not.exist')
      })

      it('the user who created the blog can delete it', function() {
        cy.visit('http://localhost:3000')
        cy.contains('show').click()
        cy.contains('delete').click()
      })
    })
  })

  it('orders the blogs according to the number of likes, from biggest to smallest', () => {
    cy.login({ username:'pitossomo', password: 'pitossomo' })
    cy.createBlog({
      author: 'Author A', title: 'Blog A', url: 'www.ablog.com', likes: 50
    })
    cy.createBlog({
      author: 'Author B', title: 'Blog B', url: 'www.bblog.com', likes: 80
    })
    cy.createBlog({
      author: 'Author C', title: 'Blog C', url: 'www.cblog.com', likes: 30
    })
    cy.createBlog({
      author: 'Author D', title: 'Blog D', url: 'www.dblog.com', likes: 160
    })
    cy.createBlog({
      author: 'Author E', title: 'Blog E', url: 'www.eblog.com', likes: 70
    })

    cy.visit('http://localhost:3000')

    // const toStrings = (elements) => elements.map((i,el) => {console.log(el); return el.innerHtml})
    const toStrings = (elements) => _.map(elements, 'innerText')
    const getLike = text => text.substring(7)
    const toLikes = strings => _.map(strings, getLike)
    const toValues = likes => _.map(likes, Number)

    cy.get('.likes')
      .then(toStrings)
      .then(toLikes)
      .then(toValues)
      .then(values => {
        const sorted = _.orderBy(values, ['desc'])
        expect(sorted, 'blogs are sorted by likes').to.deep.equal(values)
      })
  })
})