describe('indexページ', () => {
  it('/にアクセスするとHello, worldが表示されている', () => {
    cy.visit('/')
    cy.contains('Hello, world').should('be.visible')
  })

  it('Get Helloボタンを押すとHelloWorldが返ってくる', () => {
    cy.visit('/')
    cy.wait(500)
    cy.intercept('GET', '/api/v1/hello').as('getHello')
    cy.get('.getHello').click()
    cy.wait('@getHello')
    cy.contains('Hello, World!')
  })
})
