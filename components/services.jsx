const Services = () => {
  return (
    <div className="services-one">
      <div className="container">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="service-sec">
              <div className="icon">
                <img src="/images/logos/zambet.png.webp" alt="..." style={{position: "relative", top: 3, width: 90}} />
              </div>

              <div className="detail">
                <h5>Estetica zâmbetului</h5>
                <p>Un zâmbet impecabil, cu aspect natural, armonizat cu trăsăturile feței pacientului se poate obține prin proceduri cosmetice specifice: albirea dinților, fațete si coroane dentare, implanturi și tratamente ortodontice. </p>
              </div>
            </div>
            <button className="read-more-button">Află mai mult</button>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-sec">
              <div className="icon">
              <img src="/images/logos/implant.png.webp" alt="..." style={{position: "relative", top: 2, width: 90}}/>
              </div>

              <div className="detail">
                <h5>Implantologie orală</h5>
                <p>Implantologia orală reprezintă, de obicei, soluția ideală pentru înlocuirea dinților lipsă în cazul în care pacientul este un candidat valabil pentru implanturi dentare – lipsa dinților ducând la instabilitatea dinților existenți…</p>
              </div>
            </div>
            <button className="read-more-button">Află mai mult</button>
          </div>

          <div className="col-md-4 text-center">
            <div className="service-sec">
              <div className="icon">
              <img src="/images/logos/reabilitari.png.webp" alt="..." style={{position: "relative", left: 6, top: 3, width: 90}}/>
              </div>

              <div className="detail">
                <h5>Reabilitări orale complexe</h5>
                <p>Cazurile de reabilitare orală complexă sunt o provocare pentru echipa Olidental Clinic. În funcție de nevoile pacientului, reabilitările orale complexe presupun un cumul de tratamente stomatologice menite să redea frumusețea …</p>
              </div>
            </div>
            <button className="read-more-button">Află mai mult</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
