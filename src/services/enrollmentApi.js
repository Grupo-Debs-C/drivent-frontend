import api from './api';

export async function save(body, token) {
  const response = await api.post('/enrollments', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

/* {
  "id": 1,
  "name": "ISABELLE DE LIMA XAVIER",
  "cpf": "07569147448",
  "birthday": "1998-02-28T02:00:00.000Z",
  "phone": "(82) 99368-2358",
  "address": {
    "id": 1,
    "cep": "57081-510",
    "street": "Rua Pedrosa",
    "city": "Maceió",
    "state": "AL",
    "number": "371",
    "neighborhood": "Tabuleiro do Martins",
    "addressDetail": ""
  }
} */

export async function getPersonalInformations(token) {
  const response = await api.get('/enrollments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}
//
