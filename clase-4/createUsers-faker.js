import fs from 'fs';
import { faker } from '@faker-js/faker';

const salida = fs.createWriteStream('cypress/fixtures/users-faker.json');

const createUsersFaker = (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        let fullName = faker.person.fullName();
        const newUser = {
            id: i + 1,
            nombre: fullName,
            email: `${Date.now()}_${faker.internet.email({firstName: fullName})}`
        }
      
        users.push(newUser)
    }
    salida.write(JSON.stringify(users, null, 2));
    salida.end();
    console.log(`Archivo users.json creado con ${numUsers} usuarios.`);
}

createUsersFaker(100)
