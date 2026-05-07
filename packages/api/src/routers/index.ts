import type { Context } from "../context";
import prisma from "@test_1/db";

import { contract } from "../index";

export function createRouter(ctx: Context) {
  return {
    healthCheck: async () => {
      return {
        status: 200 as const,
        body: "OK" as const,
      };
    },
    getProjects: async ({ query }: any) => {
      const projects = await prisma.project.findMany({
        where: query?.status ? { status: query.status } : undefined,
        include: { images: true }
      });
      
      return {
        status: 200 as const,
        // Ensure decimal to string conversion if needed, but Prisma handles it typically if configured
        body: projects as any, 
      };
    },
    createInquiry: async ({ body }: any) => {
      const inquiry = await prisma.inquiry.create({
        data: body
      });
      
      return {
        status: 201 as const,
        body: { message: "Inquiry created successfully", id: inquiry.id },
      };
    },
  };
}

export type AppRouter = ReturnType<typeof createRouter>;
