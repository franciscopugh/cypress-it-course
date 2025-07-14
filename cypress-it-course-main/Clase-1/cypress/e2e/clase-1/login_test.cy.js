describe("Test de Login", () => {
    it("Case 1: Login exitoso", () => {
        cy.visit("https://practicetestautomation.com/practice-test-login/")
        cy.get("#username").type("student")
        cy.get("#password").type("Password123")
        cy.get("#submit").click()
        //Valido el redireccion a la pagina de exito
        
        cy.url().should("include", "success")
        cy.get("h1[class='post-title']").should("contain", "Logged In Successfully")
        //Selecciono el h1 con la clase post-title y verifico que contenga el texto 'Logged In Successfully'
        cy.request()
    })
})