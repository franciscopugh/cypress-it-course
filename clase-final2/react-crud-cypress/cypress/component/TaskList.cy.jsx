import TaskList from '../../src/components/TaskList'

describe('<TaskList />', () => {
  it('muestra tareas y permite eliminar', () => {
    const onDelete = cy.stub().as('onDelete')
    const tasks = [{ id: '1', title: 'Tarea de prueba' },
                     { id: '2', title: 'Otra tarea' },
                        { id: '3', title: 'Tarea adicional' }
    ]
    // Monto el componente con las tareas de prueba
    cy.mount(<TaskList tasks={tasks} onDelete={onDelete} />)
    cy.contains('Tarea de prueba')
    cy.xpath('/html/body/div/ul/li[1]/button').click()
    cy.get('@onDelete').should('have.been.calledWith', '1')

    cy.xpath('/html/body/div/ul/li[2]/button').click()
    cy.get('@onDelete').should('have.been.calledWith', '2')

    cy.xpath('/html/body/div/ul/li[3]/button').click()
    cy.get('@onDelete').should('have.been.calledWith', '3')
  })
})
