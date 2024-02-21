import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET(request: Request) {
  try {
    const allListings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(allListings);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function POST(request: Request) {
  const currnetUser = await getCurrentUser();
  if (!currnetUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currnetUser.id,
      },
    });
    return NextResponse.json(listing);
  } catch (error: any) {
    throw new Error(error);
  }
}
