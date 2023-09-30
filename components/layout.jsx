import React from "react";
import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
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
      <Head>
        <meta charSet="utf-8" />
        <title>Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara</title>
        <link rel="canonical" href="https://www.olidental.ro/" />

        {/*HTML Meta Tags*/}
        <meta
          name="description"
          content="Echipa noastră de medici experți este pregătită să răspundă celor mai dificile provocări de la pacienții noștri."

        />
        {/*Facebook Meta Tags*/}
        <meta property="og:url" content="https://www.olidental.ro" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="dental clinic" />
        <meta
          property="og:description"
          content="Echipa noastră de medici experți este pregătită să răspundă celor mai dificile provocări de la pacienții noștri."
        />
        <meta
          property="og:image"
          content='/Photo-431.jpg'
        />
        {/*Twitter Meta Tags*/}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="olidental.ro" />
        <meta
          property="twitter:url"
          content="https://www.olidental.ro"
        />
        <meta name="twitter:title" content="Oil on canvas" />
        <meta
          name="twitter:description"
          content="Echipa noastră de medici experți este pregătită să răspundă celor mai dificile provocări de la pacienții noștri."
        />
        <meta
          name="twitter:image"
          content='/Photo-431.jpg'
        />
      </Head>

      <Header />
      <main  className="content">{children}</main>
      <TopBar />
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
      {/*<Footer />*/}
    </>
  );
};

export default Layout;
