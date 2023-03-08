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
