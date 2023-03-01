import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { TicketsModality, TicketsContainer, SecondTitle } from './TicketModality';
import { useState, useEffect } from 'react';
import useGetTicketsTypes from '../../hooks/api/useGetTicketsTypes';
import { toast } from 'react-toastify';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

/* 
[
  {
    "id": 1,
    "name": "tipo foda",
    "price": 200,
    "isRemote": false,
    "includesHotel": true,
    "createdAt": "2023-02-28T14:12:23.840Z",
    "updatedAt": "2023-02-28T14:12:23.840Z"
  },
  {
    "id": 2,
    "name": "tipo não foda",
    "price": 20,
    "isRemote": true,
    "includesHotel": false,
    "createdAt": "2023-02-28T14:12:37.840Z",
    "updatedAt": "2023-02-28T14:12:37.840Z"
  },
  {
    "id": 3,
    "name": "tipo meio foda",
    "price": 100,
    "isRemote": false,
    "includesHotel": false,
    "createdAt": "2023-02-28T14:12:53.422Z",
    "updatedAt": "2023-02-28T14:12:53.422Z"
  }
]
*/

export default function TicketsTypes() {
  const { getEnrollmentLoading, userEnrollment } = useGetEnrollment();

  const { getTicketsTypes } = useGetTicketsTypes();

  const [ticketsTypes, setTicketsTypes] = useState(null);
  const [selectedTicketType, setSelectedTicketType] = useState(null);

  useEffect(async() => {
    try {
      const types = await getTicketsTypes();
      setTicketsTypes(types);
    } catch (err) {
      toast('Um erro apareceu ao trazer as informações!');
    }
  }, [getEnrollmentLoading]);

  console.log(selectedTicketType);

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
              <TicketsContainer>
                {ticketsTypes.map((ticketType) => (
                  <TicketsModality
                    isSelected={selectedTicketType === ticketType.id}
                    key={ticketType.id}
                    onClick={() => setSelectedTicketType(ticketType.id)}
                  >
                    <h1>{ticketType.isRemote ? 'Online' : 'Presencial'}</h1>
                    <h2>R$ {ticketType.price}</h2>
                  </TicketsModality>
                ))}
              </TicketsContainer>
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
