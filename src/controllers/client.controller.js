import prisma from '../db/prisma.js';

import { clientMapResponse, clientsMapResponse } from '../mappers/client.mapper.js';

export const getClients = async (req, res) => {
  try {
    // Usamos el modelo correcto "Clientes" e incluimos la relación con el usuario
    const clients = await prisma.clientes.findMany({
      include: {
        user: true,
        Proyectos: true // Incluimos también los proyectos relacionados
      }
    });
    console.log('Clients:', clientsMapResponse(clients));
    res.status(200).json(clientsMapResponse(clients));
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Error fetching clients', error });
  }
}

export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    // Usamos el modelo correcto "Clientes" e incluimos relaciones
    const client = await prisma.clientes.findUnique({ 
      where: { id: Number(id) },
      include: {
        user: true,
        Proyectos: true
      }
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(clientMapResponse(client));
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'Error fetching client', error });
  }
}

export const createClient = async (req, res) => {
  const { name, email, phone, userId } = req.body;
  try {
    // Validar que el usuario existe antes de crear el cliente
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newClient = await prisma.clientes.create({
      data: {
        name,
        email,
        phone,
        userId: Number(userId) // Relacionamos con el usuario
      },
    });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Error creating client', error });
  }
}

export const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, userId } = req.body;
  try {
    // Si hay userId, verificamos que exista el usuario
    if (userId) {
      const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      if (!user) return res.status(404).json({ message: 'User not found' });
    }

    const updatedClient = await prisma.clientes.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        phone,
        ...(userId && { userId: Number(userId) })
      },
    });
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error updating client', error });
  }
}

export const deleteClient = async (req, res) => {
  const { id } = req.params;
  try {
    // Verificamos si el cliente tiene proyectos relacionados
    const clientWithProjects = await prisma.clientes.findUnique({
      where: { id: Number(id) },
      include: { Proyectos: true }
    });

    if (clientWithProjects?.Proyectos.length > 0) {
      // Opción 1: Devolver un error si hay proyectos relacionados
      return res.status(400).json({ 
        message: 'Cannot delete client with active projects. Delete the projects first.'
      });
      
      // Opción 2: Eliminar proyectos relacionados en cascada (descomenta para usar)
      /* await prisma.proyectos.deleteMany({
        where: { clientId: Number(id) }
      }); */
    }

    await prisma.clientes.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: 'Client deleted' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Error deleting client', error });
  }
}

