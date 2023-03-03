import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FinishTicket from '../../../components/FinishTicket';
import TicketsTypes from '../../../components/TicketsTypes';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Payment() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async() => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Um erro apareceu ao trazer as informações!');
    }
  }, []);

  return (
    <>
      {ticket.id ? <FinishTicket ticket={ticket} /> : <TicketsTypes setTicket={setTicket} />}
    </>
  );
}
