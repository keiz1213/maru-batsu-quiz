describe('delete a game', () => {
  it('can delete a game only creater', () => {
    cy.intercept('DELETE', '**/api/v1/games/1', {
      statusCode: 204
    }).as('deleteRequest')

    cy.intercept('GET', '**/api/v1/games/1', {
      fixture: 'game/game'
    })

    cy.intercept('GET', '**/api/v1/current_user/games', {
      fixture: 'game/games'
    })

    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/current-user'
    })

    cy.login()
    cy.visit('/home')
    cy.contains('Test Game').click()
    cy.checkTitle('Test Game')
    cy.contains('削除').click()
    cy.contains('本当に削除してもいいですか？')
    cy.get('[data-cy="danger"]').click()
    cy.wait('@deleteRequest')
    cy.get('@deleteRequest').should('have.a.property', 'request')
    cy.contains('ゲームを削除しました!')
    cy.url().should('include', '/home')
    cy.logout()
  })
})
