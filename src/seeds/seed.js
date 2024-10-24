const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config(); 

const User = require('../../src/api/models/user');
const ColorPalette = require('../../src/api/models/colorPalette');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await User.deleteMany({});
        await ColorPalette.deleteMany({});

        const adminPassword = await bcrypt.hash('admin123', 10);
        const userPassword = await bcrypt.hash('user123', 10);

        const admin = new User({
            username: 'admin',
            password: 123,
            role: 'admin',
        });

        const user = new User({
            username: 'user',
            password: 123,
            role: 'user',
        });

        await admin.save();
        await user.save();

        const colorPalette1 = new ColorPalette({
            name: 'Vibrant Sunset',
            colors: ['#FF5733', '#FFBD33', '#FFC300'],
            user: user._id, 
            public: true,
        });

        const colorPalette2 = new ColorPalette({
            name: 'Ocean Breeze',
            colors: ['#3498DB', '#2ECC71', '#1ABC9C'],
            user: admin._id, 
            public: false,
        });

        await colorPalette1.save();
        await colorPalette2.save();

        console.log('Seed data inserted successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Error inserting seed data:', err);
        process.exit(1);
    }
};

connectDB().then(() => seedData());
