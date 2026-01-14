import { defineCollection, z } from 'astro:content';

const prompts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    role: z.string(), 
    category: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { prompts };