import styles from '../../styles/preturiList.module.css';
import { EuroCell, LeiCell } from './PriceCells';

// Explicit roles keep the table semantics when phones restyle the rows as a list.
const PriceRow = ({ row, visible }) => (
  <tr role="row" className={styles.row} hidden={!visible}>
    <th scope="row" role="rowheader" className={styles.serviceCell}>
      <span className={styles.serviceLine}>
        <span className={styles.serviceName}>{row.name}</span>
        <span className={styles.leader} aria-hidden="true" />
      </span>
    </th>
    <LeiCell row={row} />
    <EuroCell row={row} />
  </tr>
);

/** A table block of a category: optional title and intro, the rows, optional note. */
const PriceTable = ({ block, caption, visibleIds }) => (
  <div className={styles.tableBlock}>
    {block.title && <h4 className={styles.blockTitle}>{block.title}</h4>}
    {block.intro && <p className={styles.blockIntro}>{block.intro}</p>}
    <table role="table" className={styles.table}>
      <caption className={styles.srOnly}>{caption}</caption>
      <thead role="rowgroup" className={styles.tableHead}>
        <tr role="row">
          <th scope="col" role="columnheader">
            Serviciu
          </th>
          <th scope="col" role="columnheader" className={styles.numHeader}>
            {block.priceHeader ?? 'Lei'}
          </th>
          <th scope="col" role="columnheader" className={styles.numHeader}>
            Euro
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {block.rows.map((row) => (
          <PriceRow key={row.id} row={row} visible={visibleIds.has(row.id)} />
        ))}
      </tbody>
    </table>
    {block.note && <p className={styles.blockNote}>{block.note}</p>}
  </div>
);

export default PriceTable;
