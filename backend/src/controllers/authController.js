const User = require('../models/User');
const jwt = require('jsonwebtoken');


// Register User
exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.statu(201).json({ message: 'User regoister succesfully', user });
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.pasword))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET, { expiresIn: '5h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};