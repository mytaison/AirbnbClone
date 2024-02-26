import getListings, { IListingParams } from "./actions/getListings";
import Listing from "./components/listings/Listing";
import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const allListings = await getListings(searchParams);

  if (allListings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="
          pt-24 
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        <Listing listings={allListings}></Listing>
      </div>
    </Container>
  );
};

export default Home;
