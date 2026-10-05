import Link from 'next/link';
import styles from './styles/serviceHubCards.module.css';

// Cards for the /servicii hub: each service with its summary and treatment
// links inside the card. The text is rendered directly (not through an effect
// like CustomCard's `body`) so it is present in the static HTML.
const ServiceHubCards = ({ services, summaries }) => (
  <div className="services-one pt-3 pb-3 mt-3 mb-3">
    <div className="container">
      <div className={styles.grid}>
        {services.map((service) => (
          <article key={service.id} className={styles.card}>
            <div className={styles.iconWrap}>
              <img src={service.logo} alt="" />
            </div>
            <h2 className={styles.title}>
              <Link href={service.link} className={styles.titleLink}>{service.title}</Link>
            </h2>
            {summaries[service.link] && <p className={styles.summary}>{summaries[service.link]}</p>}
            <ul className={styles.procedures}>
              {(service.procedures || []).map((procedure) => (
                <li key={procedure.link}>
                  <Link href={procedure.link}>{procedure.title}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceHubCards;
