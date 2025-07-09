describe("Test UI Request de Users", () => {
    let usuariosAPI //Variable para almacenar los usuarios de la API para testear que funcione OK
    before(() => {
        cy.request('http://localhost:4000/users')
        .then((response) => {
            expect(response.status).to.eq(200) //Verificar que la respuesta sea 200 OK
            usuariosAPI = response.body //Guardar los usuarios de la API en la variable
        })
    })

    it("Verificar que los usuarios se muestren en la UI", () => {
        cy.visit('/index.html') //Visitar la página principal

        cy.get('.users-card').should('have.length', usuariosAPI.length) //Verificar que la cantidad de usuarios en la UI sea igual a la cantidad de usuarios en la API
      
        //Validar que los datos de los usuarios en la UI sean iguales a los de la API
        usuariosAPI.forEach(usuario => {
            cy.get(`#user-${usuario.id}`).should('exist') //Verificar que el usuario exista en la UI
            cy.get(`#user-${usuario.id} h3`).should('contain', usuario.nombre) //Verificar que el nombre del usuario sea correcto
            cy.get(`#user-${usuario.id} p`).should('contain', usuario.email) //Verificar que el email del usuario sea correcto
        })
    })

    it("Verificar que se puede crear un nuevo usuario",() => {
        cy.visit('/newUser.html') //Visitar la página de creación de usuario
        cy.xpath('/html/body/form/input[1]').type('Francisco')
        cy.xpath('/html/body/form/input[2]').type('f67rtr67ar@f.com')
        cy.xpath('/html/body/form/button').click() //Enviar el formulario
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario creado correctamente') //Verificar que el mensaje de éxito se muestre correctamente
    })

})