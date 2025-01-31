const Employee = (req, res, next) => {
  const user = req.user;
  console.log('Employee Middleware - User:', req.user); // Debug log
  console.log('Employee Middleware - User:', user.id);
  try {
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (user.role !== 'Employee') {
      return res.status(403).json({
        error:
          'Forbidden to access this resource. Please request for employee access or authorization ',
        role: user.role,
      });
    }
    req.employee_id = user.id;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const Admin = (req, res, next) => {
  console.log('Manager Middleware - User:', req.user); // Debug log
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (user.role !== 'Admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const Manager = (req, res, next) => {
  const user = req.user;
  console.log('Manager Middleware - User:', req.user); // Debug log
  console.log('Manager Middleware - User:', user.id);
  try {
    if (!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }
    if (user.role !== 'Manager') {
      return res.status(403).json({
        error:
          'Forbidden to access this resource .please requeste for  admin or manager access or authorization ',
        role: user.role,
      });
    }
    req.manager_id = user.id;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const AdminOrManager = (req, res, next) => {
  const user = req.user;
  if (user.role !== 'Admin' && user.role !== 'Manager') {
    return res.status(403).json({ error: 'Forbidden', role: user.role });
  }
  next();
};

export { Admin, Manager, AdminOrManager, Employee };
