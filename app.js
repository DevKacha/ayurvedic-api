const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const Remedy = require('./models/Remedy');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
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


// POST multiple remedies
app.post('/api/remedies', async (req, res) => {
  try {
    const remedies = await Remedy.insertMany(req.body);
    res.status(201).json(remedies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// PUT update remedy
app.put('/api/remedies/:id', async (req, res) => {
  try {
    const updatedRemedy = await Remedy.findOneAndUpdate(
      { remedy_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedRemedy) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.json(updatedRemedy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE remedy by remedy_id
app.delete('/api/remedies/:id', async (req, res) => {
  try {
    const result = await Remedy.findOneAndDelete({ remedy_id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: 'Remedy not found' });
    }
    res.json({ message: 'Remedy deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
