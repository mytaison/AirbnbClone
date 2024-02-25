import EmptyState from "../components/shared/EmptyState";
import TripsClient from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const Trips = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return (
        <EmptyState
          title="UNAUTHORIZED ACCESS"
          subTitle="Please login first,"
        ></EmptyState>
      );
    }
    const reservations = await getReservations({
      userId: currentUser.id,
    });
    if (reservations.length === 0) {
      return (
        <EmptyState
          title="No trips found"
          subTitle="Looks like you haven't reserved any trips"
        ></EmptyState>
      );
    }
    return (
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      ></TripsClient>
    );
  } catch (error) {}
};
export default Trips;
