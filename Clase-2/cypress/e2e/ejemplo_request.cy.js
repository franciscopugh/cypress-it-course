describe("Consultar a un servidor con una petición GET", () => {

    it("Obtener datos de un servidor", () => {
        cy.request('http://localhost:4000/users')
        .then((response) => {
            expect(response.status).to.eq(200) // Verifica que el estado de la respuesta sea 200
            expect(response.body).to.be.an('array') // Verifica que el cuerpo de la respuesta sea un array
        })
    })

    it("Obtener un usuario dado su ID", () => {
        cy.request('http://localhost:4000/users/1')
        .then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
            expect(response.status).to.eq(200)
            expect(response.body.nombre).to.eq("Pepe") // Verifica que el nombre del usuario sea "Pepe"
        })
    })
    /*
    it("Obtener datos de un servidor", () => {
        cy.request('https://jsonplaceholder.typicode.com/users/5')
        .then((response) => {
            expect(response.status).to.eq(200) // Verifica que el estado de la respuesta sea 200
            expect(response.body.email).to.eq("Lucio_Hettinger@annie.ca") // Verifica que el mensaje sea el esperado
        })
    })

    it("Realizar una petición POST", () => {
        cy.request({
            method: 'POST',
            url: 'https://jsonplaceholder.typicode.com/posts',
            body: {
                title: 'foo',  
                body: 'bar',
                userId: 1
            }
        }).then((response) => {
            expect(response.status).to.be.oneOf([200, 201]) // Verifica que el estado de la respuesta sea 200 o 201
            cy.log(response.body) // Muestra el cuerpo de la respuesta en la consola
            cy.log(JSON.stringify(response.body)) 
            expect(response.body).to.have.property('id') // Verifica que la respuesta contenga un ID
        })
    })*/
})