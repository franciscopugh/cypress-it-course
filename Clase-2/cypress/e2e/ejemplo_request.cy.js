describe("Consultar a un servidor con una petición GET", () => {

    it("Obtener datos de un servidor", () => {
        cy.request('http://localhost:4000/users')
        .then((response) => {
            expect(response.status).to.eq(200) // Verifica que el estado de la respuesta sea 200
            expect(response.body).to.be.an('array') // Verifica que el cuerpo de la respuesta sea un array
        })
    })

    it("Obtener datos de un servidor y que el mismo falle", () => {
        cy.request({
            url: 'http://localhost:4000/users?query=crash', // Agrega un query parameter para forzar un error,
            failOnStatusCode: false // Evita que Cypress falle si el estado de la respuesta es 500
        }).then((response) => {
           expect(response.status).to.eq(500) // Verifica que el estado de la respuesta sea 500
           
        })
    })

    it("Crear un nuevo usuario",()=> {
        cy.request({
            method:'POST',
            url:'http://localhost:4000/users',
            body:{
                nombre: "Pancho",
                email: "panchito@panchito.com"
            }            
        }).then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
             expect(response.status).to.be.oneOf([200, 201])
             expect(response.body).to.have.property('id') // Verifica que la respuesta contenga un ID
        })
    })

    it("Crear un nuevo usuario pero no enviando el nombre",()=> {
        cy.request({
            method:'POST',
            url:'http://localhost:4000/users',
            body:{
                email: "hola@panchito.com"
            } ,
            failOnStatusCode: false   // Evita que Cypress falle si el estado de la respuesta es 400        
        }).then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
             expect(response.status).to.eq(400)
             expect(response.body.message).to.eq("Nombre y email son requeridos") // Verifica que el mensaje de error sea el esperado
             
        })
    })

    it("Crear un nuevo usuario pero no enviando el mail",()=> {
        cy.request({
            method:'POST',
            url:'http://localhost:4000/users',
            body:{
                nombre: "Pancho"
            }            ,
            failOnStatusCode: false
        }).then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
             expect(response.status).to.eq(400)
             expect(response.body.message).to.eq("Nombre y email son requeridos") // Verifica que el mensaje de error sea el esperado
        })
    })

    it("Crear un nuevo usuario pero con un email ya existente",()=> {
        cy.request({
            method:'POST',
            url:'http://localhost:4000/users',
            body:{
                nombre: "Pancho",
                email: "panchito@panchito.com"
            }  ,
            failOnStatusCode: false           
        }).then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
             expect(response.status).to.eq(400)
             expect(response.body.message).to.eq("El email ya está en uso") // Verifica que el mensaje de error sea el esperado
             
        })
    })


    it("Obtener un usuario dado su ID", () => {
        cy.request('http://localhost:4000/users/2')
        .then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
            expect(response.status).to.eq(200)
            expect(response.body.nombre).to.eq("Pancho") // Verifica que el nombre del usuario sea "Pepe"
        })
    })

    it("Actualizar un usuario dado su ID", () => {
        cy.request({
            method: 'PUT',
            url: 'http://localhost:4000/users/2',
            body: {
                nombre: "Pepita",
                email: "pepita@pepita.com"
            }
        }).then((response) => {
            cy.log(JSON.stringify(response.body)) // Muestra el cuerpo de la respuesta en la consola
            expect(response.status).to.eq(200) // Verifica que el estado de la respuesta sea 200
            expect(response.body.nombre).to.eq("Pepita") // Verifica que el nombre del usuario sea "Pepita"
        })
    })
    it("Eliminar un usuario dado su ID", () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:4000/users/2'
        }).then((response) => {
            expect(response.status).to.eq(204) // Verifica que el estado de la respuesta sea 204 (No Content)
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