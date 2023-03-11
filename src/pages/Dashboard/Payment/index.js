import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FinishTicket from '../../../components/FinishTicket';
import { SecondTitle } from '../../../components/TicketsTypes/TicketModality';
import TicketsTypes from '../../../components/TicketsTypes';
import CreditCard from '../../../components/CreditCard';
import useGetTicket from '../../../hooks/api/useGetTicket';
import ConfirmationImg from '../../../assets/images/Vector.png';

export default function Payment() {
  const { getTicket } = useGetTicket();
  const [ticket, setTicket] = useState({});

  useEffect(async () => {
    try {
      const newTicket = await getTicket();
      setTicket(newTicket);
    } catch (err) {
      toast('Primeiro escolha seu ticket!');
    }
  }, [ticket]);

  return (
    <>
      {
        ticket.id ? (
          <>
            <FinishTicket ticket={ticket} />
            {
              (ticket?.status === 'PAID') ? (
                <>
                  <SecondTitle>Pagamento</SecondTitle>
                  <PaymentConfirmation>
                    <img alt="confirmation" src={ConfirmationImg}></img>
                    <div>
                      <h1>Pagamento confirmado!</h1>
                      <h2>Prossiga para escolha da hospedagem, e atividades</h2>
                    </div>
                  </PaymentConfirmation>
                </>
              ) : <CreditCard ticket={ticket} />
            }
          </>
        ) : <TicketsTypes setTicket={setTicket} />
      }
    </>
  );
}

const PaymentConfirmation = styled.div`
  display: flex;
  margin-top: 2rem;
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
