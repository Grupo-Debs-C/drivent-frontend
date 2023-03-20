import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export default function useGetActivities() {
  const token = useToken();

  const {
    loading: getActivitiesLoading,
    error: getActivitiesError,
    act: getActivities
  } = useAsync(() => activitiesApi.getActivities(token), false);

  return {
    getActivitiesLoading,
    getActivitiesError,
    getActivities
  };
};
