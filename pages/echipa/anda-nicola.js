import DoctorProfile from '../../components/team/DoctorProfile';
import { getTeamMemberBySlug } from '../../utils/team';
import { buildDoctorSeo } from '../../utils/doctorSeo';

const doctor = getTeamMemberBySlug('anda-nicola');

const DrAndaNicola = () => <DoctorProfile member={doctor} />;

DrAndaNicola.seo = buildDoctorSeo(doctor);

export default DrAndaNicola;
