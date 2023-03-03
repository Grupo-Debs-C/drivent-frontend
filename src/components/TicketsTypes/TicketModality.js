import styled from 'styled-components';

export const SecondTitle = styled.h5`
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: #8e8e8e;
  margin-bottom: 17px;
  margin-top: 34px;
`;

export const Modalities = styled.div`
  background-color: ${props => props.isSelected ? '#FFEED2' : 'white'};
  width: 145px;
  height: 145px;
  border: ${props => props.isSelected ? '' : '1px solid #cecece'};
  border-radius: 20px;
  cursor: pointer;
  margin-right: 24px;
  display: ${props => props.isDisplayed ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  
  > h1 {
    color: #454545;
  }
  > h2 {
    color: #898989;
    margin-top: 6px;
  }
`;

export const ModalitiesContainer = styled.div`
  display: flex;
`;

export const ConfirmationButton = styled.button`
  width: 162px;
  height: 37px;
  background-color: #E0E0E0;
  border-radius: 4px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  border: none;
  cursor: pointer;
`;
