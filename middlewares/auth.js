const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: 'No token' });

  const token = header.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) 
        return res.status(401).json({ message: 'Invalid token' });
    req.user = payload; // { id, role }
    next();
  });
};