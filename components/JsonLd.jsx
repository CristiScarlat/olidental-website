import Head from 'next/head';

/**
 * Renders one or more schema.org objects as `<script type="application/ld+json">`
 * tags inside `next/head`. Accepts a single schema object or an array of them.
 */
const JsonLd = ({ schema }) => {
  if (!schema) {
    return null;
  }

  const schemaList = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);

  if (schemaList.length === 0) {
    return null;
  }

  return (
    <Head>
      {schemaList.map((schemaItem, index) => {
        const typeLabel = typeof schemaItem['@type'] === 'string' ? schemaItem['@type'] : 'schema';
        // dangerouslySetInnerHTML is required here: rendering JSON.stringify(...) as a
        // normal JSX child HTML-escapes quotes (" -> &quot;), which corrupts the JSON.
        // Escaping "<" guards against a stray "</script>" breaking out of the tag.
        const json = JSON.stringify(schemaItem).replace(/</g, '\\u003c');
        return (
          <script
            key={`jsonld-${index}-${typeLabel}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: json }}
          />
        );
      })}
    </Head>
  );
};

export default JsonLd;
