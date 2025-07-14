//Genero un nuevo comando de Cypress para login
Cypress.Commands.add("login", (user="student", password="Password123") => {
     cy.get("#username").type(user)
        cy.get("#password").type(password)
        cy.get("#submit").click()
        //Valido el redireccion a la pagina de exito
        cy.url().should("include", "success")
        cy.get("h1[class='post-title']").should("contain", "Logged In Successfully")
})