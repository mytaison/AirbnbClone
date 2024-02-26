"use client";
import { Suspense, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { SafeListing, SafeUser } from "../types";
import Heading from "../components/shared/Heading";
import Container from "../components/shared/Container";
import ListingCard from "../components/listings/ListingCard";

interface PropertiesClientProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}
const PropertiesClient: React.FC<PropertiesClientProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property is deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Suspense>
      <Container>
        <Heading
          title="Properties"
          subtitle="List of your properties"
        ></Heading>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-8">
          {listings.map((listing, index) => (
            <ListingCard
              key={index}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
              currentUser={currentUser}
              keyId={listing.id}
            ></ListingCard>
          ))}
        </div>
      </Container>
    </Suspense>
  );
};

export default PropertiesClient;
