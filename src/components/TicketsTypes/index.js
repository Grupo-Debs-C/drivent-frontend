import useGetEnrollment from '../../hooks/api/useGetEnrollment';

export default function TicketsTypes() {
  const {
    getEnrollmentLoading,
    getEnrollmentError,
    data
  } = useGetEnrollment();
  console.log(data);
  return (
    <>
      {!data ? (
        <>
          aaa porraa
        </>
      ) : (
        <>
          olha os dados ai
        </>)}
    </>
  );
}
