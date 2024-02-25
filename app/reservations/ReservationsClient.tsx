"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

import { SafeReservation, SafeUser } from "../types";

import Container from "../components/shared/Container";
import Heading from "../components/shared/Heading";
import ListingCard from "../components/listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const [] = useState();
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback((id: string) => {
    setDeletingId(id);
    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
      })
      .catch((error) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setDeletingId(id);
      });
  }, []);
  return (
    <Container>
      <Heading
        title={"Reservations"}
        subtitle={"Booking on your properties"}
      ></Heading>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mt-10 gap-8">
        {reservations.map((reservation, index) => (
          <ListingCard
            key={index}
            keyId={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest Reservation"
            currentUser={currentUser}
          ></ListingCard>
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
