import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import { HotelCapacityInfo, HotelImage, HotelMainInfo, HotelName, HotelOption } from '../Hotels/HotelsStyles';
import { SecondTitle } from '../TicketsTypes/TicketModality';
import bookingHelpers from './helpers';
import Button from '../Form/Button';

export default function FinishBooking({ booking, setChosenRoom }) {
  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <SecondTitle>Você já escolheu seu quarto:</SecondTitle>
      <HotelOptionUpdated>
        <HotelMainInfo>
          <HotelImage alt={booking.hotelName} src={booking.hotelImage} />
          <HotelName>{booking.hotelName}</HotelName>
        </HotelMainInfo>

        <HotelCapacityInfo>
          <strong>Quarto reservado</strong>
          {bookingHelpers.getRoomDescription(booking.Room.name, booking.Room.capacity)}
        </HotelCapacityInfo>
        <HotelCapacityInfo>
          <strong>Pessoas no seu quarto</strong>
          {bookingHelpers.getPeopleDescription(booking.occupancy)}
        </HotelCapacityInfo>
      </HotelOptionUpdated>
      <UpdateBookingButton
        onClick={() => {
          setChosenRoom(false);
        }}
      >
        TROCAR DE QUARTO
      </UpdateBookingButton>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const HotelOptionUpdated = styled(HotelOption)`
  cursor: initial;
  background-color: #ffeed2;
  margin-bottom: 37px;
`;

const UpdateBookingButton = styled(Button)`
  margin-top: 20px;
`;
