import prisma from "../libs/prismadb";

export default async function getListings() {
  try {
    const allListings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeAllListings = allListings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeAllListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
