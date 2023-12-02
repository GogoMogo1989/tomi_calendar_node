const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const fs = require('fs');

app.use(express.static(path.join(__dirname, '/')));
app.use(express.json()); 

app.get('/api/contacts', (req, res) => {
    fs.readFile('db.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const contacts = JSON.parse(data);
            res.json(contacts);
        }
    });
});

app.post('/api/addContact', (req, res) => {
    console.log('Received request with body:', req.body); 
    fs.readFile('db.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const contacts = JSON.parse(data);
            const newContact = req.body;
            contacts.contacts.push(newContact);

            fs.writeFile('db.json', JSON.stringify(contacts), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json({ message: 'Contact added successfully', contact: newContact });
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`A szerver fut a http://localhost:${port} címen.`);
});
