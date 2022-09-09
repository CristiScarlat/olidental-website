const LatestNews = () => {
  return (
    <div className="latest-news dark-back">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title">
              <h2>
                <span>Latest News from</span> Medical guide
              </h2>
              <p>If you need a doctor for to consectetuer Lorem ipsum dolor, consectetur adipiscing elit. Ut volutpat eros adipiscing nonummy.</p>
            </div>
          </div>
        </div>

        <div id="latest-news">
          <div className="container">
            <div className="row">
              <div className="span12">
                <div id="owl-demo" className="owl-carousel">
                  <div className="post item">
                    <img className="lazyOwl" src="images/news-img1.jpg" alt="" />
                    <div className="detail">
                      <img src="images/news-dr1.jpg" alt="" />
                      <h4>
                        <a href="news-detail.html">Center for Medical</a>
                      </h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit eros...</p>
                      <span>
                        <i className="icon-clock3"></i> Apr 22, 2016
                      </span>
                      <span className="comment">
                        <a href="news-detail.html">
                          <i className="icon-icons206"></i> 5 Comments
                        </a>
                      </span>
                    </div>
                  </div>
                  <div className="post item">
                    <img className="lazyOwl" src="images/news-img2.jpg" alt="" />
                    <div className="detail">
                      <img src="images/news-dr2.jpg" alt="" />
                      <h4>
                        <a href="news-detail.html">Laboratory Tests</a>
                      </h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit eros...</p>
                      <span>
                        <i className="icon-clock3"></i> Apr 09, 2016
                      </span>
                      <span className="comment">
                        <a href="news-detail.html">
                          <i className="icon-icons206"></i> 3 Comments
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="post item">
                    <img className="lazyOwl" src="images/news-img3.jpg" alt="" />
                    <div className="detail">
                      <img src="images/news-dr1.jpg" alt="" />
                      <h4>
                        <a href="news-detail.html">Research Center</a>
                      </h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit eros...</p>
                      <span>
                        <i className="icon-clock3"></i> Mar 28, 2016
                      </span>
                      <span className="comment">
                        <a href="news-detail.html">
                          <i className="icon-icons206"></i> 0 Comments
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="post item">
                    <img className="lazyOwl" src="images/news-img4.jpg" alt="" />
                    <div className="detail">
                      <img src="images/news-dr2.jpg" alt="" />
                      <h4>
                        <a href="news-detail.html">Child Birth</a>
                      </h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit eros...</p>
                      <span>
                        <i className="icon-clock3"></i> Mar 15, 2016
                      </span>
                      <span className="comment">
                        <a href="news-detail.html">
                          <i className="icon-icons206"></i> 0 Comments
                        </a>
                      </span>
                    </div>
                  </div>

                  <div className="post item">
                    <img className="lazyOwl" src="images/news-img5.jpg" alt="" />
                    <div className="detail">
                      <img src="images/news-dr2.jpg" alt="" />
                      <h4>
                        <a href="news-detail.html">Special Treatment</a>
                      </h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit eros...</p>
                      <span>
                        <i className="icon-clock3"></i> Mar 04, 2016
                      </span>
                      <span className="comment">
                        <a href="news-detail.html">
                          <i className="icon-icons206"></i> 11 Comments
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;