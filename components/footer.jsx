const Footer = () => {
  <footer className="footer" id="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="emergency">
            <i className="icon-phone5"></i>
            <span className="text">For emergency cases</span>
            <span className="number">1-300-400-8211</span>
            <img src="images/emergency-divider.png" alt="" />
          </div>
        </div>
      </div>

      <div className="main-footer">
        <div className="row">
          <div className="col-md-3">
            <div className="useful-links">
              <div className="title">
                <h5>Medical guide</h5>
              </div>

              <div className="detail">
                <ul>
                  <li>
                    <a href="#.">Home</a>
                  </li>
                  <li>
                    <a href="#.">About Us</a>
                  </li>
                  <li>
                    <a href="#.">Services</a>
                  </li>
                  <li>
                    <a href="#.">Departments</a>
                  </li>
                  <li>
                    <a href="#.">Timetable</a>
                  </li>
                  <li>
                    <a href="#.">Why Us</a>
                  </li>
                  <li>
                    <a href="#.">Specilaties</a>
                  </li>
                  <li>
                    <a href="#.">Contact Us</a>
                  </li>
                  <li>
                    <a href="#.">Events</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="title">
              <h5>LATEST TWEETS</h5>
            </div>

            <div className="detail">
              <div className="tweets">
                <div className="icon">
                  <i className="icon-yen"></i>
                </div>

                <div className="text">
                  <p>
                    <a href="#.">@Rotography</a> Please kindly use Support Forum: <a href="#.">Medical.co.uk</a>
                  </p>
                  <span>3 days ago</span>
                </div>
              </div>

              <div className="tweets">
                <div className="icon">
                  <i className="icon-yen"></i>
                </div>

                <div className="text">
                  <p>
                    A quick launcher for WordPress dashboard <a href="#.">@Medical</a>
                  </p>
                  <span>about a week ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="newsletter">
              <div className="title">
                <h5>NEWSLETTER</h5>
              </div>

              <div className="detail">
                <div className="signup-text">
                  <i className="icon-dollar"></i>
                  <span>Sign up with your name and email to get updates fresh updates.</span>
                </div>

                <div className="form">
                  <p className="subscribe_success" id="subscribe_success" style="display:none;"></p>
                  <p className="subscribe_error" id="subscribe_error" style="display:none;"></p>

                  <form name="subscribe_form" id="subscribe_form" method="post" action="#" onSubmit="return false">
                    <input
                      type="text"
                      data-delay="300"
                      placeholder="Your Name"
                      name="subscribe_name"
                      id="subscribe_name"
                      onKeyPress="removeChecks();"
                      className="input"
                    />
                    <input
                      type="text"
                      data-delay="300"
                      placeholder="Email Address"
                      name="subscribe_email"
                      id="subscribe_email"
                      onKeyPress="removeChecks();"
                      className="input"
                    />
                    <input name="Subscribe" type="submit" value="Subscribe" onClick="validateSubscription();" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="get-touch">
              <div className="title">
                <h5>GET IN TOUCH</h5>
              </div>

              <div className="detail">
                <div className="get-touch">
                  <span className="text">Medical Bibendum auctor, to consequat ipsum, nec sagittis sem</span>

                  <ul>
                    <li>
                      <i className="icon-location"></i> <span>Medical Ltd, Manhattan 1258, New York, USA Lahore</span>
                    </li>
                    <li>
                      <i className="icon-phone4"></i> <span>(+1) 234 567 8901</span>
                    </li>
                    <li>
                      <a href="#.">
                        <i className="icon-dollar"></i> <span>hello@medical-guide.com</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <span className="copyrights">Copyright &copy; 2015 Medical Guide. All right reserved.</span>
          </div>

          <div className="col-md-6">
            <div className="social-icons">
              <a href="#." className="fb">
                <i className="icon-euro"></i>
              </a>
              <a href="#." className="tw">
                <i className="icon-yen"></i>
              </a>
              <a href="#." className="gp">
                <i className="icon-google-plus"></i>
              </a>
              <a href="#." className="vimeo">
                <i className="icon-vimeo4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>;
};

export default Footer;
