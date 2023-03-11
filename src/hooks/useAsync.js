import { useState, useEffect } from 'react';
//usada para lidar com a response vinda da API
export default function useAsync(handler, immediate = true) {
  //handler == response; immediate == determina o momento em que se encontra (carregando ou não)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  //assincronamente, espera pela res
  const act = async (...args) => {
    setLoading(true);
    setError(null);
    //cuida da response
    try {
      const data = await handler(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(error);
      setLoading(false);
      throw err;
    }
  };
  //enquanto immediate for true, 
  useEffect(() => {
    if (immediate) {
      act();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    act
  };
}
