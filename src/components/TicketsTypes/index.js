import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { useState } from 'react';

export default function TicketsTypes() {
  const { getEnrollmentLoading, getEnrollmentError, data } = useGetEnrollment();
  const [presentState, setPresentState] = useState(false);
  return (
    <>
      {data ? (
        <NotRegisteredMessage>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </NotRegisteredMessage>
      ) : (
        <>olha os dados ai</>
      )}
    </>
  );
}
