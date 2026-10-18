import DoctorProfile from '../../components/team/DoctorProfile';
import { getTeamMemberBySlug } from '../../utils/team';
import { buildDoctorSeo } from '../../utils/doctorSeo';

const doctor = getTeamMemberBySlug('paula-derban');

const DrPaulaDerban = () => <DoctorProfile member={doctor} />;

DrPaulaDerban.seo = buildDoctorSeo(doctor);

export default DrPaulaDerban;
