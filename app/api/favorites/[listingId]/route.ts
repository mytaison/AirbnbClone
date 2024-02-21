import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currnetUser = await getCurrentUser();
  if (!currnetUser) {
    return NextResponse.error();
  }
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currnetUser?.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currnetUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currnetUser = await getCurrentUser();
  if (!currnetUser) {
    return NextResponse.error();
  }
  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currnetUser?.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currnetUser.id,
    },
    data: {
      favoriteIds: favoriteIds,
    },
  });

  return NextResponse.json(user);
}
