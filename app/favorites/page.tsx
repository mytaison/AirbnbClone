import { Suspense } from "react";
import EmptyState from "../components/shared/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteClient from "./FavoriteClient";

const Listing = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title="UNAUTHORISED ACCESS"
        subTitle="Please login first."
      ></EmptyState>
    );
  }

  const favorites = await getFavoriteListings();
  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found."
        subTitle="Looks like you've no favorite listings."
      ></EmptyState>
    );
  }

  return (
    <Suspense>
      <FavoriteClient
        currentUser={currentUser}
        listings={favorites}
      ></FavoriteClient>
    </Suspense>
  );
};

export default Listing;
