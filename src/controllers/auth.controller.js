import prisma from '../db/prisma.js';
import { generateToken } from '../utils/jwt.util.js';
import { userMapResponse } from '../mappers/user.mapper.js';
import { encryptPassword, comparePassword } from '../utils/encryptor.util.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Validar los datos de entrada
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    // Verificar si el usuario ya existe
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario con ese email ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await encryptPassword(password);

    // Crear el nuevo usuario
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({
      user: userMapResponse(newUser),
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    // Generar JWT
    const token =await generateToken({ id: user.id });
    res.cookie('token', token);

    res.status(200).json({
      user: userMapResponse(user),
      token
    });
  } catch (error) {
    console.error('Error en el login:', error);
    res.status(500).json({ message: 'Error en el login', error });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

// Endpoint para verificar el token y obtener el usuario actual
export const me = async (req, res) => {
  try {
    // El middleware ya ha verificado el token y añadido userId a req
    const userId = req.userId;
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Clientes: {
          include: {
            Proyectos: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({
      user: userMapResponse(user)
    });
  } catch (error) {
    console.error('Error verificando usuario:', error);
    res.status(500).json({ message: 'Error verificando usuario', error });
  }
};
