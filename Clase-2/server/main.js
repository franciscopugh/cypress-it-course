import express from 'express';

const app = express();
const PORT = 4000;

app.use(express.json())

const users = [
    {
        id: 1,
        nombre: "Pepe",
        email: "Perez"
    }
]

app.get('/users', (req,res) => {
    console.log(req.query)
    if(req.query.query == "crash") {
        throw new Error("Error forzado para probar el manejo de errores");
    }
    res.status(200).json(users)
})

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});

app.post('/users', (req, res) => {
    const { nombre, email } = req.body;
    // Validar que los campos requeridos estén presentes
    if (!nombre || !email) {
        return res.status(400).json({ message: "Nombre y email son requeridos" });
    }
    // Validar que el email sea unico
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "El email ya está en uso" });
    }
    const newUser = req.body;
    newUser.id = users.length + 1; // Asignar un nuevo ID
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
});

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}   );
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});