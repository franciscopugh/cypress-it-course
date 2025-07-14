import React from 'react'
import TaskList from '../../src/components/TaskList'

describe('<TaskList />', () => {
  it('muestra tareas y permite eliminar', () => {
    const onDelete = cy.stub().as('onDelete')
    const tasks = [{ id: '1', title: 'Tarea de prueba' }]
    cy.mount(<TaskList tasks={tasks} onDelete={onDelete} />)
    cy.contains('Tarea de prueba')
    cy.get('button.delete').click()
    cy.get('@onDelete').should('have.been.calledWith', '1')
  })
})
