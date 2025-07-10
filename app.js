const express = require('express');
const mongoose = require('mongoose');
const Remedy = require('./models/Remedy');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ayurvedicdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error(err);
});

app.post('/api/remedies', async (req, res) => {
    try {
        const remedy = new Remedy(req.body);
        await remedy.save();
        res.status(201).json(remedy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/remedies', async (req, res) => {
    try {
        const remedies = await Remedy.find();
        res.json(remedies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3001'));
