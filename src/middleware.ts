import { defineMiddleware } from "astro:middleware";
import { SchoolService } from "./lib/services/school.service";
import { getSchoolTerminology } from "./lib/terminology";

export const onRequest = defineMiddleware(async (context, next) => {
  // Inject Cloudflare runtime environment variables into process.env and globalThis
  const env = (context.locals as any).runtime?.env || {};
  if (typeof process !== 'undefined') {
    process.env = process.env || {};
    Object.assign(process.env, env);
  } else {
    (globalThis as any).process = { env };
  }
  Object.assign(globalThis, env);

  // Only fetch profile for page requests, not assets or API routes if any
  if (!context.url.pathname.includes('.')) {
    const profile = await SchoolService.getProfile();
    context.locals.schoolProfile = profile;
    context.locals.terminology = getSchoolTerminology(profile?.terminology);
  }
  
  return next();
});
