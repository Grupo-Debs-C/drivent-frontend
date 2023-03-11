import styled from 'styled-components';
import { Person } from '@styled-icons/bootstrap/Person';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';

export const RoomWrapper = styled.li`
  display: flex;
  flex-direction: row;
  width: 10rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  border: 0.1rem solid #CECECE;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  background: ${(props) => {
    switch (props.status) {
    case 'selected':
      return '#FFEED2!important';
    case 'full':
      return '#CECECE';
    default:
      return '#FFF';
    }
  }}; 

  &:hover {
    background: rgba(240, 240, 240, 1);
  }
`;

export const Vacancies = styled.div`

`;

export const StyledPerson = styled(Person)`
  height: 1.5rem;
  width: 1.5rem;
`;

export const StyledFillPerson = styled(PersonFill)`
  height: 1.5rem;
  width: 1.5rem;
`;
