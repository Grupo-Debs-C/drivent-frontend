import styled from 'styled-components';

export const ActivitiesNotAvailableMessage = styled.div`
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

export const ButtonsContainer = styled.div`
  flex-wrap: wrap;
`;

export const DayButton = styled.button`
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#e0e0e0')};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  width: 131px;
  height: 37px;
  border: none;
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  margin-right: 43px;
  margin-bottom: 35px;
  cursor: pointer;
`;

export const PageTitle = styled.h1`
  margin-top: 26px;
  margin-bottom: 28px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;
