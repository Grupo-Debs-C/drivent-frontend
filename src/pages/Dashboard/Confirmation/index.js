import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useGetTicket from '../../../hooks/api/useGetTicket';
import Payment from '../Payment';
import styled from 'styled-components';
import { Modalities, SecondTitle } from '../../../components/TicketsTypes/TicketModality';
import imgConfirmation from '../Confirmation/Vector.png';

export default function Confirmation() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async function call() {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Primeiro escolha seu ticket!');
    }
  }, []);

  return (
    <>
      {ticket.id ? (
        <>
          <SecondTitle>Ingresso escolhido</SecondTitle>
          <ModalitiesUpdated isDisplayed={true} isSelected={true}>
            <h1>
              {ticket.isRemote ? 'Online' : ticket.includesHotel ? 'Presencial + Com Hotel' : 'Presencial + Sem Hotel'}
            </h1>
            <h2>R$ {ticket.TicketType.price}</h2>
          </ModalitiesUpdated>
          <SecondTitle>Pagamento</SecondTitle>
          <PaymentConfirmation>
            <img alt="confirmation" src={imgConfirmation}></img>
            <div>
              <h1>Pagamento confirmado!</h1>
              <h2>Prossiga para escolha da hospedagem, e atividades</h2>
            </div>
          </PaymentConfirmation>
        </>
      ) : (
        <Payment />
      )}
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
const PaymentConfirmation = styled.div`
  display: flex;
  h1 {
    font-size: 16px;
    font-weight: bold;
    color: #454545;
  }
  h2 {
    font-size: 16px;
    font-weight: 300;
    color: #454545;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 13px;
  }
`;
