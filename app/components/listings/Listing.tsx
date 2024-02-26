import type { Listing } from "@prisma/client";
import ListingCard from "./ListingCard";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeListing } from "@/app/types";

interface ListingProps {
  listings: SafeListing[];
}

const Listing: React.FC<ListingProps> = async ({ listings }) => {
  const currentUser = await getCurrentUser();

  return listings.map((item, index) => (
    <ListingCard
      key={item.id}
      data={item}
      currentUser={currentUser}
      keyId={item.id}
    />
  ));
};

export default Listing;
