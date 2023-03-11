import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import {
  HotelNotAvailableMessage,
  HotelsContainer,
  PageTitle,
  HotelOption,
  HotelImage,
  HotelName,
  HotelCapacityInfo,
  HotelMainInfo,
  RoomList,
  Title,
  BookingButton
} from './HotelsStyles';
import useGetHotels from '../../hooks/api/useGetHotels';
import useSaveBooking from '../../hooks/api/useSaveBooking';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import hotelsHelpers from './helpers';
import { Room } from '../Rooms';

export default function HotelSelection({ ticket }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const { saveBookingLoading, saveBooking } = useSaveBooking();

  useEffect(async () => {
    if ((ticket && ticket?.TicketType?.includesHotel && ticket?.status === 'PAID') && !hotels) {
      try {
        const hotelsInfo = await getHotels();
        setHotels(hotelsInfo);
      } catch (err) {
        toast('Não foi possível mostrar os hotéis.');
      }
    }
  }, [ticket]);

  const handleClick = (data) => {
    if (selectedHotel.id === data.id) {
      setSelectedHotel({});
      return;
    }
    setSelectedHotel({ id: data.id, rooms: data.Rooms });
  };

  const submitBooking = (data) => {
    if (saveBookingLoading)
      return;
    if (!data) 
      return toast('Por favor escolha um quarto.');
    if (data.Booking.length === data.capacity)
      return toast('Quarto sem vacâncias');

    return saveBooking({ roomId: data.id });
  };

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {!ticket && (
        <HotelNotAvailableMessage>
          <p>Você ainda não possui um ingresso.</p>
        </HotelNotAvailableMessage>
      )}

      {ticket?.TicketType?.includesHotel === false && (
        <HotelNotAvailableMessage>
          <p>Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades</p>
        </HotelNotAvailableMessage>
      )}

      {ticket?.status === 'RESERVED' && (
        <HotelNotAvailableMessage>
          <p>Você precisa ter confirmado o pagamento antes de fazer a escolha de hospedagem</p>
        </HotelNotAvailableMessage>
      )}

      {hotels && (
        <>
          <PageTitle>Primeiro, escolha seu hotel</PageTitle>
          <HotelsContainer>
            {hotels.map((h) => (
              <HotelOption
                key={h.id}
                onClick={() => handleClick(h)}
                selected={selectedHotel?.id === h.id}
              >
                <HotelMainInfo>
                  <HotelImage alt={h.name} src={h.image} />
                  <HotelName>{h.name}</HotelName>
                </HotelMainInfo>

                <HotelCapacityInfo>
                  <strong>Tipos de acomodação:</strong>
                  {hotelsHelpers.getRoomsTypes(h.Rooms)}
                </HotelCapacityInfo>
                <HotelCapacityInfo>
                  <strong>Vagas Disponíveis:</strong>
                  {hotelsHelpers.getCapacity(h.Rooms)}
                </HotelCapacityInfo>
              </HotelOption>
            ))}
          </HotelsContainer>
        </>
      )}
      {selectedHotel?.id && (
        <>
          <Title isVisible={selectedHotel?.id !== undefined}>
            Ótima pedida! Agora escolha seu quarto
          </Title>
          <RoomList isVisible={selectedHotel?.id !== undefined}>
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
          </RoomList>
          <BookingButton
            variant='contained'
            isVisible={selectedHotel?.id !== undefined}
            onClick={() => submitBooking(selectedRoom.data)}
            disabled={saveBookingLoading}
          >
            RESERVAR QUARTO
          </BookingButton>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

