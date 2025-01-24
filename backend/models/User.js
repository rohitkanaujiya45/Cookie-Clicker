
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    totalScore: { type: Number, default: 0 },
    prizesWon: { type: Number, default: 0 },
    clicks: { type: Number, default: 1 },
});
module.exports = mongoose.model('User', userSchema);