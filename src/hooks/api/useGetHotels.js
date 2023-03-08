import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelsApi from '../../services/hotelsApi';

export default function useGetHotels() {
  const token = useToken();

  const {
    loading: getHotelsLoading,
    error: getHotelsError,
    act: getHotels
  } = useAsync(() => hotelsApi.getHotels(token), false);

  return {
    getHotelsLoading,
    getHotelsError,
    getHotels
  };
}
