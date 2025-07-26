module.exports = permissions => (req, res, next) => {
    const role = req.user.role;
   
    const rights = {
      'Super-admin': { 
        addUser: false, 
        addTask: false 
    },
      'Admin':       { 
        addUser: true,  
        addTask: true  
    },
      'Manager':     { 
        addUser: false, 
        addTask: true  
    }
    };
    const allow = rights[role]?.[permissions];
    if (!allow) return res.status(403).json({ message: 'Forbidden' });
    next();
  };