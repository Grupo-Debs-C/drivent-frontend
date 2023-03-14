import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ActivitiesNotAvailableMessage, DayButton, PageTitle } from './ActivitiesStyles';
import useEvent from '../../hooks/api/useEvent';
import { useEffect, useState } from 'react';
import activitiesHelpers from './helpers';

export default function ActivitiesSelection({ ticket }) {
  const { event, eventLoading } = useEvent();
  const [eventDays, setEventDays] = useState([]);
  //ao ser clicado, o index do dia da semana é salvo aqui:
  //btw: se você achou estranho o fato do título da página sumir ao clicar o botão, saiba que eu também achei, mas no Figma tá assim, fazer o quê
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    if (event) {
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);

      const days = activitiesHelpers.getDays(startsAt, endsAt);
      setEventDays(days);
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
            <>Carregando...</>
          ) : (
            <>
              {selectedDay === null && <PageTitle>Primeiro, filtre pelo dia do evento: </PageTitle>}
              {eventDays.map((day, i) => (
                <DayButton isSelected={selectedDay === i} key={i} onClick={() => setSelectedDay(i)}>
                  {day.weekDayName}, {day.date}
                </DayButton>
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
