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
} from './HotelsStyles';
import useGetHotels from '../../hooks/api/useGetHotels';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import hotelsHelpers from './helpers';

export default function HotelSelection({ ticket, stateData }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState(null);
  const { selectedHotel, setSelectedHotel } = stateData;

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
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

