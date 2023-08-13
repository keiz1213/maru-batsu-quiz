describe('update a game', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '**/api/v1/games/1', {
      fixture: 'game'
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it('If there are empty fields, the update cannot be performed', () => {
    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 1
    })

    cy.visit('games/1')
    cy.contains('Test Game')
    cy.contains('編集する').click()
    cy.contains('ゲーム編集')
    cy.get('[data-cy="form-title"]').invoke('val').should('eq', 'Test Game')
    cy.get('[data-cy="form-title"]').clear()
    cy.contains('ゲームを更新する').click()
    cy.contains('入力内容を確認してください')
    cy.contains('ゲーム名は必須項目です')
  })

  it('can update a game by providing all the required information', () => {
    cy.intercept('PUT', '**/api/v1/games/1', {
      fixture: 'game'
    })

    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 1
    })

    cy.visit('games/1')
    cy.contains('Test Game')
    cy.contains('編集する').click()
    cy.contains('ゲーム編集')
    cy.get('[data-cy="form-title"]').invoke('val').should('eq', 'Test Game')
    cy.get('[data-cy="form-title"]').type('updated game title')
    cy.contains('ゲームを更新する').click()
    cy.url().should('include', '/games/1')
    cy.contains('ゲームを更新しました!')
  })

  it('Only the game creator can access the game details page', () => {
    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 2
    })
    cy.visit('games/1')
    cy.url().should('include', '/home')
  })

  it('Only the game creator can access the game edit page', () => {
    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 2
    })
    cy.visit('games/1/edit')
    cy.url().should('include', '/home')
  })
})
