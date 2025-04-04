// Middleware para verificar roles de usuario
const isAdmin = (req, res, next) => {
  // Verificamos que exista req.user y que req.user.roles sea un array (parseamos el JSON)
  const userRoles = req.user && JSON.parse(req.user.roles || '[]');
  
  if (userRoles.includes('admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Require role admin' });
  }
};

const isModerator = (req, res, next) => {
  const userRoles = req.user && JSON.parse(req.user.roles || '[]');
  
  if (userRoles.includes('moderator')) {
    next();
  } else {
    res.status(403).json({ message: 'Require role moderator' });
  }
};

const isModeratorOrAdmin = (req, res, next) => {
  const userRoles = req.user && JSON.parse(req.user.roles || '[]');
  
  if (userRoles.includes('moderator') || userRoles.includes('admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Require role moderator or admin' });
  }
};

const verifyRole = {
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};

export default verifyRole;
