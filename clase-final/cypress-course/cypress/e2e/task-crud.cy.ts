describe('Task CRUD', () => {
  beforeEach(() => {
    cy.visit('/http://localhost:4200/');
  });

  it('debería agregar, completar y borrar una tarea', () => {
    cy.get('input').type('Probar Cypress');
    cy.contains('Agregar').click();
    cy.contains('Probar Cypress').should('exist');

    cy.contains('✔️').click();
    cy.contains('Probar Cypress').should('have.class', 'line-through');

    cy.contains('🗑️').click();
    cy.contains('Probar Cypress').should('not.exist');
  });
});
