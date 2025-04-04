import prisma from '../db/prisma.js';
import { encryptPassword } from '../utils/encryptor.util.js';
import { userMapResponse, usersMapResponse } from '../mappers/user.mapper.js';

export const getUsers = async (req, res) => {
  try {
    // Obtenemos usuarios e incluimos sus clientes relacionados
    const users = await prisma.user.findMany({
      include: {
        Clientes: true // Incluimos los clientes relacionados a cada usuario
      }
    });
    
    res.status(200).json(usersMapResponse(users));
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Obtenemos un usuario específico con sus clientes y proyectos relacionados
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        Clientes: {
          include: {
            Proyectos: true // Incluimos proyectos asociados a cada cliente
          }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(userMapResponse(user));
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
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
    
    res.status(201).json(userMapResponse(newUser));
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  
  try {
    // Verificar si el usuario existe
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Preparar los datos para actualizar
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Si hay contraseña, encriptarla
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    
    // Actualizar el usuario
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData
    });
    
    res.status(200).json(userMapResponse(updatedUser));
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Verificar si el usuario tiene clientes asociados
    const userWithClients = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { Clientes: true }
    });
    
    if (userWithClients?.Clientes.length > 0) {
      return res.status(400).json({
        message: 'Cannot delete user with associated clients. Remove the clients first.'
      });
      
      // Opción alternativa: eliminar en cascada
      /* for (const client of userWithClients.Clientes) {
        // Eliminar proyectos asociados a cada cliente
        await prisma.proyectos.deleteMany({
          where: { clientId: client.id }
        });
      }
      
      // Eliminar todos los clientes del usuario
      await prisma.clientes.deleteMany({
        where: { userId: Number(id) }
      }); */
    }
    
    // Eliminar el usuario
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error });
  }
};