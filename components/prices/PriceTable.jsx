import styles from '../../styles/tarife.module.css';
import { formatAmount } from '../../utils/tarife/format';

/**
 * The price as the clinic writes it ("de la 550 €/implant", "65–110 €/dinte"),
 * with the figure in the heading font and "de la", "€" and the unit smaller.
 */
const PriceText = ({ row }) => (
  <>
    {row.from && <span className={styles.priceAffix}>de la </span>}
    <span className={styles.price}>{formatAmount(row)}</span>
    <span className={styles.priceAffix}> €</span>
    {row.unit && <span className={styles.unit}>/{row.unit}</span>}
  </>
);

// Explicit roles keep the table semantics when phones restyle the rows as a list.
const PriceRow = ({ row }) => (
  <tr role="row" className={styles.row}>
    <th scope="row" role="rowheader" className={styles.serviceCell}>
      <span className={styles.serviceLine}>
        <span className={styles.serviceName}>{row.name}</span>
        <span className={styles.leader} aria-hidden="true" />
      </span>
    </th>
    <td role="cell" className={styles.priceCell}>
      <PriceText row={row} />
    </td>
  </tr>
);

/** The service and price rows of one group, with the group name as the table caption. */
const PriceTable = ({ group }) => (
  <table role="table" className={styles.table}>
    <caption className={styles.srOnly}>{`Tarife pentru ${group.name}`}</caption>
    <thead role="rowgroup" className={styles.tableHead}>
      <tr role="row">
        <th scope="col" role="columnheader">
          Serviciu
        </th>
        <th scope="col" role="columnheader" className={styles.priceHeader}>
          Tarif
        </th>
      </tr>
    </thead>
    <tbody role="rowgroup">
      {group.rows.map((row) => (
        <PriceRow key={row.id} row={row} />
      ))}
    </tbody>
  </table>
);

export default PriceTable;
