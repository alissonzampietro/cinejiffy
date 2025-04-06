describe('Favorites Page', () => {
    beforeEach(() => {
      cy.visit('/favorites')
    })
  
    describe('Empty State', () => {
      it('should show empty state message when no favorites', () => {
        cy.get('[data-cy="no-favorites-message"]').should('be.visible')
      })
    })
  
    describe('Favorites Management', () => {
      beforeEach(() => {
        // Add a movie to favorites first
        cy.visit('/')
        cy.get('[data-cy="movie-card"]').first()
          .find('[data-cy="favorite-button"]')
          .click()
      })
  
      it('should display favorited movies', () => {
        cy.visit('/favorites')
        cy.get('[data-cy="loading-spinner"]').should('not.exist')
        cy.get('[data-cy="movie-card"]').should('have.length.at.least', 1)
      })
  
      it('should remove movie from favorites', () => {
        cy.visit('/favorites')
        cy.get('[data-cy="loading-spinner"]').should('not.exist')
        cy.get('[data-cy="movie-card"]').first()
          .find('[data-cy="favorite-button"]')
          .click()
        cy.get('[data-cy="no-favorites-message"]').should('be.visible')
      })
    })
  })