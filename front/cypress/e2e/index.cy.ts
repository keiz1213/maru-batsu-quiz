describe('indexページにアクセス', () => {
  it('/にアクセスするとHello, worldが表示されている', () => {
    cy.visit('/')
    cy.contains('Hello, world').should('be.visible')
  })
})
