describe('auth', () => {
  describe('login', () => {
    context('not logged in', () => {
      it('accessing the home page, redirected to the login page', () => {
        cy.visit('/home')
        cy.url().should('match', /login/)
      })

      it('accessing the game creation page, redirected to the login page', () => {
        cy.visit('/games/new')
        cy.url().should('match', /login/)
      })
    })

    context('logged in', () => {
      it('accessing the root page, redirected to the home page', () => {
        cy.login()
        cy.visit('/')
        cy.url().should('match', /home/)
      })

      it('accessing the login page, redirected to the home page', () => {
        cy.login()
        cy.visit('/login')
        cy.url().should('match', /home/)
      })
    })
  })
})
