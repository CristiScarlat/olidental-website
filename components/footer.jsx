import Link from "next/link";
import { useRouter } from 'next/router';
import { ImFacebook, ImInstagram } from 'react-icons/im';
const Footer = () => {
  const { pathname } = useRouter();
  console.log(pathname)
  return (
    <footer className='footer' id='footer'>
      {pathname === "/" && <div className='container'>
        <div className='main-footer'>
          <div className='row'>
            <div className='col-6'>
              <div className='useful-links'>
                <div className='detail'>
                  <ul>
                    <li>
                      <Link href='/politica-confidentialitate'>politica de confidențialitate </Link>
                    </li>
                    <li>
                      <Link href='/politica-cookies'>politica de cookies </Link>
                    </li>
                    <li>
                      <a href='#.'>termeni și condiții  </a>
                    </li>
                    <li>
                      <a href='https://anpc.ro/' target="_blank">ANPC</a>
                    </li>
                    <li>
                      <a href='#.'>Politica de soluționare a litigiilor</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div className='detail'>
                <div className='tweets'>
                  <div className='text'>
                    <p>OLIDENTAL MED</p>
                  </div>
                </div>

                <div className='tweets'>
                  <div className='text'>
                    <p>Timisoara, str.Anisoara Odeanu nr.6, camera 2, jud. TIMIS</p>
                  </div>
                </div>

                <div className='tweets'>
                  <div className='text'>
                    <p>CIF RO35302885</p>
                  </div>
                </div>

                <div className='tweets'>
                  <div className='text'>
                    <p>RC J35/2982/2015</p>
                  </div>
                </div>

                <div className='tweets'>
                  <div className='text'>
                    <a href="https://www.facebook.com/OlidentalClinic/" className="fb me-3">
                      <ImFacebook />{' '}
                    </a>
                    <a href="https://www.instagram.com/olidental.clinic/" className="gp">
                      <ImInstagram />{' '}
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>}

      <div className='footer-bottom'>
          <span className='copyrights'>Copyright 2023 &copy; Olidental Clinic. Toate drepturile rezervate. </span>
      </div>
    </footer>
  );
};

export default Footer;
