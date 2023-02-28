import useAsync from '../useAsync';
import useToken from '../useToken';

import * as enrollmentApi from '../../services/enrollmentApi';

export default function useGetEnrollment() {
  const token = useToken();

  const address = useAsync(
    enrollmentApi.getPersonalInformations(token),
    false
  );

  return address;
}
