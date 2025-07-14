
import TaskForm from '../../src/components/TaskForm'

describe('<TaskForm />', () => {
  it('permite agregar tarea', () => {
    const onAdd = cy.stub().as('onAdd')
    cy.mount(<TaskForm onAdd={onAdd} />)
    cy.get('input').type('Aprender Cypress')
    cy.get('button').click()
    cy.get('@onAdd').should('have.been.calledWith', 'Aprender Cypress')
  })
})
