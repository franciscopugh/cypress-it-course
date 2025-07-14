describe("Primer test", () => {
    /*it("Visitar la pagina de Google", () => {
        //Visito la pagina de Google
        cy.visit("https://www.google.com")

        //Verificar si existe el logo de Google
        cy.get("svg[class='lnXdpd']").should("exist")
        //Busqueda -> Verifica

    })*/

    it("Buscar 'Cypress' en Google", () => {
        cy.visit("https://www.google.com")
        //Escribir 'Cypress' en el input de busqueda
        cy.get("textarea[name='q']").type("Cypress{enter}")
        //Consulto el text area, tipeo 'Cypress' y presiono Enter. Las teclas especiales van entre llaves
    })

})