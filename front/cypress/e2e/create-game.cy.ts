describe('create a game', () => {
  beforeEach(() => {
    cy.login()
  })

  afterEach(() => {
    cy.logout()
  })

  it('game creation requires filling in all the necessary fields', () => {
    cy.visit('games/new')
    cy.contains('ゲーム作成')
    cy.contains('ゲームを作成する').click()
    cy.contains('入力内容を確認してください')
    cy.contains('ゲーム名は必須項目です')
    cy.contains('ゲームの説明は必須項目です')
    cy.contains('問題は必須項目です')
    cy.contains('解説は必須項目です')
  })

  it('can create a game by providing all the required information', () => {
    cy.intercept('POST', '**/api/v1/games/', {
      fixture: 'game'
    }).as('createGame')

    cy.intercept('GET', '**/api/v1/games/1', {
      fixture: 'game'
    })

    cy.intercept('GET', '**/api/v1/current_user/user_id', {
      body: 1
    })

    cy.visit('games/new')
    cy.contains('ゲーム作成')
    cy.get('[data-cy="form-title"]').type('Test Game')
    cy.get('[data-cy="form-description"]').type('This is a test game')
    cy.get('[data-cy="form-question-1"]').type('1 + 1 = 2 ?')
    cy.get('[data-cy="form-correct-answer-1"]').select('◯')
    cy.get('[data-cy="form-explanation-1"]').type('普通に2です')
    cy.get('[data-cy="form-question-2"]').type('2 + 2 = 5 ?')
    cy.get('[data-cy="form-correct-answer-2"]').select('✕')
    cy.get('[data-cy="form-explanation-2"]').type('普通に4です')
    cy.get('[data-cy="form-question-3"]').type('3 + 3 = 4 ?')
    cy.get('[data-cy="form-correct-answer-3"]').select('✕')
    cy.get('[data-cy="form-explanation-3"]').type('普通に6です')
    cy.get('[data-cy="form-number-of-winner"]').select('3')
    cy.contains('ゲームを作成する').click()
    cy.wait('@createGame')
    cy.get('@createGame').should('have.a.property', 'request')
    cy.url().should('include', '/games/1')
    cy.contains('ゲームを作成しました!')
  })
})
