import { toast } from 'react-toastify';
import useGetTicket from '../../../hooks/api/useGetTicket';
import { useState, useEffect } from 'react';
import HotelSelection from '../../../components/Hotels';
import useGetBooking from '../../../hooks/api/useGetBooking';
import FinishBooking from '../../../components/FinishBooking';

export default function Hotel() {
  const { getTicket } = useGetTicket();
  const { getBooking } = useGetBooking();
  const [ticket, setTicket] = useState({});
  const [booking, setBooking] = useState({});
  
  useEffect(async() => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
    }
  }, [ticket]);

  useEffect(async() => {
    try {
      const newBooking = await getBooking();
      setBooking(newBooking);
    } catch (err) {
      
    }
  }, [booking]);
  return (
    <>
      {
        (ticket.id && booking.id) ? (
          <FinishBooking booking={booking} />
        ) : (<HotelSelection ticket={ticket} />)
      }
    </>
  );
}

