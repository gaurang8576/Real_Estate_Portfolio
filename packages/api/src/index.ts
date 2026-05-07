import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  tagline: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  priceFrom: z.any(), // Decimal
  priceTo: z.any().nullable(),
  plotSize: z.string().nullable(),
  status: z.enum(["ACTIVE", "SOLD_OUT", "UPCOMING", "ARCHIVED"]),
  highlights: z.array(z.string()),
  coverImage: z.string(),
});

const InquiryInputSchema = z.object({
  fullName: z.string().min(2),
  mobile: z.string().min(10),
  preferredLocation: z.string().optional(),
  message: z.string().optional(),
});

const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string().nullable(),
  location: z.string().nullable(),
  content: z.string(),
  rating: z.number(),
  avatarUrl: z.string().nullable(),
});

export const contract = c.router({
  healthCheck: {
    method: "GET",
    path: "/health",
    responses: {
      200: z.literal("OK"),
    },
  },
  getProjects: {
    method: "GET",
    path: "/projects",
    query: z.object({
      status: z.enum(["ACTIVE", "SOLD_OUT", "UPCOMING", "ARCHIVED"]).optional(),
    }).optional(),
    responses: {
      200: z.array(ProjectSchema),
    },
  },
  createInquiry: {
    method: "POST",
    path: "/inquiries",
    body: InquiryInputSchema,
    responses: {
      201: z.object({ message: z.string(), id: z.string() }),
      400: z.object({ message: z.string() }),
    },
  },
});

export type AppContract = typeof contract;
