import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FinishTicket from '../../../components/FinishTicket';
import TicketsTypes from '../../../components/TicketsTypes';
import CreditCard from '../../../components/CreditCard';
import useGetTicket from '../../../hooks/api/useGetTicket';

export default function Payment() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async() => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Primeiro escolha seu ticket!');
    }
  }, []);

  return (
    <>
      {ticket.id ? <><FinishTicket ticket={ticket} /><CreditCard ticket={ticket}/></> : <TicketsTypes setTicket={setTicket} />}
    </>
  );
}
