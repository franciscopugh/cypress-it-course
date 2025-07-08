describe("Formulario con XPath", () => {
    beforeEach(() => {
        cy.visit("/index.html");
    })
    it("Completar campos de formulario con XPath", () => {
        /*
            /   Hijo directo
            // Descendiente en cualquier nivel
            form/div/div/input[1] El primer input dentro de un div que es hijo de un div que es hijo de un form
            form//input[1] El primer input dentro de un form, sin importar el nivel de anidamiento
        */
       
        cy.xpath("//div/form/div/div[1]/div/input[1]").type('Francisco Pugh') // cy.get("input[name='nombre']")
        cy.xpath("//div/form/div/div[2]//input").type('fran@fran.com')
        cy.xpath("//div/form/div//textarea").type('Hola, este es un mensaje de prueba.')
        cy.xpath("//div/form//button[1]").click()
        
    })
})