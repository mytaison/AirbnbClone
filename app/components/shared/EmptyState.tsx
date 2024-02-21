"use client";

import { useRouter } from "next/navigation";
import { title } from "process";
import Heading from "./Heading";
import Button from "./Button";
import { MouseEvent } from "react";

interface EmptyStateProps {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches.",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div
      className="
  h-[60vh]
  flex
  flex-col
  gap-2
  justify-center
  items-center"
    >
      <Heading center title={title} subtitle={subTitle}></Heading>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label={"Remove all filters"}
            onClick={() => {
              router.push("/");
            }}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
