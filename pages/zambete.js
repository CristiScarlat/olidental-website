import Link from 'next/link';
import { smilesGallery } from '../utils/uiConstants';
import CustomCarousel from '../components/carousel';
import styles from '../styles/galery.module.css';
import ResultsDisclaimer from '../components/resultsDisclaimer';


const SlideGallery = () => {
  return (
    <div className={styles.smilesGalleryWrapper}>
      <h1 className='text-center pt-3'>Galerie zâmbete Olidental Clinic Timișoara</h1>
      <p className='text-center m-auto pb-2' style={{ maxWidth: '40rem', color: '#807f89' }}>
        O selecție de zâmbete transformate în urma tratamentelor realizate la Olidental Clinic
        Timișoara. Pentru detalii despre fiecare tip de tratament și cazuri documentate pas cu
        pas, vezi pagina de <Link href="/rezultate">rezultate</Link>.
      </p>
      <CustomCarousel>
        {smilesGallery.images.map((pic, index) => (
          <div key={pic}>
            <img
              src={`/images/services/${smilesGallery.dirPath}/${pic}`}
              alt={`Zâmbet transformat prin tratament stomatologic la Olidental Clinic Timișoara - fotografia ${index + 1}`}
              style={{ borderRadius: 10 }}
              loading={index < 2 ? undefined : 'lazy'}
            />
            {/* <CarouselLegendContent index={0} /> */}
          </div>
        ))}
      </CustomCarousel>
      <div className="p-3 text-center m-auto" style={{ maxWidth: '40rem' }}>
        <ResultsDisclaimer />
      </div>
    </div>
  );
};

SlideGallery.seo = {
  title: "Galerie zâmbete | Olidental Clinic Timișoara",
  description: "Galerie foto cu zâmbete transformate de echipa Olidental Clinic Timișoara în urma tratamentelor stomatologice.",
  canonical: "https://olidental.ro/zambete",
};

export default SlideGallery;