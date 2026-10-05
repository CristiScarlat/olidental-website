import Link from 'next/link';

/**
 * Visible breadcrumb trail. `items` is a list of { label, href }; the last
 * item is rendered as the current page (no link).
 */
const Breadcrumbs = ({ items }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb" className="site-breadcrumbs">
      <ol>
        {items.map((item, index) => {
          const isCurrentPage = index === items.length - 1;
          const key = item.href || `${item.label}-${index}`;

          return (
            <li key={key}>
              {isCurrentPage || !item.href ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>

      <style jsx>{`
        .site-breadcrumbs {
          width: 100%;
          padding: 0.85rem 0;
        }

        .site-breadcrumbs ol {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
          font-size: 0.85rem;
          color: #807f89;
        }

        .site-breadcrumbs li {
          display: flex;
          align-items: center;
        }

        .site-breadcrumbs li:not(:last-child)::after {
          content: '/';
          margin: 0 0.5rem;
          color: #c2c2c2;
        }

        .site-breadcrumbs :global(a) {
          color: #807f89;
          text-decoration: none;
        }

        .site-breadcrumbs :global(a:hover) {
          color: #4caf50;
          text-decoration: underline;
        }

        .site-breadcrumbs span[aria-current='page'] {
          color: #353535;
          font-weight: 600;
        }
      `}</style>
    </nav>
  );
};

export default Breadcrumbs;
