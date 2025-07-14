describe("Test de Login completo", ()=> {
    //Previo a todos los test ejecuto una vez este before
    before(()=> {
        //Mostrar un mensaje en la consola
        cy.log("Iniciando los test de login completo")
    })
    
    //Ejecuto este before antes de cada test
    beforeEach(()=> {
        cy.visit("https://practicetestautomation.com/practice-test-login/")
    })

    //Ejecuto este after posterior a cada test
    afterEach(()=> {
        cy.log("Finalizando el test de login completo")
    })

    //Posterior a todos los test ejecuto una vez este after
    after(()=> {
        cy.log("Todos los test de login completo han finalizado")
    })

    it("Caso 1: Login existoso", ()=> {
        cy.get("#username").type("student")
        cy.get("#password").type("Password123")
        cy.get("#submit").click()
        //Valido el redireccion a la pagina de exito
        cy.url().should("include", "success")
        cy.get("h1[class='post-title']").should("contain", "Logged In Successfully")
    })
    it("Caso 2: Login fallido por user", ()=> {
        cy.get("#username").type("student12")
        cy.get("#password").type("Password123")
        cy.get("#submit").click()
      
        cy.get("#error").should("contain", "Your username is invalid!")
    })

    it("Caso 3: Login fallido por password", ()=> {
        cy.get("#username").type("student")
        cy.get("#password").type("Password1234")
        cy.get("#submit").click()
      
        cy.get("#error").should("contain", "Your password is invalid!")
    })
    it("Caso 4: Login y Logout dos veces", () => {
        cy.login()
        cy.get("a[href='https://practicetestautomation.com/practice-test-login/']").click()
        cy.login()
        cy.get("a[href='https://practicetestautomation.com/practice-test-login/']").click()
    })
})