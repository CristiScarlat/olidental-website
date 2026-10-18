import DoctorProfile from '../../components/team/DoctorProfile';
import { getTeamMemberBySlug } from '../../utils/team';
import { buildDoctorSeo } from '../../utils/doctorSeo';

const doctor = getTeamMemberBySlug('olimpiu-ladislau-karancsi');

const DrOlimpiuKarancsi = () => <DoctorProfile member={doctor} />;

DrOlimpiuKarancsi.seo = buildDoctorSeo(doctor);

export default DrOlimpiuKarancsi;
