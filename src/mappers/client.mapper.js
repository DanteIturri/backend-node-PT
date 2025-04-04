import { userMapResponse } from './user.mapper.js';
export const clientMapResponse = (client) => {
  return {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    user: client.user ? userMapResponse(client.user) : null,
    proyectos: client.Proyectos ? client.Proyectos.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      endDate: project.endDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
      status: project.status,
    })) : [],
  };
}

export const clientsMapResponse = (clients) => {
  return clients.map(client => clientMapResponse(client));
}