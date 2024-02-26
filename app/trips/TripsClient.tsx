"use client";
import { Suspense, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { SafeReservation, SafeUser } from "../types";
import Heading from "../components/shared/Heading";
import Container from "../components/shared/Container";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  currentUser?: SafeUser | null;
  reservations: SafeReservation[];
}
const TripsClient: React.FC<TripsClientProps> = ({
  currentUser,
  reservations,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation is cancelled");
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
          title="Trips"
          subtitle="Where you have been and where you're going"
        ></Heading>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-6 gap-8">
          {reservations.map((reservation, index) => (
            <ListingCard
              key={index}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Reservation"
              currentUser={currentUser}
              keyId={reservation.id}
            ></ListingCard>
          ))}
        </div>
      </Container>
    </Suspense>
  );
};

export default TripsClient;
