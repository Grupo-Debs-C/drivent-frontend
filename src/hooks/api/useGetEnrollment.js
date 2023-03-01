import useAsync from '../useAsync';
import useToken from '../useToken';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useGetEnrollment() {
  const token = useToken();

  const {
    loading: getEnrollmentLoading,
    error: getEnrollmentError,
    data: userEnrollment
  } = useAsync( () =>  enrollmentApi.getPersonalInformations(token), true);

  return {
    getEnrollmentLoading,
    getEnrollmentError,
    userEnrollment
  };
}
