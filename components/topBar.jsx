import { BsTelephoneFill } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { ImFacebook, ImTwitter, ImInstagram } from 'react-icons/im';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="container">
        <div className="d-flex justify-content-end">
          <div className="get-touch">
            <ul className="m-0">
              <li>
                <a>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BsTelephoneFill />
                    0733 023 030
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/OlidentalClinic/" className="fb">
                  <ImFacebook />{' '}
                </a>
              </li>
              {/* <li>
                <a href="#." className="tw">
                  <ImTwitter />{' '}
                </a>
              </li> */}
              <li>
                <a href="https://www.instagram.com/olidental.clinic/" className="gp">
                  <ImInstagram />{' '}
                </a>
              </li>
            </ul>

            {/* <ul className="social-icons m-0">
              <li>
                <a href="#." className="fb">
                  <ImFacebook />{' '}
                </a>
              </li>
              <li>
                <a href="#." className="tw">
                  <ImTwitter />{' '}
                </a>
              </li>
              <li>
                <a href="#." className="gp">
                  <ImInstagram />{' '}
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
