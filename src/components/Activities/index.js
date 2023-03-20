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
                    <DayButton
                      isSelected={selectedDay === i}
                      key={i}
                      onClick={() => {
                        console.log(activities);
                        let x = dayjs(activities[0].endsAt);
                        console.log(x.diff(dayjs(activities[0].startAt)) / 3.6e+6
                        );
                        setSelectedDay(i);
                      }}
                    >
                      {day.weekDayName}, {day.date}
                    </DayButton>
                  );
                })}
              </div>
              {selectedDay !== null && (
                <ActivitiesList localities={localities}>
                  {localities.map((l) => {
                    return (
                      <Locality>
                        <p>{l.name}</p>
                        <Activities>
                          {activities.map((a) => {
                            if (a.localityId === l.id) {
                              return (
                                <ActivityWrapper
                                  numberOfHours={dayjs(a.endsAt).diff(dayjs(a.startAt)) / 3.6e+6}
                                  onClick={() => handleClick(a.id)}
                                >
                                  <ActivityText>
                                    <ActivityName>{a.Name}</ActivityName>
                                    <ActivityDuration>
                                      {`${dayjs(a.startAt).format('HH:mm')} - ${dayjs(a.endsAt).format('HH:mm')}`}
                                    </ActivityDuration>
                                  </ActivityText>
                                  <Line />
                                  <ActivityVacancies>
                                    {a.vacancyLimit - a.Vacancy.length > 0 ? (
                                      <AvailableContainer>
                                        <AvailableIcon />
                                        <h1>{a.vacancyLimit - a.Vacancy.length} vagas</h1>
                                      </AvailableContainer>
                                    ) : (
                                      <UnavailableContainer>
                                        <VacancyFull />
                                        Esgotado
                                      </UnavailableContainer>
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
              )}
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
    color: #7b7b7b;
    margin-bottom: 15px;
  }
`;

const Activities = styled.div`
  height: 100%;
  width: inherit;
  border: solid 1px #d7d7d7;
  padding: 0.8rem;
`;

const ActivityWrapper = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: row;
  border-radius: 0.4rem;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  height: ${(props) => props.numberOfHours * '80'}px; // mudar isso aqui ó
`;

const ActivityText = styled.div`
  display: flex;
  flex-direction: column;
  width: 199px;
`;

const ActivityName = styled.h4`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 12px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  color: #343434;
`;

const ActivityDuration = styled.h5`
  font-size: 12px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #343434;
`;

const ActivityVacancies = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 63px;
  margin-left: 10px;
`;

const AvailableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 2.5px;
  > h1 {
    font-weight: 400;
    font-size: 10px;
    color: green;
    margin-top: 4px;
  }
  :hover {
    transition: 0.5s;
    background-color: lightpink;
    cursor: pointer;
  }
`;

const AvailableIcon = styled(BoxArrowInRight)`
  height: 25px;
  width: 25px;
  color: green;
  width: 100%;
  margin: 0 auto;
`;

const UnavailableContainer = styled.div`
  > h1 {
    font-weight: 400;
    font-size: 10px;
    color: red;
    margin-top: 4px;
  }
`;

const VacancyFull = styled(DeleteOutline)`
  height: 2rem;
  width: 2rem;
  color: red;
`;

const Line = styled.div`
  border-right: 1px solid #cfcfcf;
`;
