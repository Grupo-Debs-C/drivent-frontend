import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Modalities, SecondTitle } from '../TicketsTypes/TicketModality';

export default function FinishTicket({ ticket }) {
  return (
    <>
      <SecondTitle>Ingresso escolhido</SecondTitle>
      <ModalitiesUpdated
        isDisplayed={true}
        isSelected={true}>
        <h1>{ticket.isRemote ? 'Online' : ticket.includesHotel ? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'}</h1>
        <h2>R$ {ticket.price}</h2>
      </ModalitiesUpdated>
    </>
  );
}

const ModalitiesUpdated = styled(Modalities)`
width: min-content;
padding: 0px 30px;
cursor: initial;

h1 {
    white-space: nowrap;
}
`;
