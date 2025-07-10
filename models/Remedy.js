const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
    remedy_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    preparation_steps: { type: String, required: true },
    usage: { type: String, required: true },
    ailment: { type: String, required: true },
    precautions: { type: String },
    category: { type: String },
    dosage: { type: String },
    age_group: { type: String },
    image_url: { type: String },
    source_reference: { type: String },
    is_verified: { type: Boolean, default: false },
    language: { type: String, default: 'English' },
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Remedy', remedySchema);
