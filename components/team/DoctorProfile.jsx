import styles from '../../styles/doctorProfile.module.css';
import FrauncesFont from '../FrauncesFont';
import DoctorHero from './DoctorHero';
import DoctorSide from './DoctorSide';
import OtherDoctors from './OtherDoctors';
import {
  AboutSection,
  TrainingSection,
  PublicationsSection,
  ConferencesSection,
  TreatmentsSection,
} from './DoctorSections';
import { getDoctorProfile } from '../../utils/team';

// Shared frame of every doctor's own page (pages/echipa/<slug>.js): hero,
// then the sections next to a side column with booking and public
// profiles, then the rest of the medical team.
const DoctorProfile = ({ member }) => {
  const profile = getDoctorProfile(member);
  if (!profile) {
    return null;
  }

  return (
    <article className={styles.page}>
      <FrauncesFont />
      <DoctorHero member={member} profile={profile} />
      <div className={styles.body}>
        <div className={styles.main}>
          <AboutSection member={member} profile={profile} />
          <TrainingSection member={member} profile={profile} />
          <PublicationsSection profile={profile} />
          <ConferencesSection profile={profile} />
          <TreatmentsSection member={member} profile={profile} />
        </div>
        <DoctorSide profile={profile} />
      </div>
      <OtherDoctors member={member} />
    </article>
  );
};

export default DoctorProfile;
