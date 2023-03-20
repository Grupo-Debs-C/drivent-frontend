import useAsync from '../useAsync';
import useToken from '../useToken';
import * as vacancyApi from '../../services/vacancyApi';

export default function useGetVacancies() {
  const token = useToken();

  const {
    loading: getVacanciesLoading,
    error: getVacanciesError,
    data: vacancies,
  } = useAsync(() => vacancyApi.getPersonalInformations(token), true);

  return {
    getVacanciesLoading,
    getVacanciesError,
    vacancies
  };
}
