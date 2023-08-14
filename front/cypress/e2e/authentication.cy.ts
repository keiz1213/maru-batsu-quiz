describe('auth', () => {
  context('not logged in', () => {
    it('accessing the home page, redirected to the login page', () => {
      cy.visit('/home')
      cy.url().should('include', '/login')
      cy.checkTitle('ログイン')
    })

    it('accessing the game creation page, redirected to the login page', () => {
      cy.visit('/games/new')
      cy.url().should('include', '/login')
      cy.checkTitle('ログイン')
    })

    it('accessing the game detail page, redirected to the login page', () => {
      cy.visit('/games/1')
      cy.url().should('include', '/login')
      cy.checkTitle('ログイン')
    })
  })

  context('logged in', () => {
    beforeEach(() => {
      cy.login()
    })

    afterEach(() => {
      cy.logout()
    })
    it('accessing the root page, redirected to the home page', () => {
      cy.visit('/')
      cy.url().should('include', '/home')
      cy.checkTitle('ホーム')
    })

    it('accessing the login page, redirected to the home page', () => {
      cy.visit('/login')
      cy.url().should('include', '/home')
      cy.checkTitle('ホーム')
    })
  })
})
