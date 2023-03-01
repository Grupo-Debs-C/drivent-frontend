import useGetEnrollment from '../../hooks/api/useGetEnrollment';
import { NotRegisteredMessage } from './NotRegisteredMessage';
import { useState, useEffect } from 'react';
import useGetTicketsTypes from '../../hooks/api/useGetTicketsTypes';
import { toast } from 'react-toastify';

export default function TicketsTypes() {
  const { getEnrollmentLoading, getEnrollmentError, userEnrollment } = useGetEnrollment();

  const { getTicketsTypesLoading, getTicketsTypesError, getTicketsTypes } = useGetTicketsTypes();

  const [ticketsTypes, setTicketsTypes] = useState(null);

  useEffect(async() => {
    try{
      const types = await getTicketsTypes();
      setTicketsTypes(types);
    } catch (err) {
      toast('Um erro apareceu ao trazer as informações!');
    }
  }, [getEnrollmentLoading]);

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
