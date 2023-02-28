import api from './api';

export async function getTicketsTypes(token) {
  const response = await api.post('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
