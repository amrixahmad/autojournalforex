import React from 'react'

const About_Video = () => {
  return (
    // About Video Section
    <section id="about-video" className="about-video">
      <div className="container" data-aos="fade-up">

        <div className="row">

          <div className="col-lg-6 video-box align-self-baseline" data-aos="fade-right" data-aos-delay="100">
            <img src="assets/img/about-video.jpg" className="img-fluid" alt=""/>
            <a href="https://www.youtube.com/watch?v=jDDaplaOz7Q" className="glightbox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
          </div>

          <div className="col-lg-6 pt-3 pt-lg-0 content" data-aos="fade-left" data-aos-delay="100">
            <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <ul>
              <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat.</li>
              <li><i className="bx bx-check-double"></i> Duis aute irure dolor in reprehenderit in voluptate velit.</li>
              <li><i className="bx bx-check-double"></i> Voluptate repellendus pariatur reprehenderit corporis sint.</li>
              <li><i className="bx bx-check-double"></i> Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</li>
            </ul>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default About_Video