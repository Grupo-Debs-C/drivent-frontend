import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketsApi from '../../services/ticketsApi';

export default function useSaveTicket() {
  const token = useToken();

  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket
  } = useAsync((data) => ticketsApi.save(data, token), false);

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket
  };
}
