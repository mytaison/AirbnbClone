import EmptyState from "../components/shared/EmptyState";
import PropertiesClient from "./PropertiesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

const Properties = async () => {
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
    const listings = await getListings({
      userId: currentUser.id,
    });
    console.log("Listings:", listings);
    if (listings.length === 0) {
      return (
        <EmptyState
          title="No properties found"
          subTitle="Looks like you haven't added any property yet."
        ></EmptyState>
      );
    }
    return (
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      ></PropertiesClient>
    );
  } catch (error) {}
};
export default Properties;
