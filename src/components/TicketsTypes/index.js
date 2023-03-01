import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { ModalitiesContainer, Modalities, SecondTitle } from './TicketModality';
import { useState, useEffect } from 'react';
import useGetTicketsTypes from '../../hooks/api/useGetTicketsTypes';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

export default function TicketsTypes() {
  const { getEnrollmentLoading, userEnrollment } = useGetEnrollment();
  const { getTicketsTypes } = useGetTicketsTypes();

  const [ticketsTypes, setTicketsTypes] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [isNotRemote, setIsNotRemote] = useState(null);

  useEffect(async() => {
    try {
      const types = await getTicketsTypes();
      setTicketsTypes(types);
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
                      setIsNotRemote(!ticketType.isRemote);}}
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
            </>
          )

          }
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
