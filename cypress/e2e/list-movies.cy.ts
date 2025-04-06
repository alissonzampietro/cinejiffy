describe('Movie List Page', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    describe('Layout and Initial Load', () => {
      it('should display the movie catalog title', () => {
        cy.get('h1').should('contain', 'Movie Catalog')
      })
  
      it('should show filter components', () => {
        cy.get('[data-cy="filter-bar"]').should('be.visible')
        cy.get('[data-cy="sort-filter"]').should('be.visible')
      })
    })
  
    describe('Search and Filters', () => {
      it('should filter movies by search query', () => {
        cy.get('[data-cy="search-input"]').type('Batman')
        cy.get('[data-cy="movie-card"]').should('exist')
      })
  
      it('should filter by year', () => {
        cy.get('[data-cy="year-filter"]').click()
        cy.contains('2023').click()
        cy.get('[data-cy="movie-card"]').should('exist')
      })
  
      it('should filter by genre', () => {
        cy.get('[data-cy="genre-filter"]').click()
        cy.contains('Action').click()
        cy.get('[data-cy="movie-card"]').should('exist')
      })
    })
  
    describe('Pagination', () => {
      it('should navigate through pages', () => {
        cy.get('[data-cy="pagination"]').should('be.visible')
        cy.get('[data-cy="next-page"]').click()
        cy.get('[data-cy="movie-card"]').should('exist')
      })
    })
  })