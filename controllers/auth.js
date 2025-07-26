const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registration
exports.register = async (req, res) => {
    const { name, email, password, gender, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const creatorId = req.user ? req.user.id : null;
    const user = await User.create({ name, email, password: hashed, gender, role, createdById: creatorId });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    console.log(token);
    
    res.status(201).json({ token });
  };
  
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  };