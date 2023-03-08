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

export default function HotelSelection({ ticket }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState(null);

  useEffect(async() => {
    if (ticket && ticket?.TicketType.includesHotel && ticket?.status === 'PAID') {
      try {
        const hotelsInfo = await getHotels();
        setHotels(hotelsInfo);
      } catch (err) {
        toast('Não foi possível mostrar os hotéis.');
      }
    }
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {!ticket && (
        <HotelNotAvailableMessage>
          <p>Você ainda não possui um ingresso.</p>
        </HotelNotAvailableMessage>
      )}

      {ticket?.TicketType.includesHotel === false && (
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
              <HotelOption key={h.id}>
                <HotelMainInfo>
                  <HotelImage alt={h.name} src={h.image} />
                  <HotelName>{h.name}</HotelName>
                </HotelMainInfo>

                <HotelCapacityInfo>
                  <strong>Tipos de acomodação:</strong>
                  {getRoomsTypes(h.Rooms)}
                </HotelCapacityInfo>
                <HotelCapacityInfo>
                  <strong>Vagas Disponíveis:</strong>
                  {getCapacity(h.Rooms)}
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

function getRoomsTypes(rooms) {
  let dict = {};
  rooms.forEach( r => {
    dict[r.capacity] = true;
  });
  if(dict[1] && dict[2] && dict[3]) {
    return 'Single, Double e Triple';
  } else if (dict[1] && dict[2]) {
    return 'Single e Double';
  } else if (dict[2] && dict[3]) {
    return 'Double e Triple';
  } else if (dict[1] && dict[3]) {
    return 'Single e Triple';
  } else if (dict[1]) {
    return 'Single';
  } else if (dict[2]) {
    return 'Double';
  } else if (dict[3]) {
    return 'Triple';
  };
}

function getCapacity(rooms) {
  let answer = 1;
  rooms.forEach( r => {
    answer *= r.capacity;
  });
  return answer;
}
