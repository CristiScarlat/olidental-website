import Link from 'next/link';
import styles from '../../styles/doctorProfile.module.css';
import { SERVICE_PAGE_LINKS } from '../../utils/doctorProfiles';
import { bioText } from '../../utils/team';

const EXTERNAL_LINK = { target: '_blank', rel: 'noopener noreferrer' };

// Read out after a link that opens in a new tab.
export const NewTabHint = () => <span className="visually-hidden"> (se deschide într-o filă nouă)</span>;

// One item of a list, linked to its public source when it has one.
const SourcedText = ({ item }) =>
  item.href ? (
    <a href={item.href} {...EXTERNAL_LINK}>
      {item.text}
      <NewTabHint />
    </a>
  ) : (
    item.text
  );

// The bio exactly as on /echipa (utils/uiConstants.js), plus the quote it contains.
export const AboutSection = ({ member, profile }) => (
  <section className={styles.card} aria-labelledby="despre">
    <h2 id="despre">Despre {profile.shortName}</h2>
    <p className={styles.bio}>{bioText(member)}</p>
    {profile.quote && (
      <blockquote className={styles.quote}>
        <p>„{profile.quote}”</p>
      </blockquote>
    )}
  </section>
);

// Specializations as listed on /echipa, then the public academic record.
export const TrainingSection = ({ member, profile }) => {
  const specializations = (member.specializations || []).map((item) => item.trim()).filter(Boolean);
  const academic = profile.academic || [];
  if (specializations.length === 0 && academic.length === 0) {
    return null;
  }

  return (
    <section className={styles.card} aria-labelledby="pregatire">
      <h2 id="pregatire">Pregătire profesională</h2>
      {specializations.length > 0 && (
        <>
          <h3>Titlu profesional</h3>
          <ul className={styles.checklist}>
            {specializations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      )}
      {academic.length > 0 && (
        <>
          <h3>{profile.academicTitle}</h3>
          <ul className={styles.checklist}>
            {academic.map((item) => (
              <li key={item.text}>
                <SourcedText item={item} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

const PublicationList = ({ items }) => (
  <ul className={styles.publications}>
    {items.map((item) => (
      <li key={item.title} className={styles.publication}>
        <p className={styles.publicationTitle}>
          {item.href ? (
            <a href={item.href} {...EXTERNAL_LINK}>
              {item.title}
              <NewTabHint />
            </a>
          ) : (
            <cite>{item.title}</cite>
          )}
        </p>
        <p className={styles.publicationDetails}>{item.details}</p>
      </li>
    ))}
  </ul>
);

export const PublicationsSection = ({ profile }) => {
  const books = profile.books || [];
  const articles = profile.articles || [];
  if (books.length === 0 && articles.length === 0) {
    return null;
  }

  return (
    <section className={styles.card} aria-labelledby="publicatii">
      <h2 id="publicatii">Publicații</h2>
      {books.length > 0 && (
        <>
          <h3>Cărți de specialitate</h3>
          <PublicationList items={books} />
        </>
      )}
      {articles.length > 0 && (
        <>
          <h3>Articole științifice</h3>
          <PublicationList items={articles} />
        </>
      )}
    </section>
  );
};

export const ConferencesSection = ({ profile }) =>
  profile.conferences?.length > 0 ? (
    <section className={styles.card} aria-labelledby="cursuri-congrese">
      <h2 id="cursuri-congrese">{profile.conferencesTitle}</h2>
      <ul className={styles.checklist}>
        {profile.conferences.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  ) : null;

// The services listed on /echipa, linked to their treatment page when one exists.
export const TreatmentsSection = ({ member, profile }) => {
  const treatments = (member.services || []).map((item) => item.trim()).filter(Boolean);
  if (treatments.length === 0) {
    return null;
  }

  return (
    <section className={styles.card} aria-labelledby="tratamente">
      <h2 id="tratamente">Tratamente cu {profile.shortName}</h2>
      <ul className={styles.treatments}>
        {treatments.map((name) => {
          const href = SERVICE_PAGE_LINKS[name];
          return (
            <li key={name}>
              {href ? (
                <Link href={href} className={styles.treatment}>
                  {name}
                  <span className={styles.treatmentArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : (
                <span className={styles.treatment}>{name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
