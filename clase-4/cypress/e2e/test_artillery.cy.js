import {faker } from '@faker-js/faker';

describe("Test Create con Faker via request", () => {
    const API = 'http://localhost:4000/users'
    it("Crear un usuario con Faker", () => {
        let fullName = faker.person.fullName();
        const newUser = {
            nombre: fullName,
            email: `${Date.now()}_${faker.internet.email({firstName: fullName})}`
        }

        //Peticion real a la API
      /* cy.request({
            method: 'POST',
            url: API,
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
                expect(response.status).to.eq(201) //Verificar que la respuesta sea 201 Created
            })

    */
        cy.intercept('GET', API,  {
            statusCode:200,
            body: [
                {
                    id: 1,
                    nombre: newUser.nombre,
                    email: newUser.email
                },
                {
                    id: 2,
                    nombre: faker.person.fullName(),
                    email: `${Date.now()}_${faker.internet.email({firstName: faker.person.firstName()})}`
                }
            ]
        }).as('getUsers')

        cy.visit('/index.html') //Visitar la página principal
        cy.wait('@getUsers').then((interception) => {
            expect(interception.response.statusCode).to.eq(200) //Verificar que la respuesta sea 200 OK
            expect(interception.response.body).to.have.length(2) //Verificar que la cantidad de usuarios sea 2
        })
        
        /*
        cy.visit('/newUser.html') //Visitar la página de creación de usuario
        
        cy.xpath('/html/body/form/input[1]').type(newUser.nombre) //Ingresar el nombre del usuario
        cy.xpath('/html/body/form/input[2]').type(newUser.email) //Ingresar el email del usuario
        
        cy.xpath('/html/body/form/button').click() //Enviar el formulario
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario creado correctamente') //Verificar que el mensaje de éxito se muestre correctamente

        //Interceptar la peticion para verificar que se haya creado el usuario
        cy.intercept('POST', API, (req) =>{
            expect(req.response.body).to.have.property('nombre', newUser.nombre) //Verificar que el nombre del usuario sea correcto
            expect(interception.response.body).to.have.property('email', newUser.email) //Verificar que el email del usuario sea correcto

            req.reply({
                statusCode: 201, //Código de estado esperado para la creación exitosa,
                body: {
                    nombre: newUser.nombre,
                    email: newUser.email,
                    id: 1 //Simular que el usuario fue creado con ID 1
                }
            })
                
        }).as('createUser')

        
        //Simulo un error en la creacion del usuario
        cy.intercept('POST', API, {
            statusCode: 500,
            body: {'error': 'Internal Server Error'}
        }).as('createUserError')

        //Simular la peticion de creacion del usuario
        cy.wait('@createUser').its('response.statusCode').should('eq', 201) //Verificar que la respuesta sea 201 Created
        cy.xpath('//*[@id="p_error"]').should('contain', 'Usuario creado correctamente') //Verificar que el mensaje de éxito se muestre correctamente
*/
    })})