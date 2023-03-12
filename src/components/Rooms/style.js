import MuiButton from '@material-ui/core/Button';
import styled, { keyframes } from 'styled-components';
import { Person } from '@styled-icons/bootstrap/Person';
import { PersonFill } from '@styled-icons/bootstrap/PersonFill';

export const RoomWrapper = styled.li`
  opacity: ${props => (props.status === 'full') ? '0.5' : '1'};
  font-weight: 700;
  display: flex;
  flex-direction: row;
  width: 10rem;
  height: 2.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  border: 0.1rem solid #CECECE;
  border-radius: 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  cursor: ${props => (props.status === 'full') ? 'initial' : 'pointer'};
  font-size: 1.2rem;
  background: ${(props) => {
    switch (props.status) {
    case 'selected':
      return '#FFEED2!important';
    case 'full':
      return '#E9E9E9!important';
    default:
      return '#FFF';
    }
  }}; 

  &:hover {
    background: rgba(240, 240, 240, 1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const RoomListWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  animation: ${fadeIn} 0.6s ease-in-out;
  margin-bottom: 2rem;
`;

export const Title = styled.h5`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #8e8e8e;
  margin-bottom: 17px;
  margin-top: 34px;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const BookingButton = styled(MuiButton)`
  margin-top: 8px !important;
  opacity: ${(props) => ((props.visible === 'true') ? '1' : '0')};
  animation: ${fadeIn} 0.9s ease-in-out;
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
