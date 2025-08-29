const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const Remedy = require('./models/Remedy');
const Tips = require('./models/Tips');


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

// app.post('/api/remedies', async (req, res) => {
//   try {
//     const remedy = new Remedy(req.body);
//     await remedy.save();
//     res.status(201).json(remedy);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });



app.get('/api/remedies', async (req, res) => {
  try {
    const remedies = await Remedy.find();
    res.json(remedies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post('/api/remedies', async (req, res) => {
  try {
    const remedies = await Remedy.insertMany(req.body, { ordered: false });
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

// ==================== TIPS CRUD API ENDPOINTS ====================

// GET all tips
app.get('/api/tips', async (req, res) => {
  try {
    const tips = await Tips.find();
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET tip by ID
app.get('/api/tips/:id', async (req, res) => {
  try {
    const tip = await Tips.findById(req.params.id);
    if (!tip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new tip
app.post('/api/tips', async (req, res) => {
  try {
    const tip = new Tips({ tips: req.body.tips });
    await tip.save();
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST create multiple tips
app.post('/api/tips/bulk', async (req, res) => {
  try {
    const tipsData = req.body.map(item => ({ tips: item.tips }));
    const tips = await Tips.insertMany(tipsData, { ordered: false });
    res.status(201).json(tips);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update tip
app.put('/api/tips/:id', async (req, res) => {
  try {
    const updatedTip = await Tips.findByIdAndUpdate(
      req.params.id,
      { tips: req.body.tips },
      { new: true }
    );
    if (!updatedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json(updatedTip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE tip by ID
app.delete('/api/tips/:id', async (req, res) => {
  try {
    const result = await Tips.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    res.json({ message: 'Tip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
