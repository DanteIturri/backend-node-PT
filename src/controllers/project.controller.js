import prisma from '../db/prisma.js';
import { projectMapResponse, projectsMapResponse } from '../mappers/project.mapper.js';

export const getProjects = async (req, res) => {  
  try {
    // Usamos el modelo correcto "Proyectos" e incluimos la relación con el cliente
    const projects = await prisma.proyectos.findMany({
      include: {
        client: true // Incluimos el cliente relacionado
      }
    });
    res.status(200).json(projectsMapResponse(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects', error });
  }
}

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    // Usamos el modelo correcto "Proyectos" e incluimos relaciones
    const project = await prisma.proyectos.findUnique({ 
      where: { id: Number(id) },
      include: {
        client: {
          include: {
            user: true // También incluimos el usuario relacionado al cliente
          }
        }
      }
    });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(projectMapResponse(project));
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project', error });
  }
}

export const createProject = async (req, res) => {
  const { name, description, status, startDate, endDate, clientId } = req.body;
  try {
    // Validar que el cliente existe antes de crear el proyecto
    const client = await prisma.clientes.findUnique({ where: { id: Number(clientId) } });
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const newProject = await prisma.proyectos.create({
      data: {
        name,
        description,
        status,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        clientId: Number(clientId) // Relacionamos con el cliente
      },
      include: {
        client: true // Incluimos el cliente en la respuesta
      }
    });

    res.status(201).json(projectMapResponse(newProject));
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error });
  }
}

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, status, startDate, endDate, clientId } = req.body;

  try {
    // Si hay clientId, verificamos que exista el cliente
    if (clientId) {
      const client = await prisma.clientes.findUnique({ where: { id: Number(clientId) } });
      if (!client) return res.status(404).json({ message: 'Client not found' });
    }

    const updatedProject = await prisma.proyectos.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        status,
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(clientId && { clientId: Number(clientId) })
      },
      include: {
        client: true
      }
    });
    
    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(projectMapResponse(updatedProject));
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ message: 'Error updating project', error });
  }
}

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.proyectos.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project', error });
  }
}