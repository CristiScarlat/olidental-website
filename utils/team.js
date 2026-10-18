import { teamCards } from './uiConstants';
import { DOCTOR_PROFILES } from './doctorProfiles';

export const TEAM_PAGE_PATH = '/echipa';

/** URL-safe slug for a team member, e.g. "Dr. Diana Rada Bârsan" ->
 * "diana-rada-barsan". /echipa uses it as each member's anchor and the
 * doctors with their own page live at /echipa/<slug>. */
export function personSlug(member) {
  return member.title
    .replace(/^(Dr|As)\.\s*/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Extra content for a doctor with their own page (utils/doctorProfiles.js), or null. */
export function getDoctorProfile(member) {
  return (member && DOCTOR_PROFILES[member.title]) || null;
}

/** The doctor's own page if they have one, otherwise their block on /echipa. */
export function teamMemberPath(member) {
  const slug = personSlug(member);
  return getDoctorProfile(member) ? `${TEAM_PAGE_PATH}/${slug}` : `${TEAM_PAGE_PATH}#${slug}`;
}

export function getTeamMemberBySlug(slug) {
  return teamCards.find((member) => personSlug(member) === slug) || null;
}

/** The team member whose own page `pathname` is (/echipa/<slug>), or null. */
export function getProfileMemberForPath(pathname) {
  const prefix = `${TEAM_PAGE_PATH}/`;
  if (typeof pathname !== 'string' || !pathname.startsWith(prefix)) {
    return null;
  }
  const member = getTeamMemberBySlug(pathname.slice(prefix.length));
  return getDoctorProfile(member) ? member : null;
}

export function isDoctor(member) {
  return /^Dr\./.test(member.title);
}

/** First paragraph of a `teamCards` bio as plain text (the bios are stored
 * as HTML with inline spacing hacks meant for /echipa). */
export function bioText(member) {
  return (member.body || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
