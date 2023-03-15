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

function getDays(startsAt, endsAt) {
  const ONE_DAY_IN_MILLISECONDS = 8.64e7;
  const daysDifference = (new Date(endsAt) - new Date(startsAt)) / ONE_DAY_IN_MILLISECONDS;
  const daysAmount = [];
  let candidate = startsAt.getTime();

  for (let i = 0; i <= daysDifference; i++) {
    const weekDay = new Date(candidate).getDay();
    const monthDay = new Date(candidate).getDate();
    const month = new Date(candidate).getMonth();
    const obj = {
      weekDayName: getWeekDayName(weekDay),
      date: `${monthDay < 10 ? '0' + monthDay : monthDay}/${month < 10 ? '0' + month : month}`
    };
    daysAmount.push(obj);
    candidate += ONE_DAY_IN_MILLISECONDS;
  }
  return daysAmount;
}

const activitiesHelpers = {
  getDays
};

export default activitiesHelpers;
