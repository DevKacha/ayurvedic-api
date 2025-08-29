const mongoose = require('mongoose');

const tipsSchema = new mongoose.Schema({
    tips: { type: String, required: true }
}, { timestamps: true });

// Auto-increment ID middleware
tipsSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastTip = await this.constructor.findOne().sort({ _id: -1 });
        this._id = lastTip ? lastTip._id + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('Tips', tipsSchema);
