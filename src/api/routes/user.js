const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth'); // Import from auth controller
const { getUserById, updateUser, deleteUser, getAllUsers } = require('../controllers/user'); // Import user controller actions
const authMiddleware = require('../../middlewares/authMiddleware'); // Include auth middleware
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser); 
router.delete('/:id', authMiddleware, deleteUser); 
router.get('/', authMiddleware, getAllUsers); 

module.exports = router;
