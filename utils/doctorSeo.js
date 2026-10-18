import { SITE_URL } from './schema';
import { getDoctorProfile, teamMemberPath } from './team';

/** The `.seo` of a doctor's own page (title and description written in
 * utils/doctorProfiles.js). */
export function buildDoctorSeo(member) {
  const profile = getDoctorProfile(member);
  return {
    title: profile.seo.title,
    description: profile.seo.description,
    canonical: `${SITE_URL}${teamMemberPath(member)}`,
  };
}
