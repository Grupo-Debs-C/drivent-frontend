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
import Loader from 'react-loader-spinner';

export default function HotelSelection({ ticket }) {
  const { getHotels } = useGetHotels();
  const [hotels, setHotels] = useState(null);
  const [capacityInfo, setCapacityInfo] = useState(null);

  useEffect(async() => {
    if (ticket && ticket?.TicketType.includesHotel && ticket?.status === 'PAID') {
      try {
        const hotelsInfo = await getHotels();
        setHotels(hotelsInfo);
      } catch (err) {
        toast('Não foi possível mostrar os hotéis.');
      }
    }

    if (hotels) {
      try {
        const hotelsCapacityInfo = '';
      } catch (err) {
        toast('Não foi possível mostrar as informações de capacidade dos hotéis.');
      }
    }
  }, [hotels]);

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
              <HotelOption>
                <HotelMainInfo>
                  <HotelImage alt={h.name} src={h.image} />
                  <HotelName>{h.name}</HotelName>
                </HotelMainInfo>

                <HotelCapacityInfo>
                  <strong>Tipos de acomodação:</strong>
                  {!capacityInfo ? <Loader color="#FFFFFF" height={16} width={16} type="Oval" /> : <>dqw</>}
                </HotelCapacityInfo>
                <HotelCapacityInfo>
                  <strong>Vagas Disponíveis:</strong>
                  {!capacityInfo ? <Loader color="#FFFFFF" height={16} width={16} type="Oval" /> : <>dqw</>}
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
