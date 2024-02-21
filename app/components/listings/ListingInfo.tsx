import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../shared/Avatar";
import ListingCategory from "./ListingCategory";
import { FaBath } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../shared/Map"), { ssr: false });

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bathroomCount,
  guestCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const locationCoordinate = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted By {user?.name}</div>
          <Avatar src={user?.image}></Avatar>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div className="flex flex-row gap-2">
            <FaPerson size={20} />
            <div>{guestCount}</div>
          </div>
          <div className="flex flex-row gap-2">
            <IoBed size={20} />
            <div>{roomCount} </div>
          </div>
          <div className="flex flex-row gap-2">
            <FaBath size={20} />
            <div>{bathroomCount}</div>
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <>
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
          <hr />
        </>
      )}
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={locationCoordinate}></Map>
    </div>
  );
};

export default ListingInfo;
