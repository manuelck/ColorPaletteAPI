const ColorPalette = require('../models/colorPalette');

exports.createPalette = async (req, res) => {
    try {
        const { name, colors, public } = req.body;

        if (!name || !colors) {
            return res.status(400).json({ message: "Name and colors are required" });
        }

        const userId = req.user.id; 

        const palette = new ColorPalette({
            name,
            colors,
            user: userId,
            public
        });

        await palette.save();
        res.status(201).json({ message: 'Color palette created successfully', palette });
    } catch (error) {
        res.status(500).json({ message: 'Error creating color palette', error });
    }
};

exports.getPalettes = async (req, res) => {
    try {
        const palettes = await ColorPalette.find({ public: true }) 
            .populate('user', 'username role') 
            .exec();

        res.status(200).json(palettes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching palettes', error });
    }
};

exports.getPaletteById = async (req, res) => {
    try {
        const palette = await ColorPalette.findById(req.params.id)
            .populate('user', 'username role') 
            .exec();

        if (!palette) {
            return res.status(404).json({ message: 'Palette not found' });
        }

        res.status(200).json(palette);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching palette', error });
    }
};

exports.updatePalette = async (req, res) => {
    try {
        const { name, colors } = req.body; 
        const paletteId = req.params.id;

        const palette = await ColorPalette.findById(paletteId).exec();
        if (!palette) {
            return res.status(404).json({ message: 'Palette not found' });
        }

        if (req.user.role !== 'admin' && palette.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to update this palette' });
        }

        if (name) {
            palette.name = name;
        }
        if (colors) {
            palette.colors = colors; 
        }

        const updatedPalette = await palette.save();

        res.status(200).json({ message: 'Palette updated successfully', palette: updatedPalette });
    } catch (error) {
        res.status(500).json({ message: 'Error updating palette', error });
    }
};

exports.deletePalette = async (req, res) => {
    try {
        const paletteId = req.params.id;

        const palette = await ColorPalette.findById(paletteId).exec();
        if (!palette) {
            return res.status(404).json({ message: 'Palette not found' });
        }

        if (req.user.role !== 'admin' && palette.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You do not have permission to delete this palette' });
        }

        await ColorPalette.findByIdAndDelete(paletteId).exec();
        res.status(200).json({ message: 'Palette deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting palette', error });
    }
};
