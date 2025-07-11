import {faker} from '@faker-js/faker';

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
        cy.fixture('usuarioBase').then((usuarioBase) => {
            cy.xpath('/html/body/form/input[1]').type(usuarioBase.nombre) //Ingresar el nombre del usuario
            cy.xpath('/html/body/form/input[2]').type(`${Date.now()}_${
        faker.internet.email({firstName: usuarioBase.nombre})}`) //Ingresar un email aleatorio
        })
        cy.xpath('/html/body/form/button').click() //Enviar el formulario
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario creado correctamente') //Verificar que el mensaje de éxito se muestre correctamente
    })

    it("Consultar un usuario dado su ID", () => {
        cy.visit(`/getUser.html?id=${usuariosAPI.length +1}`) //Visitar la página de consulta de usuario
        cy.xpath('//*[@id="user"]').should('exist') //Verificar que el contenedor del usuario exista
    })

     it("Verificar que se pueda editar un usuario",() => {
        cy.visit(`/editUser.html?id=${usuariosAPI.length +1}`) //Visitar la página de creación de usuario
        cy.fixture('usuarioBase').then((usuarioBase) => {
            const last_name = faker.person.lastName()
            cy.xpath('/html/body/form/input[1]').clear().type(`${usuarioBase.nombre} ${last_name}`)
            cy.xpath('/html/body/form/input[2]').clear().type(`${Date.now()}_${faker.internet.email({firstName: usuarioBase.nombre, lastName: last_name, provider: "gmail.com"})}`) //Ingresar un email aleatorio
        })
        
        cy.xpath('/html/body/form/button').click() //Enviar el formulario
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario editado correctamente') //Verificar que el mensaje de éxito se muestre correctamente
    })

    it("Eliminar un usuario dado su ID", () => {
        cy.visit('/deleteUser.html') //Visitar la página de eliminación de usuario
        cy.xpath('//*[@id="userId"]').type(usuariosAPI.length + 1) //Ingresar el ID del usuario a eliminar
        cy.xpath('//form/button').click() //Enviar el formulario
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario eliminado correctamente') //Verificar que el mensaje de éxito se muestre correctamente
    })


})