import { useState } from 'react';
import { toast } from 'react-toastify';

import useSaveBooking from '../../hooks/api/useSaveBooking';
import useUpdateBooking from '../../hooks/api/useUpdateBooking';
import {
  RoomListWrapper,
  RoomWrapper,
  StyledFillPerson,
  StyledPerson,
  Vacancies,
  BookingButton
} from './style';

function Room({ data, selectedRoom, setSelectedRoom }) {
  let vacancies = Array(data.capacity).fill('');

  (data.Booking).forEach(b => {
    vacancies[vacancies.indexOf('')] = b;
  });

  if (vacancies.indexOf('') !== -1)
    vacancies[vacancies.indexOf('')] = 'first';

  const status = (data, selectedRoom) => {
    if (selectedRoom.id === data.id)
      return 'selected';
    if (data.Booking.length === data.capacity)
      return 'full';
    return '';
  };

  const handleClick = (data) => {
    if (data.Booking.length === data.capacity)
      return;
    if (selectedRoom.id === data.id)
      return setSelectedRoom({});
    setSelectedRoom({ id: data.id, data: data });
  };

  return (
    <RoomWrapper
      status={status(data, selectedRoom)}
      isFull={data.Booking.length === data.capacity}
      onClick={() => handleClick(data)}
    >
      {data.id}
      <Vacancies>
        {vacancies.map((v, index) => {
          if (v === 'first') {
            return (
              (selectedRoom.id === data.id) ? (
                <StyledFillPerson key={index} color='#FF4791' />
              ) : (
                <StyledPerson key={index} />
              )
            );
          }
          if (v === '')
            return <StyledPerson key={index} />;
          return <StyledFillPerson key={index} />;
        })}
      </Vacancies>
    </RoomWrapper>
  );
};

export default function RoomList({ stateData, setChosenRoom, booking }) {
  const [selectedRoom, setSelectedRoom] = useState({});
  const { selectedHotel, setSelectedHotel } = stateData;
  const { saveBookingLoading, saveBooking } = useSaveBooking();
  const { updateBookingLoading, updateBooking } = useUpdateBooking();

  const submitBooking = async (data) => {
    if (saveBookingLoading || updateBookingLoading)
      return;
    if (!data)
      return toast('Por favor escolha um quarto.');
    
    try {
      !booking.id ? await (saveBooking({ roomId: data.id })) : await (updateBooking({ roomId: data.id }, booking.id));
      toast('Reserva efetuada!');
      setSelectedHotel({ ...selectedHotel });
      setChosenRoom(true);
    } catch (err) {
      toast('Não foi possível efetuar a reserva!');
    }
  };
  
  return (
    <>
      <RoomListWrapper isVisible={selectedHotel?.id !== undefined}>
        {(selectedHotel.rooms).map(data => {
          return (
            <Room
              data={data}
              key={data.id}
              selectedRoom={selectedRoom}
              setSelectedRoom={setSelectedRoom}
            />
          );
        })}
      </RoomListWrapper>
      <BookingButton
        variant='contained'
        visible={(selectedHotel?.id !== undefined).toString()}
        onClick={() => submitBooking(selectedRoom.data)}
        disabled={saveBookingLoading}
      >
        RESERVAR QUARTO
      </BookingButton>
    </>
  );
};
