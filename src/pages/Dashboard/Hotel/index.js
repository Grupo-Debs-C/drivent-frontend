import useGetTicket from '../../../hooks/api/useGetTicket';
import { useState, useEffect } from 'react';
import HotelSelection from '../../../components/Hotels';
import useGetBooking from '../../../hooks/api/useGetBooking';
import FinishBooking from '../../../components/FinishBooking';
import { Title } from '../../../components/Rooms/style';
import RoomList from '../../../components/Rooms';

export default function Hotel() {
  const { getTicket } = useGetTicket();
  const { getBooking } = useGetBooking();
  const [ticket, setTicket] = useState({});
  const [booking, setBooking] = useState({});
  const [selectedHotel, setSelectedHotel] = useState({});
  const [chosenRoom, setChosenRoom] = useState(true);
  const stateData = {
    selectedHotel: selectedHotel,
    setSelectedHotel: setSelectedHotel
  };

  useEffect(async () => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
    }
  }, [ticket]);

  useEffect(async () => {
    try {
      const newBooking = await getBooking();
      setBooking(newBooking);
    } catch (err) {

    }
  }, [booking, selectedHotel, chosenRoom]);

  return (
    <>
      {
        ((ticket.id && booking.id) && chosenRoom) ? (
          <FinishBooking booking={booking} setChosenRoom={setChosenRoom} />
        ) : (
          <>
            <HotelSelection ticket={ticket} stateData={stateData} />
            {selectedHotel?.id && (
              <>
                <Title isVisible={selectedHotel?.id !== undefined}>
                  Ótima pedida! Agora escolha seu quarto
                </Title>
                <RoomList
                  stateData={stateData}
                  setChosenRoom={setChosenRoom}
                  booking={booking}
                />
              </>
            )}
          </>
        )
      }
    </>
  );
}
