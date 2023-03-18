import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ActivitiesNotAvailableMessage, DayButton, PageTitle } from './ActivitiesStyles';
import useEvent from '../../hooks/api/useEvent';
import { useEffect, useState } from 'react';
import activitiesHelpers from './helpers';
import useGetLocalities from '../../hooks/api/useGetLocalities';

export default function ActivitiesSelection({ ticket }) {
  const { event, eventLoading } = useEvent();
  const [eventDays, setEventDays] = useState([]);
  //ao ser clicado, o index do dia da semana é salvo aqui:
  //btw: se você achou estranho o fato do título da página sumir ao clicar o botão, saiba que eu também achei, mas no Figma tá assim, fazer o quê
  const [selectedDay, setSelectedDay] = useState(null);
  const [localities, setLocalities] = useState([]);
  const { getLocalities } = useGetLocalities();

  useEffect(() => {
    if (event) {
      const startsAt = new Date(event.startsAt);
      const endsAt = new Date(event.endsAt);

      const days = activitiesHelpers.getDays(startsAt, endsAt);
      setEventDays(days);
    }
  }, [eventLoading]);

  useEffect(async () => {
    const locals = await getLocalities();
    console.log(locals.data);
    setLocalities(locals.data);
  }, []);

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

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
            <ScreenStyle>
              {selectedDay === null && <PageTitle>Primeiro, filtre pelo dia do evento: </PageTitle>}
              <div>
                {eventDays.map((day, i) => (
                  <DayButton isSelected={selectedDay === i} key={i} onClick={() => setSelectedDay(i)}>
                    {day.weekDayName}, {day.date}
                  </DayButton>
                ))}
              </div>
              {selectedDay !== null &&
                <ActivitiesList localities={localities}>
                  {localities.map(l => (
                    <Locality>
                      <p>{l.name}</p>
                      <Activities></Activities>
                    </Locality>
                  ))}
                </ActivitiesList>
              }
            </ScreenStyle>
          )}
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const ScreenStyle = styled.div`
display: flex;
flex-direction: column;

& > div {
  display: flex;
  flex-direction: row;
}
`;

const ActivitiesList = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
`;

const Locality = styled.div`
display: flex;
flex-direction: column;
width: 22vw;
justify-content: center;
align-items: center;

p {
  color: #7B7B7B;
  margin-bottom: 15px;
}
`;

const Activities = styled.div`
height: 50vh;
width: inherit;
border: solid 1px #D7D7D7;
`;
