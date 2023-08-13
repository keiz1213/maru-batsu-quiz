describe('update a game', () => {
  it('can delete a game only creater', () => {
    cy.intercept('DELETE', '**/api/v1/games/1', {
      statusCode: 200
    }).as('deleteRequest')

    cy.intercept('GET', '**/api/v1/games/1', {
      fixture: 'game'
    })

    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 1
    })
    cy.login()
    cy.visit('games/1')
    cy.contains('Test Game')
    cy.contains('削除').click()
    cy.contains('本当に削除してもいいですか？')
    cy.get('[data-cy="danger"]').click()
    cy.wait('@deleteRequest')
    cy.get('@deleteRequest').should('have.a.property', 'request')
    cy.contains('ゲームを削除しました!')
    cy.url().should('include', '/')
    cy.logout()
  })
})
