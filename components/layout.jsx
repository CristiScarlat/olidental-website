import React from "react";
import Header from "./header";
import Footer from "./footer";
import { Helmet } from "react-helmet";
//import CookieConsent from "react-cookie-consent";
import TopBar from "./topBar";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara</title>
        <link rel="canonical" href="https://www.oanabologbleich.com/" />

        {/*HTML Meta Tags*/}
        <meta
          name="description"
          content="Personal website of Phd artist Oana Blog-Bleich displaying Oil on canvas and mixed technics art items."
        />
        {/*Facebook Meta Tags*/}
        <meta property="og:url" content="https://www.oanabologbleich.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Oil on canvas" />
        <meta
          property="og:description"
          content="Personal website of Phd artist Oana Blog-Bleich displaying Oil on canvas and mixed technics art items."
        />
        <meta
          property="og:image"
          content='/albums/ilustrations/02.jpg'
        />
        {/*Twitter Meta Tags*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="oanabologbleich.com" />
        <meta
          property="twitter:url"
          content="https://www.oanabologbleich.com"
        />
        <meta name="twitter:title" content="Oil on canvas" />
        <meta
          name="twitter:description"
          content="Personal website of Phd artist Oana Blog-Bleich displaying Oil on canvas and mixed technics art items."
        />
        <meta
          name="twitter:image"
          content='/albums/ilustrations/02.jpg'
        />
      </Helmet>
      <TopBar />
      <Header />
      <main  className="content">{children}</main>
      {/* <CookieConsent
        location=""
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
        disableStyles={false}
        style={cookieConstentStyle}
        buttonStyle={cookieConstentButtonStyle}
      >
        This website uses cookies to enhance the user experience.{" "}
      </CookieConsent> */}
      <Footer />
    </>
  );
};

export default Layout;
