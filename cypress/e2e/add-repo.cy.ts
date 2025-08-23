describe('Add Repository Tests', () => {
  // Set up before each test
  beforeEach(() => {
    // Mock session creation and account fetch to simulate signed-in user
    cy.intercept('POST', '**/v1/account/sessions/email', {
      statusCode: 200,
      body: { $id: 'user123', name: 'Test User' }
    }).as('sessionRequest');

    cy.intercept('GET', '**/v1/account', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User' }
    }).as('getAccount');

    // Perform UI sign-in so tests cover the real flow
    cy.visit('http://localhost:3000/auth/signin');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Sign In').click();
    cy.wait('@sessionRequest');
    cy.wait('@getAccount');
    cy.url().should('include', '/dashboard');

    // Now navigate to add-repo page
    cy.visit('http://localhost:3000/dashboard/add-repo');
  });

  // Basic display test
  it('should show the add repository form', () => {
  cy.contains('Add Repository').should('be.visible');
  cy.get('input[type="url"]').should('exist');
  cy.contains('button', /add/i).should('exist');
  });

  // Test successful repository addition
  it('should add a repository successfully', () => {
    // Mock successful repository creation
    cy.intercept('POST', '**/databases/**/documents**', {
      statusCode: 201,
      body: { $id: 'new-repo' }
    }).as('addRepo');
    
    // Fill and submit the form
  cy.get('input[type="url"]').type('https://github.com/anuj123upadhyay/yaml_files');
  // Ensure the input has the value and the button is enabled
  cy.get('input[type="url"]').should('have.value', 'https://github.com/anuj123upadhyay/yaml_files');
  cy.contains('button', /add/i).should('not.be.disabled').click();
    
    // Verify request and redirect
  cy.wait('@addRepo');
    cy.url().should('include', '/dashboard');
  });

  // Test URL validation
  it('should validate GitHub URL format', () => {
  // Enter invalid URL
  cy.get('input[type="url"]').type('not-a-url');
  cy.contains('button', /add/i).click();
    
    // Should show validation error
    cy.contains('valid', { matchCase: false }).should('be.visible');
    
    // Should still be on the same page
    cy.url().should('include', '/dashboard/add-repo');
  });

  // Test error handling
  it('should handle server errors', () => {
    // Mock server error
    cy.intercept('POST', '**/databases/**/documents**', {
      statusCode: 500,
      body: { message: 'Server error' }
    }).as('addRepoError');
    
    // Fill and submit the form
    cy.get('input[type="url"]').type('https://github.com/anuj123upadhyay/yaml_files');
  cy.contains('button', /add/i).click();
    
  // Verify error is shown (app sets a friendly message on failure)
  cy.wait('@addRepoError');
  cy.contains('Failed to add repository', { matchCase: false }).should('be.visible');
  });

  // Test navigation back to dashboard
  it('should navigate back to dashboard', () => {
  cy.contains('Back').click();
    cy.url().should('include', '/dashboard');
  });
});
