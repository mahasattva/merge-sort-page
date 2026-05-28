// Shared Prisma client — instantiated once and reused across routes.
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
