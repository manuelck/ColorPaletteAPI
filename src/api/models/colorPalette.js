const mongoose = require("mongoose");

const colorPaletteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    colors: { type: [String], required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    public: { type: Boolean, default: false } 
});

const ColorPalette = mongoose.model('ColorPalette', colorPaletteSchema);
module.exports = ColorPalette;
