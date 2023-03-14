import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ActivitiesNotAvailableMessage } from './ActivitiesStyles';
import useEvent from '../../hooks/api/useEvent';
import { useEffect, useState } from 'react';

export default function ActivitiesSelection({ ticket }) {
  const { event, eventLoading } = useEvent();
  const [eventDays, setEventDays] = useState([]);

  useEffect(() => {
    if (event) {
      const ONE_DAY_IN_MILLISECONDS = 8.64e7;
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);
      const daysDifference = (new Date(endsAt) - new Date(startsAt)) / ONE_DAY_IN_MILLISECONDS;

      const daysAmount = [];
      let candidate = startsAt.getTime();

      for (let i = 0; i <= daysDifference; i++) {
        const weekDay = new Date(candidate).getDay();
        daysAmount.push(weekDay);
        candidate += ONE_DAY_IN_MILLISECONDS;
      }
      setEventDays(...eventDays, daysAmount);
    }
  }, [eventLoading]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {!ticket && (
        <ActivitiesNotAvailableMessage>
          <p>Você ainda não possui um ingresso.</p>
        </ActivitiesNotAvailableMessage>
      )}

      {ticket?.TicketType?.isRemote === true && (
        <ActivitiesNotAvailableMessage>
          <p>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</p>
        </ActivitiesNotAvailableMessage>
      )}

      {ticket?.status === 'RESERVED' && (
        <ActivitiesNotAvailableMessage>
          <p>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
        </ActivitiesNotAvailableMessage>
      )}
      {!ticket?.TicketType?.isRemote && ticket?.status === 'PAID' && (
        <>
          {eventLoading ? (
            <>carregando...</>
          ) : (
            <>
              {eventDays.map((e) => (
                <>oi</>
              ))}
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
