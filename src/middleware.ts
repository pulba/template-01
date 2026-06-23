import { defineMiddleware } from "astro:middleware";
import { SchoolService } from "./lib/services/school.service";
import { getSchoolTerminology } from "./lib/terminology";

export const onRequest = defineMiddleware(async (context, next) => {
  // Only fetch profile for page requests, not assets or API routes if any
  if (!context.url.pathname.includes('.')) {
    const profile = await SchoolService.getProfile();
    context.locals.schoolProfile = profile;
    context.locals.terminology = getSchoolTerminology(profile?.terminology);
  }
  
  return next();
});
