describe('create a game', () => {
  beforeEach(() => {
    cy.login()
    cy.intercept('GET', '**/api/v1/current_user/games', {
      fixture: 'game/games'
    })
    cy.intercept('POST', '**/api/v1/users', {
      fixture: 'user/current-user'
    })
  })

  afterEach(() => {
    cy.logout()
  })

  it('game creation requires filling in all the necessary fields', () => {
    cy.visit('/home')
    cy.contains('新しいゲームを作成する').click()
    cy.checkTitle('新規ゲーム作成')
    cy.contains('ゲームを作成する').click()
    cy.contains('入力内容を確認してください')
    cy.contains('ゲーム名は必須項目です')
    cy.contains('ゲームの説明は必須項目です')
    cy.contains('問題は必須項目です')
    cy.contains('解説は必須項目です')
  })

  it('can create a game by providing all the required information', () => {
    cy.intercept('POST', '**/api/v1/games/', {
      fixture: 'game/game'
    }).as('createGame')

    cy.visit('/home')
    cy.contains('新しいゲームを作成する').click()
    cy.checkTitle('新規ゲーム作成')
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

  it('display warning on browser back during input', () => {
    cy.visit('/home')
    cy.contains('新しいゲームを作成する').click()
    cy.checkTitle('新規ゲーム作成')
    cy.get('[data-cy="form-description"]').type('This is a test game')
    cy.on('window:confirm', cy.stub().as('confirmStub'))
    cy.go('back')
    cy.get('@confirmStub').should('be.calledOnce')
  })

  it('can increase the number of quizzes', () => {
    cy.visit('/home')
    cy.contains('新しいゲームを作成する').click()
    cy.checkTitle('新規ゲーム作成')
    cy.get('[data-cy^="form-quiz-"]').should('have.length', 3)
    cy.contains('+ クイズを追加する').click()
    cy.get('[data-cy^="form-quiz-"]').should('have.length', 4)
  })

  it('can decrease the number of quizzes', () => {
    cy.visit('/home')
    cy.contains('新しいゲームを作成する').click()
    cy.checkTitle('新規ゲーム作成')
    cy.get('[data-cy^="form-quiz-"]').should('have.length', 3)
    cy.get('[data-cy="circle-cross-button"]').first().click()
    cy.get('[data-cy^="form-quiz-"]').should('have.length', 2)
  })
})
