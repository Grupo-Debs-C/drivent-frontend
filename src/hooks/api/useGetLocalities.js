import useAsync from '../useAsync';
import useToken from '../useToken';
import api from '../../services/api';

export default function useGetLocalities() {
  const token = useToken();

  const {
    loading: getLocalitiesLoading,
    error: getLocalitiesError,
    act: getLocalities
  } = useAsync(() => api.get('/activities/localities', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }), false);

  return {
    getLocalitiesLoading,
    getLocalitiesError,
    getLocalities
  };
}
