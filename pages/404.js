const NotFoundPage = () => {
  return (
    <div className="text-center p-5">
      <h1>Pagina nu a fost găsită</h1>
      <p>Ne pare rău, pagina căutată nu există.</p>
    </div>
  );
};

NotFoundPage.seo = {
  title: "Pagina nu a fost găsită | Olidental Clinic Timișoara",
  description: "Pagina căutată nu a fost găsită pe site-ul Olidental Clinic Timișoara.",
  canonical: "https://olidental.ro/404",
  noindex: true,
};

export default NotFoundPage;
