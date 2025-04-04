import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      status: 401,
      menssage: 'Unauthorized',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        menssage: 'Invalid token',
      });
    }

    req.user = decoded;
    next();
  });
};
