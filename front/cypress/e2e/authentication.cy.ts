describe('auth', () => {
  it('when not logeed in, accessing the home page, redirected to the login page', () => {
    cy.visit('/home')
    cy.url().should('include', '/login')
    cy.checkTitle('ログイン')
  })

  it('when not logeed in, accessing the game creation page, redirected to the login page', () => {
    cy.visit('/games/new')
    cy.url().should('include', '/login')
    cy.checkTitle('ログイン')
  })

  it('when not logeed in, accessing the game detail page, redirected to the login page', () => {
    cy.visit('/games/1')
    cy.url().should('include', '/login')
    cy.checkTitle('ログイン')
  })
})
