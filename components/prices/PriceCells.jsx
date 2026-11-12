import styles from '../../styles/tarifeList.module.css';
import { formatNumber } from '../../utils/tarife/format';

export const Unit = ({ unit }) => (unit ? <span className={styles.unit}> / {unit}</span> : null);

/** Lei, the price of reference: the figure in Fraunces, "De la" and "lei" smaller. */
export const LeiCell = ({ row }) => (
  <td role="cell" className={styles.leiCell}>
    <span className={styles.price}>
      {row.prefix && <span className={styles.priceAffix}>{row.prefix} </span>}
      {formatNumber(row.lei)}
      <span className={styles.priceAffix}> lei</span>
    </span>
    <Unit unit={row.unit} />
  </td>
);

/** Euro, the secondary column: smaller and muted. */
export const EuroCell = ({ row }) => (
  <td role="cell" className={styles.euroCell}>
    {row.prefix && <span>{row.prefix} </span>}
    {formatNumber(row.eur)} €
    <Unit unit={row.unit} />
  </td>
);
