const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
    remedyId: {
        type: String,
        unique: true,
        default: function () {
            return 'RMDY' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
        }
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    preparationSteps: { type: [String], required: true },
    usage: { type: String, required: true },
    ailment: { type: String, required: true },
    precautions: { type: String },
    category: { type: String },
    dosage: { type: String },
    ageGroup: { type: String },
    imageUrl: { type: String },
    sourceReference: { type: String },
    isVerified: { type: Boolean, default: false },
    language: { type: String, default: 'English' },
    tags: [String],
    tip: { type: String },
    type: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Remedy', remedySchema);
