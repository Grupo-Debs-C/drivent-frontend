import useAsync from '../useAsync';
import useToken from '../useToken';
import * as vacancyApi from '../../services/vacancyApi';

export default function useSaveVacancy() {
  const token = useToken();

  const {
    loading: saveVacancyLoading,
    error: saveVacancyError,
    act: saveVacancy
  } = useAsync((data) => vacancyApi.save(data, token), false);

  return {
    saveVacancyLoading,
    saveVacancyError,
    saveVacancy
  };
};
