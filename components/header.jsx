import { useState } from 'react';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Logo from '../components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/styles.module.css';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" variant="light" className={styles['navbar-transparent']} expanded={expanded}>
        <Container fluid className="ps-3 pe-3">
          <Navbar.Brand className="mt-2 mb-2" onClick={() => router.push("/")} style={{cursor: "pointer"}}>
            <Logo/>
          </Navbar.Brand>
          <Navbar.Toggle id="toggle" onClick={() => setExpanded(state => !state)} as={"button"}/>
          <Navbar.Collapse id="navbarScroll" style={{ flexGrow: 0 }}>
            <Nav className="me-auto my-2 my-lg-0" onClick={() => setExpanded(false)}>
              <div id="navbarSupportedContent">
                <ul className="d-flex justify-content-start  navbar-nav gap-4 me-auto mb-2 mb-lg-0 w-100 fw-bold">
                  <li className="nav-item ms-auto li-link">
                    <Link href="/">
                      <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/' ? 'active' : ''}`}>Servicii</a>
                    </Link>
                  </li>
                  <li className="nav-item ms-auto li-link">
                    <Link href="/rezultate">
                      <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/services' ? 'active' : ''}`}>Rezultate</a>
                    </Link>
                  </li>
                  {/*<li className="nav-item ms-auto li-link">*/}
                  {/*  <Link href="/smiles-gallery">*/}
                  {/*    <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/smiles-gallery' ? 'active' : ''}`}>Zâmbete</a>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                  <li className="nav-item ms-auto li-link">
                    <Link href="/smiles-slide-gallery">
                      <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/smiles-slide-gallery' ? 'active' : ''}`}>Zâmbete</a>
                    </Link>
                  </li>
                  <li className="nav-item ms-auto li-link">
                    <Link href="/team">
                      <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/about' ? 'active' : ''}`}>Echipa</a>
                    </Link>
                  </li>
                  <li className="nav-item ms-auto li-link">
                    <Link href="/contact">
                      <a className={`${styles['header-custom-link']}  text-uppercase ${router.pathname === '/contact' ? 'active' : ''}`}>Contact</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
