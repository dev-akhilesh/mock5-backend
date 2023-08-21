// server/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const generateToken = require('../utils/jwt')


const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword });

        const token = generateToken(user._id);
        res.json({ message: 'Signup successful', user: { user, token } });
    } catch (error) {
        res.status(500).json({ message: "SignUp Failed" });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = generateToken(user._id);
        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: "Login Failed" });
    }
};


module.exports = { signup, login };