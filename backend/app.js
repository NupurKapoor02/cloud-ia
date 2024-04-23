// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Set up bodyParser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up a route to serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>21BCP255</title>
            </head>
            <body>
                <h1>Roll no.: 21BCP255</h1>
                <form action="/" method="post">
                    <label for="name">Enter your name:</label><br>
                    <input type="text" id="name" name="name"><br><br>
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
    `);
});

// Set up a route to handle form submission
app.post('/', (req, res) => {
    const name = req.body.name;
    res.send(`
        <html>
            <head>
                <title>Form Submitted</title>
            </head>
            <body>
                <h1>Form Submitted</h1>
                <p>Your name is: ${name}</p>
                <a href="/">Go back to form</a>
            </body>
        </html>
    `);
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server is running on port ${PORT}");
});