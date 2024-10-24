// src/api/routes/colorPalette.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');
const colorPaletteController = require('../controllers/colorPalette');

router.post('/', authMiddleware, colorPaletteController.createPalette);
router.get('/', colorPaletteController.getPalettes);
router.get('/:id', colorPaletteController.getPaletteById);
router.put('/:id', authMiddleware, colorPaletteController.updatePalette);
router.delete('/:id', authMiddleware, colorPaletteController.deletePalette);

module.exports = router;
