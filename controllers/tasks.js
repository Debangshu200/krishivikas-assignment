const { Task, User } = require('../models');

exports.createTask = async (req, res) => {
  // Admin & Manager can create tasks
  const { name, description, type, startDate, endDate } = req.body;

  const createdById = req.user.id;
  const task = await Task.create({ 
    name, 
    description, 
    type, 
    startDate, 
    endDate, 
    createdById 
  });
  res.status(201).json(task);
};

exports.listTasks = async (req, res) => {
  const tasks = await Task.findAll({ 
    include: [{ model: User, as: 'Creator' }] 
  });
  res.json(tasks);
};
