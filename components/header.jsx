import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Logo from '../components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/styles.module.css';

const Header = () => {
  const router = useRouter();
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" variant="light" className={styles["navbar-transparent"]}>
        <Container fluid className="ps-3 pe-3">
          <Navbar.Brand className="mt-2 mb-2"><Logo/></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{flexGrow: 0}}>
            <Nav className="me-auto my-2 my-lg-0">
               <div className="me-5" id="navbarSupportedContent">
                    <ul className="d-flex justify-content-end  navbar-nav gap-3 me-auto mb-2 mb-lg-0 w-100 fw-bold">
                        <li className="nav-item me-4 li-link">
                            <Link href="/"><a className={`${styles["header-custom-link"]} text-uppercase ${router.pathname === '/' ? 'active' : ''}`} aria-current="page">Acasă</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <a href="#services" className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/services' ? 'active' : ''}`}>Servicii</a>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="#team"><a className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/about' ? 'active' : ''}`}>Echipa</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="#contact"><a className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/contact' ? 'active' : ''}`}>Contact</a></Link>
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
