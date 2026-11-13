import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from './iconLink';
import { TARIFE_LINK_HREF, TARIFE_LINK_LABEL } from '../utils/tarifeLink';

// Link to the price list, shown at the end of every treatment page next to
// the "Vezi rezultate reale..." links.
const TarifeLink = () => (
  <div className="mt-3">
    <IconLink label={TARIFE_LINK_LABEL} href={TARIFE_LINK_HREF}>
      <TfiHandPointLeft size="1.5rem" color="#2d8044" style={{ cursor: 'pointer', transform: 'scaleX(-1)' }} />
    </IconLink>
  </div>
);

export default TarifeLink;
