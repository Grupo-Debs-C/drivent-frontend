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
import { CheckCircle } from '@styled-icons/bootstrap/CheckCircle';
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
  }, [eventLoading, saveVacancyLoading]);

  useEffect(async () => {
    const locals = await getLocalities();
    setLocalities(locals.data);

    const response = await getActivities();
    setActivities(response);
  }, [saveVacancyLoading]);

  const handleClick = async (id) => {
    try {
      await saveVacancy({ activityId: id, ticketId: ticket.id });
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
                            return a.localityId === l.id ? (
                              a.vacancyLimit - a.Vacancy.length > 0 ? (
                                a.Vacancy.find((v) => v.ticketId === ticket.id) ? (
                                  <SubscribedActivity numberOfHours={dayjs(a.endsAt).diff(dayjs(a.startAt)) / 3.6e6}>
                                    <ActivityText>
                                      <ActivityName>{a.Name}</ActivityName>
                                      <ActivityDuration>
                                        {`${dayjs(a.startAt).format('HH:mm')} - ${dayjs(a.endsAt).format('HH:mm')}`}
                                      </ActivityDuration>
                                    </ActivityText>
                                    <Line />
                                    <ActivityVacancies>
                                      <SubscribedContainer>
                                        <SubscribedIcon />
                                        <h1>Inscrito</h1>
                                      </SubscribedContainer>
                                    </ActivityVacancies>
                                  </SubscribedActivity>
                                ) : (
                                  <AvailableActivity numberOfHours={dayjs(a.endsAt).diff(dayjs(a.startAt)) / 3.6e6}>
                                    <ActivityText>
                                      <ActivityName>{a.Name}</ActivityName>
                                      <ActivityDuration>
                                        {`${dayjs(a.startAt).format('HH:mm')} - ${dayjs(a.endsAt).format('HH:mm')}`}
                                      </ActivityDuration>
                                    </ActivityText>
                                    <Line />
                                    <ActivityVacancies>
                                      <AvailableContainer onClick={() => handleClick(a.id)}>
                                        <AvailableIcon />
                                        <h1>{a.vacancyLimit - a.Vacancy.length} vagas</h1>
                                      </AvailableContainer>
                                    </ActivityVacancies>
                                  </AvailableActivity>
                                )
                              ) : (
                                <UnavailableActivity numberOfHours={dayjs(a.endsAt).diff(dayjs(a.startAt)) / 3.6e6}>
                                  <ActivityText>
                                    <ActivityName>{a.Name}</ActivityName>
                                    <ActivityDuration>
                                      {`${dayjs(a.startAt).format('HH:mm')} - ${dayjs(a.endsAt).format('HH:mm')}`}
                                    </ActivityDuration>
                                  </ActivityText>
                                  <Line />
                                  <UnavailableContainer>
                                    <VacancyFull />
                                    <h1>Esgotado</h1>
                                  </UnavailableContainer>
                                </UnavailableActivity>
                              )
                            ) : (
                              <></>
                            );
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
  height: 392px;
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

const AvailableActivity = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: row;
  border-radius: 0.4rem;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  height: ${(props) => props.numberOfHours * '80'}px;
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
  justify-content: center;
  width: 63px;
  margin-left: 10px;
  border-radius: 5px;
`;

const AvailableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const SubscribedIcon = styled(CheckCircle)`
  height: 25px;
  width: 25px;
  color: green;
  width: 100%;
  margin: 0 auto;
`;

const UnavailableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 11px;
  padding: 2.5px;
  > h1 {
    font-weight: 400;
    font-size: 10px;
    color: red;
    margin-top: 4px;
  }
`;

const SubscribedContainer = styled.div`
  > h1 {
    font-weight: 400;
    font-size: 10px;
    color: green;
    margin-top: 4px;
  }
`;

const VacancyFull = styled(DeleteOutline)`
  height: 25px;
  width: 25px;
  color: red;
  width: 100%;
  margin: 0 auto;
`;

const Line = styled.div`
  border-right: 1px solid #cfcfcf;
`;

const UnavailableActivity = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: row;
  border-radius: 0.4rem;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  height: ${(props) => props.numberOfHours * '80'}px;
  cursor: not-allowed;
`;

const SubscribedActivity = styled.div`
  background: #d0ffdb;
  display: flex;
  flex-direction: row;
  border-radius: 0.4rem;
  padding: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  height: ${(props) => props.numberOfHours * '80'}px;
  cursor: not-allowed;
`;
