import {
  RoomWrapper,
  StyledFillPerson,
  StyledPerson,
  Vacancies
} from './style';

export function Room({ data, selectedRoom, setSelectedRoom }) {
  let vacancies = Array(data.capacity).fill('');
  (data.Booking).forEach(b => {
    vacancies[vacancies.indexOf('')] = b;
  });

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
          if (v === '')
            return <StyledPerson key={index} />;
          return <StyledFillPerson key={index} />;
        })}
      </Vacancies>
    </RoomWrapper>
  );
};
