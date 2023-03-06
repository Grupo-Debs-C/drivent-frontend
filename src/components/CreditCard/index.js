import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import * as creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';

import useSavePayment from '../../hooks/api/useSavePayment';
import {
  Container,
  CardForm,
  CardInput
} from './style.js';
import Button from '../Form/Button';

function getLastDigits(number) {
  return (number.length > 4) ? number.slice(number.length - 5, number.length - 1) : number;
}

export default function CreditCard({ ticket }) {
  const cardDetails = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: ''
  };
  const [cardState, setCardState] = useState(cardDetails);
  const { savePaymentLoading, savePayment } = useSavePayment();

  const inputs = {
    cvc: 'CVC',
    expiry: 'Valid Thru',
    name: 'Name',
    number: 'Card Number'
  };

  const handleSubmit = async(e, data) => {
    e.preventDefault();
    const newData = {
      ticketId: ticket.id,
      cardData: {
        issuer: data?.issuer,
        number: getLastDigits(data?.number)
      }
    };

    try {
      await savePayment(newData);
      toast('Pagamento processado!');
    } catch (err) {
      toast('Não foi possível realizar o pagamento!');
    }
  };

  const handleInputFocus = (e) => {
    setCardState({ ...cardState, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCardState({
      ...cardState,
      [name]: value,
      issuer: creditCardType(cardState.number)[0].niceType
    });
  };

  const renderCardInputs = () => {
    return (
      (Object.entries(inputs)).map(i => {
        return (
          <CardInput
            key={i[0]}
            type={(i[0] === 'name') ? 'text' : 'tel'}
            maxLength={(i[0] === 'expiry' || i[0] === 'cvc') ? '4' : ''}
            name={i[0]}
            placeholder={i[1]}
            onChange={(e) => { handleInputChange(e); }}
            onFocus={(e) => { handleInputFocus(e); }}
          />
        );
      })
    );
  };

  return (
    <Container>
      <Cards
        cvc={cardState.cvc}
        expiry={cardState.expiry}
        focused={cardState.focus}
        name={cardState.name}
        number={cardState.number}
        issuer={creditCardType(cardState.number)[0].niceType}
      />
      <CardForm onSubmit={(e) => handleSubmit(e, cardState)}>
        {renderCardInputs()}
        <Button
          type='submit'
          disabled={savePaymentLoading}
        >
          FINALIZAR PAGAMENTO
        </Button>
      </CardForm>
    </Container>
  );
};
