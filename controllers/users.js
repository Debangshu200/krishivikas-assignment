const { User } = require('../models');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res) => {
    const { name, email, password, gender, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdById = req.user.id;
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            role,
            createdById
        });

        const userResponse = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
        res.status(201).json(userResponse);

    } catch (error) {
        res.status(500).json({ message: "Failed to create user", error: error.message });
    }
};

exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'gender', 'role', 'createdAt'],
            include: [
                {
                    model: User,
                    as: 'Creator',
                    attributes: ['id', 'name', 'email']
                }
            ]
        });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve users", error: error.message });
    }
};