describe('CRUD de tareas', () => {
  it('crea y elimina una tarea', () => {
    cy.visit('/')
    cy.get('input[placeholder="Nueva tarea"]').type('Tarea Cypress{enter}')
    cy.contains('Tarea Cypress')
    cy.get('button.delete').click()
    cy.contains('Tarea Cypress').should('not.exist')
  })
})
