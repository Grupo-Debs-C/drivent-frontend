function getRoomsTypes(rooms) {
  let dict = {};
  rooms.forEach((r) => {
    dict[r.capacity] = true;
  });
  if (dict[1] && dict[2] && dict[3]) {
    return 'Single, Double e Triple';
  } else if (dict[1] && dict[2]) {
    return 'Single e Double';
  } else if (dict[2] && dict[3]) {
    return 'Double e Triple';
  } else if (dict[1] && dict[3]) {
    return 'Single e Triple';
  } else if (dict[1]) {
    return 'Single';
  } else if (dict[2]) {
    return 'Double';
  } else if (dict[3]) {
    return 'Triple';
  }
}

function getCapacity(rooms) {
  let answer = 1;
  rooms.forEach((r) => {
    answer *= r.capacity;
  });
  return answer;
}

const hotelsHelpers = {
  getRoomsTypes,
  getCapacity,
};

export default hotelsHelpers;
