import styled from 'styled-components';

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
  background: #ebebeb;
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

