import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ActivitiesSelection from '../../../components/Activities';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Activities() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async () => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Primeiro escolha seu ticket!');
    }
  }, []);

  return <ActivitiesSelection ticket={ticket} />;
}
