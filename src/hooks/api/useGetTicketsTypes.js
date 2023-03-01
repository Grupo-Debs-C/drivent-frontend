import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketsApi from '../../services/ticketsApi';

/* 
[
  {
    "id": 1,
    "name": "tipo foda",
    "price": 200,
    "isRemote": false,
    "includesHotel": true,
    "createdAt": "2023-02-28T14:12:23.840Z",
    "updatedAt": "2023-02-28T14:12:23.840Z"
  },
  {
    "id": 2,
    "name": "tipo não foda",
    "price": 20,
    "isRemote": true,
    "includesHotel": false,
    "createdAt": "2023-02-28T14:12:37.840Z",
    "updatedAt": "2023-02-28T14:12:37.840Z"
  },
  {
    "id": 3,
    "name": "tipo meio foda",
    "price": 100,
    "isRemote": false,
    "includesHotel": false,
    "createdAt": "2023-02-28T14:12:53.422Z",
    "updatedAt": "2023-02-28T14:12:53.422Z"
  }
]
*/

export default function useGetTicketsTypes() {
  const token = useToken();

  const {
    loading: getTicketsTypesLoading,
    error: getTicketsTypesError,
    act: getTicketsTypes
  } = useAsync(() =>
    ticketsApi.getTicketsTypes(token), false
  );

  return {
    getTicketsTypesLoading,
    getTicketsTypesError,
    getTicketsTypes
  };
}
