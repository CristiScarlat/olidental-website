const Services = () => {
  return (
    <div className="services-one">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="service-sec">
              <div className="icon">
                <img src="/images/logos/zambet.png.webp" alt="..." style={{position: "relative", top: 3, width: 90}} />
              </div>

              <div className="detail">
                <h5>Estetica zâmbetului</h5>
                <p>Un zâmbet impecabil, cu aspect natural, armonizat cu trăsăturile feței pacientului se poate obține prin proceduri cosmetice specifice: albirea dinților, fațete si coroane dentare, implanturi și tratamente ortodontice. </p>
              </div>
            </div>
          </div>

          {/* <div className="col-md-6">
            <div className="service-sec">
              <div className="icon">
                <i className="icon-ambulanc"></i>
              </div>

              <div className="detail">
                <h5>Emergency Services</h5>
                <p>If you need a doctor for to consectetuer Lorem ipsum dolor, consectetur adipiscing elit Lorem ipsum dolor, consectetur Ut volutpat eros.</p>
              </div>
            </div>
          </div> */}

          <div className="col-md-4">
            <div className="service-sec">
              <div className="icon">
              <img src="/images/logos/implant.png.webp" alt="..." style={{position: "relative", top: 2, width: 90}}/>
              </div>

              <div className="detail">
                <h5>Implantologie orală</h5>
                <p>Implantologia orală reprezintă, de obicei, soluția ideală pentru înlocuirea dinților lipsă în cazul în care pacientul este un candidat valabil pentru implanturi dentare – lipsa dinților ducând la instabilitatea dinților existenți…</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="service-sec">
              <div className="icon">
              <img src="/images/logos/reabilitari.png.webp" alt="..." style={{position: "relative", left: 6, top: 3, width: 90}}/>
              </div>

              <div className="detail">
                <h5>Reabilitări orale complexe</h5>
                <p>Cazurile de reabilitare orală complexă sunt o provocare pentru echipa Olidental Clinic. În funcție de nevoile pacientului, reabilitările orale complexe presupun un cumul de tratamente stomatologice menite să redea frumusețea …</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
