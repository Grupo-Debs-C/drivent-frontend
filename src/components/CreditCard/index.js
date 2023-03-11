import { useState } from 'react';
import * as creditCardType from 'credit-card-type';
import { toast } from 'react-toastify';

import useSavePayment from '../../hooks/api/useSavePayment';
import {
  Container,
  CardForm,
  CardInput,
  TopInputs,
  BottomInputs,
  StyledCard
} from './style.js';
import Button from '../Form/Button';
import { SecondTitle } from '../TicketsTypes/TicketModality';

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

  const handleSubmit = async (e, data) => {
    e.preventDefault();

    const expiryPattern = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])$/;

    if (!data.issuer || (data.number.length < 13) || (data.number.length > 19))
      return toast('Número de cartão inválido!');

    if ((data.cvc.length < 3) || ((data.cvc.length === 4) && (data.issuer !== 'Amex') && (data.issuer !== 'Discover')))
      return toast('CVV inválido!');

    if (!data.name)
      return toast('Insira um nome');

    if (!expiryPattern.test(cardState.expiry.trim())) {
      return toast('Insira uma data válida no formato `mês/dia`');
    }

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
      issuer: creditCardType(cardState.number)[0]?.niceType
    });
  };

  const handleKeyPress = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /[0-9]/;

    if (!regex.test(keyValue)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <SecondTitle> Pagamento </SecondTitle>
      <Container>
        <StyledCard
          cvc={cardState.cvc}
          expiry={cardState.expiry}
          focused={cardState.focus}
          name={cardState.name}
          number={cardState.number}
          issuer={creditCardType(cardState.number)[0]?.type}
        />
        <CardForm
          onSubmit={(e) => handleSubmit(e, cardState)}
          id='card-form'
        >
          <TopInputs>
            <CardInput
              type={'tel'}
              name='number'
              placeholder='Número do Cartão'
              onChange={(e) => { handleInputChange(e); }}
              onFocus={(e) => { handleInputFocus(e); }}
              onKeyPress={(e) => { handleKeyPress(e); }}
            />
            <CardInput
              type={'text'}
              name='name'
              placeholder='Nome'
              onChange={(e) => { handleInputChange(e); }}
              onFocus={(e) => { handleInputFocus(e); }}
            />
          </TopInputs>
          <BottomInputs>
            <CardInput
              type={'tel'}
              name='expiry'
              placeholder='Validade'
              maxLength='5'
              onChange={(e) => { handleInputChange(e); }}
              onFocus={(e) => { handleInputFocus(e); }}
            />
            <CardInput
              type={'tel'}
              name='cvc'
              placeholder='CVC'
              maxLength='4'
              onChange={(e) => { handleInputChange(e); }}
              onFocus={(e) => { handleInputFocus(e); }}
              onKeyPress={(e) => { handleKeyPress(e); }}
            />
          </BottomInputs>
        </CardForm>
      </Container>
      <Button
        form='card-form'
        type='submit'
        disabled={savePaymentLoading}
      >
        FINALIZAR PAGAMENTO
      </Button>
    </>
  );
};
