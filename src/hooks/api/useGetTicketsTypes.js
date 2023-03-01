import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketsApi from '../../services/ticketsApi';

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
