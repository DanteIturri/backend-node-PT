import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoutes from './src/routes/user.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import projectRoutes from './src/routes/project.routes.js';

dotenv.config();

//Environment Variables
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';
const API  = `/api/${API_VERSION}`;

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use(`${API}`, authRoutes);
app.use(`${API}`, userRoutes);
app.use(`${API}`, clientRoutes);
app.use(`${API}`, projectRoutes);
//Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/`);
})
