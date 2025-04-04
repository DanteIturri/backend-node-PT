import { clientMapResponse } from './client.mapper.js';

export const projectMapResponse = (project) => {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    startDate: project.startDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    endDate: project.endDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
    status: project.status,
    client: project.client ? clientMapResponse(project.client) : null,
  };
};

export const projectsMapResponse = (projects) => {
  return projects.map((project) => projectMapResponse(project));
};
