import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { HotelNotAvailableMessage, HotelsContainer, PageTitle } from './HotelsStyles';
import useGetHotels from '../../hooks/api/useGetHotels';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Hotel from './Hotel';

export default function HotelSelection({ ticket }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState(null);

  useEffect(async() => {
    if (ticket && ticket?.TicketType.includesHotel && ticket?.status === 'PAID') {
      try {
        const hotelsInfo = await getHotels();
        setHotels(hotelsInfo);
        console.log(hotelsInfo);
      } catch (err) {
        toast('Não foi possível mostrar os hotéis.');
      }
    }
  }, []);

  /*   const num = 1;
  hotels.forEach((h) => {
    if (h.id === num) {
      console.log(h);
    }
  }); */

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
              <Hotel>{h.name}</Hotel>
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
