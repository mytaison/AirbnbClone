import EmptyState from "../components/shared/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const Reservation = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="UNAUTHORIZE ACCESS"
        subTitle="Please signIn first."
      ></EmptyState>
    );
  }
  const reservations = await getReservations({
    authorId: currentUser?.id,
  });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations found."
        subTitle="Looks like you have no reservations on your property"
      ></EmptyState>
    );
  }
  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    ></ReservationsClient>
  );
};

export default Reservation;
