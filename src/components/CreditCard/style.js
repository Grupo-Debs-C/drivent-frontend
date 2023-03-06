import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3rem;
`;

export const CardForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 183px;
  width: 100%;
  padding: 0 4rem 0 1rem;
`;

export const CardInput = styled.input`
  padding-left: 0.6rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  width: 100%;
  height: 3rem;
  border-radius: 0.3rem;
  outline: none;
  border-width: 0.12rem;
  border-color: rgba(25, 25, 25, 0.2);

  ::placeholder {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    color: rgba(25, 25, 25, 0.6);
  };
`;

export const StyledCard = styled(Cards)`
`;

export const TopInputs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1.2rem;
  height: 100%;
  width: 100%;
`;

export const BottomInputs = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > input:last-child {
    width: 50%;
    margin-left: 1rem;
  }
`;
