import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { ModalitiesContainer, Modalities, SecondTitle, ConfirmationButton } from './TicketModality';
import { useState, useEffect } from 'react';
import useGetTicketsTypes from '../../hooks/api/useGetTicketsTypes';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import useSaveTicket from '../../hooks/api/useSaveTicket';

export default function TicketsTypes({ setTicket }) {
  const { getEnrollmentLoading, userEnrollment } = useGetEnrollment();
  const { getTicketsTypes } = useGetTicketsTypes();
  const { saveTicket } = useSaveTicket();
  const [ticketsTypes, setTicketsTypes] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [selectedTicketType2, setSelectedTicketType2] = useState({});
  const [isNotRemote, setIsNotRemote] = useState(null);
  const [priceWithoutHotel, setPriceWithoutHotel] = useState(0);

  useEffect(async () => {
    try {
      const types = await getTicketsTypes();
      setTicketsTypes(types);
      const ticketWithoutHotel = types.find((ticket) => ticket.isRemote === false && ticket.includesHotel === false);
      setPriceWithoutHotel(ticketWithoutHotel.price);
    } catch (err) {
      toast('Um erro apareceu ao trazer as informações!');
    }
  }, [getEnrollmentLoading]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      {!userEnrollment ? (
        <NotRegisteredMessage>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </NotRegisteredMessage>
      ) : (
        <>
          {ticketsTypes && (
            <>
              <SecondTitle>Primeiro, escolha sua modalidade de ingresso</SecondTitle>
              <ModalitiesContainer>
                {ticketsTypes.map((ticketType) => (
                  <Modalities
                    isDisplayed={!ticketType.includesHotel}
                    isSelected={selectedTicketType === ticketType.id}
                    key={ticketType.id}
                    onClick={() => {
                      setSelectedTicketType(ticketType.id);
                      setIsNotRemote(!ticketType.isRemote);
                      ticketType.isRemote ? setSelectedTicketType2(ticketType) : setSelectedTicketType2({});
                    }}
                  >
                    <h1>{ticketType.isRemote ? 'Online' : 'Presencial'}</h1>
                    <h2>R$ {ticketType.price}</h2>
                  </Modalities>
                ))}
              </ModalitiesContainer>
            </>
          )}

          {isNotRemote && (
            <>
              <SecondTitle>Ótimo! Agora escolha sua modalidade de hospedagem</SecondTitle>
              <ModalitiesContainer>
                {ticketsTypes.map((ticketType) => (
                  <Modalities
                    isDisplayed={!ticketType.isRemote}
                    isSelected={selectedTicketType2.id === ticketType.id}
                    key={ticketType.id}
                    onClick={() => {
                      setSelectedTicketType2(ticketType);
                    }}
                  >
                    <h1>{ticketType.includesHotel ? 'Com Hotel' : 'Sem Hotel'}</h1>
                    <h2>+ R$ {ticketType.price - priceWithoutHotel}</h2>
                  </Modalities>
                ))}
              </ModalitiesContainer>
            </>
          )}

          {selectedTicketType2.price && (
            <>
              <SecondTitle>Fechado! O total ficou em <strong>R$ {selectedTicketType2.price}</strong> Agora é só confirmar:</SecondTitle>
              <ConfirmationButton onClick={async () => {
                await saveTicket({ ticketTypeId: selectedTicketType2.id });
                setTicket(selectedTicketType2);
              }}>RESERVAR INGRESSO</ConfirmationButton>
            </>
          )}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
