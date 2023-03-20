import api from './api';

export async function save(body, token) {
  const response = await api.post('/vacancy', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function findAll(token) {
  const response = await api.get('/vacancy', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
