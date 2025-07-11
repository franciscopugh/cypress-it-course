import {faker } from '@faker-js/faker';

describe("Test Create con Faker via request", () => {
    const API = 'http://localhost:4000/users'
    it("Crear un usuario con Faker", () => {
        let fullName = faker.person.fullName();
        const newUser = {
            nombre: fullName,
            email: `${Date.now()}_${faker.internet.email({firstName: fullName})}`
        }

        cy.request({
            method: 'POST',
            url: API,
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'
            }}).then(response => {
                expect(response.status).to.eq(201) //Verificar que la respuesta sea 201 Created
            })
    })
} )

cy.exec()