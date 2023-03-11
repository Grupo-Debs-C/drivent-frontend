import MuiButton from '@material-ui/core/Button';
import styled, { keyframes } from 'styled-components';

export const HotelNotAvailableMessage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #8e8e8e;
    width: 388px;
  }
`;

export const HotelsContainer = styled.div`
  display: flex;
`;

export const PageTitle = styled.h1`
  margin-top: 36px;
  margin-bottom: 18px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;

export const HotelOption = styled.div`
  background: ${props => props.selected ? '#FFEED2' : '#ebebeb'}; 
  border-radius: 10px;
  width: 196px;
  height: 264px;
  margin-right: 19px;
  cursor: pointer;
`;

export const HotelMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HotelImage = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  object-fit: cover;
  margin-top: 16px;
`;

export const HotelName = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  margin: 0 auto;
  color: #343434;
  margin-top: 10px;
  margin-bottom: 3px;
`;

export const HotelCapacityInfo = styled.p`
display: flex;
flex-direction: column;
font-style: normal;
font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
margin-left: 15px;
margin-top: 10px;
text-align: left;
font-weight: 400;
font-size: 12px;
color: #3C3C3C;
>strong{
  font-weight: 700;
  margin-bottom: 2px;
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

export const RoomList = styled.ul`
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
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  animation: ${fadeIn} 0.9s ease-in-out;
`;
