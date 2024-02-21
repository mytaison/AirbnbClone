import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/shared/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listingById = await getListingById(params);
  if (!listingById) {
    return (
      <EmptyState
        title="No Listing Found"
        subTitle="Try changing listing id"
      ></EmptyState>
    );
  }
  const currentUser = await getCurrentUser();

  return (
    <ListingClient
      listing={listingById}
      currentUser={currentUser}
    ></ListingClient>
  );
};

export default ListingPage;
