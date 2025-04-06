describe('Movie Details Page', () => {
    beforeEach(() => {
      // Visit the main page and click on a movie to get to details
      cy.visit('/')
      cy.get('[data-cy="movie-card"]').first().click()
    })
  
    describe('Movie Information Display', () => {
      it('should display movie details', () => {
        cy.get('[data-cy="movie-title"]').should('be.visible')
        cy.get('[data-cy="movie-overview"]').should('be.visible')
        cy.get('[data-cy="movie-backdrop"]').should('be.visible')
      })
  
      it('should display movie metadata', () => {
        cy.get('[data-cy="release-date"]').should('be.visible')
        cy.get('[data-cy="rating"]').should('be.visible')
        cy.get('[data-cy="genres"]').should('be.visible')
      })
    })
  
    describe('Error Handling', () => {
      it('should handle invalid movie ID', () => {
        cy.visit('/movie/999999999')
        cy.get('[data-cy="error-message"]').should('be.visible')
      })
    })
  
    describe('Navigation', () => {
      it('should return to previous page', () => {
        cy.get('[data-cy="back-button"]').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
  })