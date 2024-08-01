import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation'

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  const router = useRouter()

  useEffect(() => {
    const consentCookie = cookie.get("cookieConsent");

    if (!consentCookie) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "accepted", { expires: 365 });
  };

  const handleReject = () => {
    setShowBanner(false);
    cookie.set("cookieConsent", "rejected", { expires: 365 });
  };

  const redirectToReadMore = () => {
    router.push('/politica-cookies')
  }

  if (!showBanner) {
    return null;
  }

  return (
    <div style={{
      bottom: "10px",
      backgroundColor: "#082d3f",
      width: "100%",
      position: "fixed",
      color: "white",
      padding: '0.5rem 2rem'
    }}>
      <p>Acest website folosește cookies pentru a ne asigura că beneficiezi de cea mai bună experiență.</p>
      <p>Presupunem că ești de acord cu acest lucru, dar dacă nu, poți oricând modifica setările - vezi <a>Politica de utilizare a lor.</a> </p>
      <div className="d-flex gap-3 mt-3">
        <Button onClick={handleAccept} variant="outline-success">Acceptă</Button>
        <Button onClick={handleReject} variant="outline-danger">Respinge</Button>
        <Button onClick={redirectToReadMore} variant="outline-secondary">Află mai mult</Button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;