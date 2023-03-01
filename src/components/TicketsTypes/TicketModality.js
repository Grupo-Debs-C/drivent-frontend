import styled from 'styled-components';

export const TicketsModality = styled.div`
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 24px;
  display: flex;
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
    margin-top: 3px;
  }
`;

export const TicketsContainer = styled.div`
  display: flex;
`;
