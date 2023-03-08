import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { HotelNotAvailableMessage } from './HotelNotAvailableMessage';
import useGetHotels from '../../hooks/api/useGetHotels';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function HotelSelection({ ticket }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState({});

  useEffect(async() => {
    if (ticket && ticket?.TicketType.includesHotel && ticket?.status === 'PAID') {
      try {
        const hotelsInfo = await getHotels();
        setHotels({ ...hotelsInfo, capacityInfo: null });
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
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
