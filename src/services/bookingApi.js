import api from './api';

export async function save(body, token) {
  const response = await api.post('/booking', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getBooking(token) {
  const response = await api.get('/booking', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateBooking(body, params, token) {
  const response = await api.put(`/booking/${params}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

  return response.data;
}
