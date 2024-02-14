"use client";

import React, { useCallback } from "react";
import { CategoryType } from "../navbar/Categories";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface CategoryBoxProps {
  item: CategoryType;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({ item }) => {
  const Icon = item.icon;
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      category: item.label,
    };

    // Deselecting already selected category
    if (params?.get("category") === item.label) {
      delete updateQuery.category;
    }
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [item.label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transiton cursor-pointer
  ${item.selected ? "border-b-neutral-800" : "border-transparent"}
  ${item.selected ? "text-neutral-800" : "text-neutral-500"}

  `}
      onClick={handleClick}
    >
      <Icon size={26}></Icon>
      <div className="font-medium text-sm">{item.label}</div>
    </div>
  );
};

export default CategoryBox;
