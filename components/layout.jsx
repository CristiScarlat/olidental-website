import React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
//import CookieConsent from "react-cookie-consent";
import TopBar from "./topBar";
import CookieConsentBanner from './cookieConsent';

const cookieConstentStyle = {
  bottom: "40px",
  alignItems: "baseline",
  background: "rgb(53, 53, 53)",
  color: "white",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  left: "0px",
  position: "fixed",
  width: "100%",
  zIndex: 10000,
  padding: "0.5rem",
};

const cookieConstentButtonStyle = {
  background: "rgb(255, 212, 45)",
  border: "0px",
  borderRadius: "0px",
  color: "black",
  cursor: "pointer",
  flex: "0 0 auto",
  padding: "5px 10px",
};

const Layout = ({ children }) => {
  
  return (
    <>
      <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="profile" href="http://gmpg.org/xfn/11"/>
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"/>

          <title>Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara</title>
          <link rel="icon" href="/favicons/cropped-favicon-32x32.png" sizes="32x32"/>
          <link rel="icon" href="/favicons/cropped-favicon-192x192.png" sizes="192x192"/>
          <link rel="apple-touch-icon" href="/favicons/cropped-favicon-180x180.png"/>
          <meta name="msapplication-TileImage" content="/favicons/cropped-favicon-270x270.png"/>
          <meta name="description"
                        content="Olidental Clinic Timișoara oferă servicii stomatologice premium, doctorii clinicii având specialități și competențe pentru o gamă curpinzătoare de tratamente dentare."/>
          <link rel="canonical" href="https://olidental.ro"/>
          <meta property="og:locale" content="ro_RO"/>
          <meta property="og:type" content="website"/>
          <meta property="og:title" content="Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara"/>
          <meta property="og:description" content="Olidental Clinic Timișoara oferă servicii stomatologice premium, doctorii clinicii având specialități și competențe pentru o gamă curpinzătoare de tratamente dentare."/>
          <meta property="og:url" content="https://olidental.ro"/>
          <meta property="og:site_name" content="Oli Dental Clinic Timișoara - Implant dentar Timișoara"/>
          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="google-site-verification" content="ZVnPRWdYCBKwPcZw_fc719GdddRhNEy8wIiq5abL6hM" />
      </Head>

      <Header />
      <main  className="content">{children}</main>
      {/*<TopBar />*/}
      <Footer />
      <CookieConsentBanner />
    </>
  );
};

export default Layout;
