import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import Logo from '../components/Logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './styles/styles.module.css';

const Header = () => {
  const router = useRouter();
  return (
    // <header className="header">
    //   <div className="container">
    //     <div className="row">
    //       <div className="col-md-3">
    //         <a href="index.html" className="logo">
    //           <img src="images/logo-olidental-clinic.webp" alt="" />
    //         </a>
    //       </div>

    //       <div className="col-md-9">
    //         <nav className="menu-2">
    //           <ul className="nav wtf-menu">
    //             <li className="item-select parent">
    //               <a href="#.">Home</a>
    //               <ul className="submenu">
    //                 <li className="select-menu">
    //                   {" "}
    //                   <a href="index.html">Home Page 1</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="index2.html">Home Page 2</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="index3.html">Home Page 3</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="index4.html">Home Page 4</a>{" "}
    //                 </li>
    //               </ul>
    //             </li>

    //             <li className="parent">
    //               <a href="#.">About Us</a>
    //               <ul className="submenu">
    //                 <li>
    //                   {" "}
    //                   <a href="about-us.html">About Us</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="about-us2.html">About Us 2</a>{" "}
    //                 </li>
    //               </ul>
    //             </li>

    //             <li className="parent">
    //               <a href="#.">Pages</a>
    //               <ul className="submenu">
    //                 <li>
    //                   {" "}
    //                   <a href="services.html">Services</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="services2.html">Services Two</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="appointment.html">Appointment</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="departments.html">Departments</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="patient-and-family.html">
    //                     Patient and Family
    //                   </a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="team-members.html">Team Members One</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="team-members2.html">Team Members Two</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="research.html">Research</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="tables.html">Pricing tabels</a>{" "}
    //                 </li>
    //               </ul>
    //             </li>

    //             <li>
    //               <a href="procedures.html">Procedures</a>
    //             </li>

    //             <li className="parent">
    //               <a href="#.">Gallery</a>

    //               <ul className="submenu">
    //                 <li className="parent">
    //                   {" "}
    //                   <a href="#">Simple Gallery</a>{" "}
    //                   <i className="icon-chevron-small-right"></i>
    //                   <ul className="submenu">
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-simple-two.html">Columns Two</a>{" "}
    //                     </li>
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-simple-three.html">
    //                         Columns Three
    //                       </a>{" "}
    //                     </li>
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-simple-four.html">
    //                         Columns Four
    //                       </a>{" "}
    //                     </li>
    //                   </ul>
    //                 </li>

    //                 <li className="parent">
    //                   {" "}
    //                   <a href="#">Nimble Gallery</a>{" "}
    //                   <i className="icon-chevron-small-right"></i>
    //                   <ul className="submenu">
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-nimble-two.html">Columns Two</a>{" "}
    //                     </li>
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-nimble-three.html">
    //                         Columns Three
    //                       </a>{" "}
    //                     </li>
    //                     <li>
    //                       {" "}
    //                       <a href="gallery-nimble-four.html">
    //                         Columns Four
    //                       </a>{" "}
    //                     </li>
    //                   </ul>
    //                 </li>
    //               </ul>
    //             </li>

    //             <li className="parent">
    //               <a href="#.">News</a>
    //               <ul className="submenu">
    //                 <li>
    //                   {" "}
    //                   <a href="news-sidebar.html">Sidebar</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="news-text.html">Text-Based</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="news-single.html">Single Post</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="news-double.html">Double Post</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="news-masonary.html">Masonary</a>{" "}
    //                 </li>
    //               </ul>
    //             </li>

    //             <li>
    //               <a href="shop.html">Shop</a>
    //             </li>

    //             <li className="parent">
    //               <a href="#.">Contact Us</a>
    //               <ul className="submenu">
    //                 <li>
    //                   {" "}
    //                   <a href="contact-us.html">Contact-Us One</a>{" "}
    //                 </li>
    //                 <li>
    //                   {" "}
    //                   <a href="contact-us2.html">Contact-Us Two</a>{" "}
    //                 </li>
    //               </ul>
    //             </li>
    //           </ul>
    //         </nav>
    //       </div>
    //     </div>
    //   </div>
    // </header>
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
                            <Link href="/services"><a className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/services' ? 'active' : ''}`}>Servicii</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="/about"><a className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/about' ? 'active' : ''}`}>Echipa</a></Link>
                        </li>
                        <li className="nav-item me-4 li-link">
                            <Link href="/contact"><a className={`${styles["header-custom-link"]}  text-uppercase ${router.pathname === '/contact' ? 'active' : ''}`}>Contact</a></Link>
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
