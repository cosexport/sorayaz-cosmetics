import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactRequest } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input((val: unknown) => {
        if (typeof val !== 'object' || val === null) throw new Error('Invalid input');
        const obj = val as Record<string, unknown>;
        return {
          companyName: String(obj.companyName || ''),
          firstName: String(obj.firstName || ''),
          lastName: String(obj.lastName || ''),
          country: String(obj.country || ''),
          partnershipType: String(obj.partnershipType || ''),
          message: String(obj.message || ''),
          email: String(obj.email || ''),
          phone: String(obj.phone || ''),
        };
      })
      .mutation(async ({ input }) => {
        try {
          const result = await createContactRequest({
            companyName: input.companyName,
            firstName: input.firstName,
            lastName: input.lastName,
            country: input.country,
            partnershipType: input.partnershipType,
            message: input.message,
            email: input.email || undefined,
            phone: input.phone || undefined,
          });
          return { success: true, id: result?.id };
        } catch (error) {
          console.error('Failed to submit contact form:', error);
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
