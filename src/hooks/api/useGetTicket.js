import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketsApi from '../../services/ticketsApi';

export default function useGetTicket() {
  const token = useToken();

  const {
    loading: getTicketLoading,
    error: getTicketError,
    act: getTicket
  } = useAsync(() => ticketsApi.getTicket(token), false);

  return {
    getTicketLoading,
    getTicketError,
    getTicket
  };
}
