// ---------------------------------------------
// Simplified Settings Page Test
// ---------------------------------------------
// Prevent application errors from failing tests
Cypress.on('uncaught:exception', () => false);
describe('Settings Page Navigation', () => {
  beforeEach(() => {
    // Stub account fetch to simulate authenticated user
    cy.intercept('GET', '**/v1/account', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User' }
    }).as('getAccount');
    // Stub Appwrite document fetch for AuthContext user and settings page
    cy.intercept('GET', '**/v1/databases/**/collections/**/documents/*', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User', notification_frequency: 'immediate' }
    }).as('getUserDoc');
  });

  it('loads settings page and shows back link', () => {
    cy.visit('/dashboard/settings');
    cy.wait('@getAccount');
    cy.wait('@getUserDoc');
    cy.contains('Settings').should('be.visible');
    // Verify Back to Dashboard link exists
    cy.get('a[href="/dashboard"]').should('exist');
  });
});
