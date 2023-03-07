import { toast } from 'react-toastify';
import useGetTicket from '../../../hooks/api/useGetTicket';
import { useState, useEffect } from 'react';
import HotelSelection from '../../../components/Hotels';

export default function Hotel() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async() => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Primeiro escolha seu ticket!');
    }
  }, [ticket]);

  return (
    <>
      {
        ticket.id && (
          <>
            <HotelSelection ticket={ticket} />
          </>
        ) 
      }
    </>
  );
}

