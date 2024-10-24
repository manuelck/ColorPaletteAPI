const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username, role } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this user' });
        }

        if (username) user.username = username;
        if (role) user.role = role; 

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this user' });
        }

        await User.findByIdAndDelete(userId).exec();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to view all users' });
        }

        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
