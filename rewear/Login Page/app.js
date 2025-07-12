const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Fake user database (replace with a real database in a production environment)
const users = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML file is in a 'public' folder

app.get('/', (req, res) => {
    res.sendFile('public/login.html', { root: __dirname });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple authentication (replace with a proper authentication mechanism)
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Successful login
        // You may want to set up a session here and redirect to a dashboard page
        res.send('Login successful!');
    } else {
        // Failed login
        res.status(401).send('Invalid username or password');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});