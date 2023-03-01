import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { useState } from 'react';
import { useEffect } from 'react';

export default function TicketsTypes() {
  const { getEnrollmentLoading, getEnrollmentError, userEnrollment } = useGetEnrollment();
  const [ticketsTypes, setTicketsTypes] = useState(null);

  useEffect(( () => {
    
  }), [getEnrollmentLoading]);

  return (
    <>
      {!userEnrollment ? (
        <NotRegisteredMessage>
          <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
        </NotRegisteredMessage>
      ) : (
        <>olha os dados ai</>
      )}
    </>
  );
}
