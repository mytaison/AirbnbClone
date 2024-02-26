"use client";

import Container from "../shared/Container";
import CategoryBox from "../shared/CategoryBox";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { IconType } from "react-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export type CategoryType = {
  label: string;
  icon: IconType;
  description: string;
  selected?: boolean;
};

export const categories: Array<CategoryType> = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to lake!",
  },
  {
    label: "Skii",
    icon: FaSkiing,
    description: "This property has skiing activity!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property in a castle!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has snow activity!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in a desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Luxury",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item, index) => {
          item.selected = item.label === category;
          return <CategoryBox key={index} item={item}></CategoryBox>;
        })}
      </div>
    </Container>
  );
};

export default Categories;
