import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from './iconLink';

// "Înapoi la …" link at the top of a treatment page. Its own <nav> tells text
// extractors (trafilatura, AI crawlers) it is navigation, so they stop
// dropping the H1 next to it as boilerplate. The layout already renders the
// full breadcrumb trail (components/breadcrumbs.jsx), so this landmark gets a
// different label instead of a second "breadcrumb".
const BackLink = ({ label, href }) => (
  <nav aria-label="Înapoi">
    <IconLink label={label} href={href}>
      <TfiHandPointLeft size='2rem' color='#6cab44' style={{ cursor: 'pointer' }}/>
    </IconLink>
  </nav>
);

export default BackLink;
