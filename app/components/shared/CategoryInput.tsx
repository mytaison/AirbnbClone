"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
  icon: IconType;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  label,
  selected,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer 
    ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <Icon size={30}></Icon>
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
