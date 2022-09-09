const Testimonials = () => {
  return (
    <div className="patients-testi dark-testi">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="main-title main-title2">
              <h2>
                <span>What Our Patients Say</span> About Us
              </h2>
            </div>
          </div>
        </div>

        <div id="testimonials">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="span12">
                  <div id="owl-demo2" className="owl-carousel">
                    <div className="testi-sec">
                      <img src="images/testimonial-img1.jpg" alt="" />
                      <div className="height10"></div>
                      <span className="name">Elebana Front</span>
                      <span className="patient">Heart Patient</span>
                      <div className="height30"></div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat. vitae felis pretium, euismod ipsum nec, placerat turpis. Aenean eu gravida arcu, et consectetur orci Quisque posuere dolor in
                        malesuada fermentum.
                      </p>{' '}
                      <div className="height35"></div>
                    </div>
                    <div className="testi-sec">
                      <img src="images/testimonial-img2.jpg" alt="" />
                      <div className="height10"></div>
                      <span className="name">Johny Bravo</span>
                      <span className="patient">Hair Patient</span>
                      <div className="height30"></div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat. vitae felis pretium, euismod ipsum nec, placerat turpis. Aenean eu gravida arcu, et consectetur Quisque posuere dolor in
                        malesuada fermentum sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                      </p>
                    </div>
                    <div className="testi-sec">
                      <img src="images/testimonial-img3.jpg" alt="" />
                      <div className="height10"></div>
                      <span className="name">Rubica Noi</span>
                      <span className="patient">Skin Patient</span>
                      <div className="height30"></div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
                        volutpat. vitae felis pretium, euismod ipsum nec, placerat turpis. Aenean eu gravida arcu, et consectetur orci Quisque posuere dolor in
                        malesuada fermentum.
                      </p>{' '}
                      <div className="height35"></div>
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

export default Testimonials;
