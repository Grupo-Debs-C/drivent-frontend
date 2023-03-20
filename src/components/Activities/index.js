import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { ActivitiesNotAvailableMessage, DayButton, PageTitle } from './ActivitiesStyles';
import useEvent from '../../hooks/api/useEvent';
import { useEffect, useState } from 'react';
import activitiesHelpers from './helpers';
import useGetLocalities from '../../hooks/api/useGetLocalities';
import useGetActivities from '../../hooks/api/useGetActivities';
import { BoxArrowInRight } from '@styled-icons/bootstrap/BoxArrowInRight';
import { DeleteOutline } from '@styled-icons/typicons/DeleteOutline';
import useSaveVacancy from '../../hooks/api/useSaveVacancy';
import { toast } from 'react-toastify';

export default function ActivitiesSelection({ ticket }) {
  const { event, eventLoading } = useEvent();
  const [eventDays, setEventDays] = useState([]);
  //ao ser clicado, o index do dia da semana é salvo aqui:
  //btw: se você achou estranho o fato do título da página sumir ao clicar o botão, saiba que eu também achei, mas no Figma tá assim, fazer o quê
  const [selectedDay, setSelectedDay] = useState(null);
  const [localities, setLocalities] = useState([]);
  const [activities, setActivities] = useState([]);
  const { getLocalities } = useGetLocalities();
  const { getActivities } = useGetActivities();
  const { saveVacancyLoading, saveVacancy } = useSaveVacancy();

  useEffect(() => {
    if (event) {
      const startsAt = new Date(event.data.startsAt);
      const endsAt = new Date(event.data.endsAt);

      const days = activitiesHelpers.getDays(startsAt, endsAt);
      setEventDays(days);
    }
  }, [eventLoading]);

  useEffect(async () => {
    const locals = await getLocalities();
    setLocalities(locals.data);

    const response = await getActivities();
    setActivities(response);
  }, []);

  const handleClick = async (id) => {
    try {
      await saveVacancy(id, ticket.id);
      toast('Vaga garantida!');
    } catch (err) {
      toast('Não foi possível se cadastrar nesta atividade.');
    }
  };

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
                {eventDays.map((day, i) => {
                  return (
                    <DayButton isSelected={selectedDay === i} key={i} onClick={() => setSelectedDay(i)}>
                      {day.weekDayName}, {day.date}
                    </DayButton>
                  );
                })}
              </div>
              {selectedDay !== null &&
                <ActivitiesList localities={localities}>
                  {localities.map(l => {
                    return (
                      <Locality>
                        <p>{l.name}</p>
                        <Activities>
                          {activities.map(a => {
                            if (a.localityId === l.id) {
                              return (
                                <ActivityWrapper onClick={() => handleClick(a.id)}>
                                  <ActivityText>
                                    <ActivityName>
                                      {a.Name}
                                    </ActivityName>
                                    <ActivityDuration>
                                      {
                                        `${dayjs(a.startAt).format('HH:mm')} - ${dayjs(a.endsAt).format('HH:mm')}`
                                      }
                                    </ActivityDuration>
                                  </ActivityText>
                                  <ActivityVacancies>
                                    {(a.vacancyLimit - a.Vacancy.length > 0) ? (
                                      <>
                                        <VacancyAvailable />
                                        {a.vacancyLimit - a.Vacancy.length} vagas
                                      </>
                                    ) : (
                                      <>
                                        <VacancyFull />
                                        Esgotado
                                      </>
                                    )}
                                  </ActivityVacancies>
                                </ActivityWrapper>
                              );
                            }
                            return null;
                          })}
                        </Activities>
                      </Locality>
                    );
                  })}
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
height: 100%;

& > div {
  display: flex;
  flex-direction: row;
}
`;

const ActivitiesList = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
`;

const Locality = styled.div`
display: flex;
flex-direction: column;
width: 17rem;
justify-content: center;
align-items: center;

p {
  color: #7B7B7B;
  margin-bottom: 15px;
}
`;

const Activities = styled.div`
height: 100%;
width: inherit;
border: solid 1px #D7D7D7;
padding: 0.8rem;
`;

const ActivityWrapper = styled.div`
  background: #F1F1F1;
  display: flex;
  flex-direction: row;
  border-radius: 0.4rem;
  padding: 1rem;
  justify-content: space-between;
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActivityName = styled.h4`
  font-weight: bold;
  margin-bottom: 0.4rem;
  font-size: 12px;
`;

const ActivityDuration = styled.h5`
  font-size: 12px;
`;

const ActivityVacancies = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VacancyAvailable = styled(BoxArrowInRight)`
  height: 2rem;
  width: 2rem;
  color: green;
`;

const VacancyFull = styled(DeleteOutline)`
  height: 2rem;
  width: 2rem;
  color: red;
`;
