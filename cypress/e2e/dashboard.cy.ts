// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', () => false);
describe('Dashboard Page', () => {
  beforeEach(() => {
    // Use desktop viewport so the desktop-only buttons are visible
    cy.viewport(1280, 800);
    // Stub authentication check
    cy.intercept('GET', '**/v1/account', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User' }
    }).as('getAccount');
    // Stub user document fetch (AuthContext)
    cy.intercept('GET', '**/v1/databases/**/collections/**/documents/**', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User', notification_frequency: 'immediate' }
    }).as('getUserDoc');
    // Stub repositories list fetch
    cy.intercept('GET', '**/v1/databases/**/collections/**/documents?*', {
      statusCode: 200,
      body: { documents: [] }
    }).as('getRepos');
  });

  it('should display the dashboard elements', () => {
  cy.visit('http://localhost:3000/dashboard');
  cy.wait('@getAccount');
  cy.wait('@getUserDoc');
  cy.wait('@getRepos');
    cy.contains('Settings').should('be.visible');
  // Verify desktop Add Repository button
  cy.get('div.hidden.sm\\:block').contains('button', 'Add Repository').should('be.visible');
  });
});


