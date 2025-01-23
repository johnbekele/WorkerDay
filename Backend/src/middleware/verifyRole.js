import express from 'express';

const Admin = (req, res, next) => {
  const { user } = req;
  if (user.role !== 'Admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

const Manager = (req, res, next) => {
  const { user } = req;
  if (user.role !== 'Manager') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  req.manager_id = user.id;
  next();
};

export { Admin, Manager };
