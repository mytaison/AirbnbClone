import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import EmptyState from "@/app/components/shared/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listingById = await getListingById(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listingById) {
    return (
      <EmptyState
        title="No Listing Found"
        subTitle="Try changing listing id"
      ></EmptyState>
    );
  }

  return (
    <ListingClient
      listing={listingById}
      currentUser={currentUser}
      reservations={reservations}
    ></ListingClient>
  );
};

export default ListingPage;
