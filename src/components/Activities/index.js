import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ActivitiesNotAvailableMessage } from './ActivitiesStyles';
import useEvent from '../../hooks/api/useEvent';
import { useEffect, useState } from 'react';

function getdays(startsAt, endsAt) {
  const ONE_DAY_IN_MILLISECONDS = 8.64e7;
  const daysDifference = (new Date(endsAt) - new Date(startsAt)) / ONE_DAY_IN_MILLISECONDS;
  const daysAmount = [];
  let candidate = startsAt.getTime();

  for (let i = 0; i <= daysDifference; i++) {
    const weekDay = new Date(candidate).getDay(); // pôr o nome do dia + o day/month
    const monthDay = new Date(candidate).getDate();
    const month = new Date(candidate).getMonth();
    const obj = {
      weekDayName: getWeekDayName(weekDay),
      date: `${monthDay}/${month}`
    };
    daysAmount.push(obj);
    candidate += ONE_DAY_IN_MILLISECONDS;
  }
  return daysAmount;
}

export default function ActivitiesSelection({ ticket }) {
  const { event, eventLoading } = useEvent();
  const [eventDays, setEventDays] = useState([]);

  useEffect(() => {
    //TODO : transformar isso numa função pra limpar o código
    if (event) {
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);
      const x = getdays(startsAt, endsAt);

      setEventDays(...eventDays, x);
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
              {eventDays.map((e, i) => (
                <DayButton key={i}>{e.weekDayName}, {e.date}</DayButton>
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

const DayButton = styled.button`
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 131px;
  height: 37px;
  border: none;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  margin-left: 43px;
  margin-bottom: 35px;
`;

function getWeekDayName(weekDayNumber) {
  switch (weekDayNumber) {
  case 0:
    return 'Domingo';
  case 1:
    return 'Segunda';
  case 2:
    return 'Terça';
  case 3:
    return 'Quarta';
  case 4:
    return 'Quinta';
  case 5:
    return 'Sexta';
  case 6:
    return 'Sábado';
  default:
    return 'Dia de São Nunca';
  }
}
