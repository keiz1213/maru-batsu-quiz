describe('update a game', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '**/api/v1/games/1', {
      fixture: 'game/game'
    })
    cy.intercept('GET', '**/api/v1/current_user/games', {
      fixture: 'game/games'
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it('If there are empty fields, the update cannot be performed', () => {
    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/current-user'
    })

    cy.visit('/home')
    cy.contains('Test Game').click()
    cy.contains('Test Game')
    cy.contains('編集する').click()
    cy.checkTitle('ゲーム編集')
    cy.get('[data-cy="form-title"]').invoke('val').should('eq', 'Test Game')
    cy.get('[data-cy="form-title"]').clear()
    cy.contains('ゲームを更新する').click()
    cy.contains('入力内容を確認してください')
    cy.contains('ゲーム名は必須項目です')
  })

  it('can update a game by providing all the required information', () => {
    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/current-user'
    })

    cy.intercept('PUT', '**/api/v1/games/1', {
      fixture: 'game/game'
    }).as('updateGame')

    cy.visit('/home')
    cy.contains('Test Game').click()
    cy.contains('Test Game')
    cy.contains('編集する').click()
    cy.checkTitle('ゲーム編集')
    cy.get('[data-cy="form-title"]').invoke('val').should('eq', 'Test Game')
    cy.get('[data-cy="form-title"]').type('updated game title')
    cy.contains('ゲームを更新する').click()
    cy.wait('@updateGame')
    cy.get('@updateGame').should('have.a.property', 'request')
    cy.url().should('include', '/games/1')
    cy.contains('ゲームを更新しました!')
  })

  it('someone who is not the creator cannot access the details of the game.', () => {
    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/other-user'
    })
    cy.visit('games/1')
    cy.url().should('include', '/home')
  })

  it('someone who is not the creator cannot access the edit page of the game.', () => {
    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/other-user'
    })
    cy.visit('games/1/edit')
    cy.url().should('include', '/home')
  })
})
