import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../shared/Heading";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  id: string;
  locationValue: string;
  currentUser: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} , ${location?.label}`}
      ></Heading>
      <div
        className="
      w-full
      h-[60vh]
      overflow-hidden
      rounded-xl
      relative
      "
      >
        <Image
          src={imageSrc}
          alt={`image of ${title}`}
          fill
          className="object-cover w-full "
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
