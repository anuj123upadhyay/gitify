describe('Authentication Tests', () => {
  // Simple test for the sign in page
  it('should show the sign in page correctly', () => {
    // Visit the sign in page
    cy.visit('http://localhost:3000/auth/signin');
    
    // Check that basic elements exist
    cy.contains('Sign In').should('be.visible');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.contains('button', 'Sign In').should('exist');
  });

  // Test sign in functionality
  it('should log in successfully', () => {
    // Mock the login API call to return success
    cy.intercept('POST', '**/account/sessions/email', {
      statusCode: 200,
      body: { $id: 'user123', name: 'Test User' }
    }).as('loginRequest');

    // Mock GET /v1/account to simulate authenticated user after login
    cy.intercept('GET', '**/v1/account', {
      statusCode: 200,
      body: { $id: 'user123', email: 'test@example.com', name: 'Test User' }
    }).as('getAccount');

    // Visit page and fill the form
    cy.visit('http://localhost:3000/auth/signin');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.contains('button', 'Sign In').click();
    
    // Verify request was made and we redirected
    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
  });

  // Test form validation
  it('should validate the sign in form', () => {
    cy.visit('http://localhost:3000/auth/signin');
    
    // Try to submit empty form
    cy.contains('button', 'Sign In').click();
    
    
    // Try invalid email
    cy.get('input[type="email"]').type('not-an-email');
    cy.get('input[type="email"]').should('have.prop', 'validationMessage').and('not.be.empty');
  });

  // Test navigation between auth pages
  it('should navigate between sign in and sign up pages', () => {
    cy.visit('http://localhost:3000/auth/signin');
    
  // Go to sign up page (link text is 'create a new account')
  cy.contains('create a new account', { matchCase: false }).click();
  cy.url().should('include', '/auth/signup');
    
  // Check we're on the right page (heading is 'Create your account')
  cy.contains('Create your account').should('be.visible');
  });

  // Test sign up functionality
  it('should sign up a new user', () => {
    // Mock the signup API call (match Appwrite v1 path) and alias it
    cy.intercept('POST', '**/v1/account', {
      statusCode: 201,
      body: { $id: 'new-user', name: 'New User' }
    }).as('signupRequest');

    // Also mock the login (session creation) that happens after signup and alias it
    cy.intercept('POST', '**/v1/account/sessions/email', {
      statusCode: 200
    }).as('sessionRequest');

    // Mock GET /v1/account that checkAuth calls after signup/signin
    cy.intercept('GET', '**/v1/account', {
      statusCode: 200,
      body: { $id: 'new-user', email: 'new@example.com', name: 'New User' }
    }).as('getAccountAfterSignup');

    // Visit signup page and fill form
    cy.visit('http://localhost:3000/auth/signup');
    cy.get('input[name="name"]').type('New User');
    cy.get('input[type="email"]').type('new@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');

  cy.contains('button', 'Create Account').click();
    
  // Wait for session creation and account fetch (checkAuth) then assert redirect
  cy.wait('@sessionRequest');
  cy.wait('@getAccountAfterSignup');
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });

  // Test GitHub login
  // it('should handle GitHub login', () => {
  //   // Mock the GitHub OAuth redirect
  //   cy.intercept('GET', '**/account/sessions/oauth2/github**', {
  //     statusCode: 302,
  //     headers: { 'Location': 'http://localhost:3000/auth/callback' }
  //   }).as('githubAuth');
    
  //   // Mock the auth callback
  //   cy.intercept('GET', '**/api/auth/session', {
  //     user: { name: 'GitHub User' }
  //   });
  //   // Mock the Appwrite GET /v1/account endpoint after OAuth
  //   cy.intercept('GET', '**/v1/account', {
  //     statusCode: 200,
  //     body: { $id: 'github-user', name: 'GitHub User' }
  //   }).as('getAccountGithub');

  //   // Click GitHub login
  //   cy.visit('http://localhost:3000/auth/signin');
  //   cy.contains('GitHub').click();
    
  //   // Mock the callback page and verify redirect
  //   cy.visit('http://localhost:3000/auth/callback');
  //   cy.wait('@getAccountGithub');
  //   cy.url().should('include', '/dashboard');
  // });
});
