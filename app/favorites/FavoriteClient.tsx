import { SafeListing, SafeUser } from "../types";
import Container from "../components/shared/Container";
import Heading from "../components/shared/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavoriteClientProps {
  currentUser: SafeUser | null;
  listings: SafeListing[];
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({
  currentUser,
  listings,
}) => {
  return (
    <Container>
      <Heading
        title="Your Favorites"
        subtitle="List of places you've favorited!"
      ></Heading>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            keyId={listing.id}
            data={listing}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};

export default FavoriteClient;
