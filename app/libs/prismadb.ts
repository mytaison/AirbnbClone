import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

// For avoiding multi instances issue on hot reload in dev mode,
// cause next dev command clears nodejs cache on start
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
