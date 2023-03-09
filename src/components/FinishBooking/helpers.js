function getRoomDescription(name, capacity) {
  switch (capacity) {
  case 1:
    return `${name} (Single)`;
  case 2:
    return `${name} (Double)`;
  case 3:
    return `${name} (Triple)`;
  default:
    return `${name} (Special Room)`;
  }
}
  
function getPeopleDescription(occupancy) {
  switch (occupancy) {
  case 1:
    return 'Somente você';
  case 2:
    return 'Você e mais 1 pessoa';
  default:
    return `Você e mais ${occupancy-1} pessoas`;
  }
}
  
const bookingHelpers = {
  getRoomDescription,
  getPeopleDescription,
};
  
export default bookingHelpers;

