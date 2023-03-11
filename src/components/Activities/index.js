import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { ActivitiesNotAvailableMessage } from './ActivitiesStyles';

export default function ActivitiesSelection({ ticket }) {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
  
      {!ticket && (
        <ActivitiesNotAvailableMessage>
          <p>Você ainda não possui um ingresso.</p>
        </ActivitiesNotAvailableMessage>
      )}
  
      {ticket?.TicketType?.isRemote === true && (
        <ActivitiesNotAvailableMessage>
          <p>Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.</p>
        </ActivitiesNotAvailableMessage>
      )}
  
      {ticket?.status === 'RESERVED' && (
        <ActivitiesNotAvailableMessage>
          <p>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</p>
        </ActivitiesNotAvailableMessage>
      )}
    </>
  );
}
  
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
  
