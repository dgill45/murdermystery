const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/murderMystery', { useNewUrlParser: true, useUnifiedTopology: true });

// Define RSVP Schema
const rsvpSchema = new mongoose.Schema({
    name: String,
    address: String,
    attending: String,
    character: String
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

// Handle form submissions
app.post('/api/rsvp', (req, res) => {
    const newRSVP = new RSVP(req.body);

    newRSVP.save()
        .then(() => res.status(201).send('RSVP saved!'))
        .catch(err => res.status(400).send(err));
});

// Get all RSVPs
app.get('/api/rsvps', (req, res) => {
    RSVP.find()
        .then(rsvps => res.json(rsvps))
        .catch(err => res.status(400).send(err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
