import React, { useEffect } from "react";
import "../components/home.css"; // Import your existing CSS

function Education() {
  // Add scroll animation effect similar to home page
  useEffect(() => {
    const handleScroll = () => {
      const educationSection = document.getElementById('education');
      if (!educationSection) return;

      const sectionTop = educationSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // When section is 50% visible
      if (sectionTop < windowHeight * 0.5) {
        // Add animate-in class to all animated elements
        const animatedElements = educationSection.querySelectorAll(
          '.edu-card, .edu-title, .edu-subtitle, .edu-item, ' +
          '.card-body, .badge, .list-unstyled li, .achievement-item, ' +
          '.language-item, .skill-badge, .timeline-item'
        );

        animatedElements.forEach(el => el.classList.add('animate-in'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="bg-dark text-light min-vh-100"
      style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
      id="education"
    >
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-bar"></div>

      <div className="container py-5">
        {/* Page Title with Animation */}
        <div className="text-center mb-5 animate-slide-up">
          <h2 className="fw-bold display-4 mb-3 edu-title">
            <i className="bi bi-mortarboard-fill text-info me-2"></i>
            Education & <span className="text-info">Experience</span>
          </h2>
          <p className="text-light opacity-75 lead">
            My academic journey, achievements, and professional growth
          </p>
          <div className="d-flex justify-content-center">
            <div className="border-bottom border-info border-opacity-25" style={{ width: '100px' }}></div>
          </div>
        </div>

        <div className="row">
          {/* Left Column - Education & Internships */}
          <div className="col-lg-8">
            {/* ================= EDUCATION ================= */}
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="me-3">
                  <div className="bg-info bg-opacity-10 rounded-circle p-3">
                    <i className="bi bi-mortarboard-fill text-info fs-3"></i>
                  </div>
                </div>
                <h4 className="fw-bold text-info mb-0 edu-subtitle">🎓 Education Journey</h4>
              </div>

              {/* Higher Secondary */}
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg mb-4 edu-card hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-light mb-1">
                        Higher Secondary Education (Computer Science)
                      </h5>
                      <div className="d-flex align-items-center mt-2">
                        <i className="bi bi-calendar-check text-info me-2"></i>
                        <span className="text-info">2020 – 2022</span>
                      </div>
                    </div>
                    <div className="bg-info bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-pc-display text-info"></i>
                    </div>
                  </div>
                  <p className="text-light opacity-75 mb-0">
                    <i className="bi bi-book-half text-info me-2"></i>
                    Computer Science Stream with focus on programming fundamentals
                  </p>
                </div>
              </div>

              {/* Degree */}
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg edu-card hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-light mb-1">
                        Bachelor of Computer Application (BCA)
                      </h5>
                      <div className="d-flex align-items-center mt-2">
                        <i className="bi bi-calendar-check text-info me-2"></i>
                        <span className="text-info">2022 – 2025</span>
                        <span className="mx-2 text-light opacity-50">•</span>
                        <i className="bi bi-building text-info me-2"></i>
                        <span className="text-light">Sree Sabareesa College</span>
                      </div>
                    </div>
                    <div className="bg-info bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-award text-info"></i>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-info px-3 py-2 me-3 glow-effect">
                      <i className="bi bi-graph-up me-1"></i>
                      CGPA: 5.26
                    </span>
                    <span className="badge bg-dark border border-info border-opacity-25 text-info px-3 py-2">
                      <i className="bi bi-check-circle me-1"></i>
                      Completed
                    </span>
                  </div>
                  <p className="text-light opacity-75 mb-0">
                    <i className="bi bi-lightbulb text-info me-2"></i>
                    Specialized in software development, database management, and web technologies
                  </p>
                </div>
              </div>
            </div>

            {/* ================= INTERNSHIPS ================= */}
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="me-3">
                  <div className="bg-info bg-opacity-10 rounded-circle p-3">
                    <i className="bi bi-briefcase-fill text-info fs-3"></i>
                  </div>
                </div>
                <h4 className="fw-bold text-info mb-0 edu-subtitle">💼 Professional Experience</h4>
              </div>

              {/* Luminar Internship */}
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg mb-4 edu-card hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-light mb-1">
                        MERN Stack Development Training
                      </h5>
                      <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt text-info me-2"></i>
                          <span className="text-light">Luminar Technolab, Kakkanad</span>
                        </div>
                        <span className="mx-2 text-light opacity-50 d-none d-md-inline">•</span>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock text-info me-2"></i>
                          <span className="text-info">June 2025 – January 2026</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-info bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-stack text-info"></i>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Hands-on training in MongoDB, Express.js, React.js, Angular, and
                        Node.js for full-stack web development.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Developed responsive and dynamic web applications using RESTful
                        APIs.
                      </span>
                    </li>
                    <li className="d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Gained experience with Git, GitHub, and deployment tools such as
                        Vercel and Netlify.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RISS Technologies Internship */}
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg edu-card hover-lift">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="fw-bold text-light mb-1">
                        Project Intern - AI Diet Expert
                      </h5>
                      <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-geo-alt text-info me-2"></i>
                          <span className="text-light">RISS Technologies · Kochi, Kerala (On-site)</span>
                        </div>
                        <span className="mx-2 text-light opacity-50 d-none d-md-inline">•</span>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock text-info me-2"></i>
                          <span className="text-info">February 2025 – April 2025</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-info bg-opacity-10 rounded-circle p-2">
                      <i className="bi bi-robot text-info"></i>
                    </div>
                  </div>

                  <ul className="list-unstyled mb-0">
                    <li className="mb-2 d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Developed an <strong className="text-info">AI Diet Expert</strong> project using
                        Python to generate personalized diet recommendations.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Designed logic to analyze user data such as age, weight, and
                        activity level for accurate health suggestions.
                      </span>
                    </li>
                    <li className="mb-2 d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Worked on data processing, validation, and result accuracy to
                        ensure reliable outputs.
                      </span>
                    </li>
                    <li className="d-flex align-items-start edu-item">
                      <i className="bi bi-check-circle-fill text-info me-2 mt-1"></i>
                      <span className="text-light opacity-90">
                        Improved skills in Python programming, problem-solving, and
                        applying AI concepts to real-world health and wellness
                        solutions.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Achievements & Languages */}
          <div className="col-lg-4">
            {/* ================= ACHIEVEMENTS ================= */}
            <div className="mb-5">
              <div className="d-flex align-items-center mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="me-3">
                  <div className="bg-info bg-opacity-10 rounded-circle p-3">
                    <i className="bi bi-trophy-fill text-info fs-3"></i>
                  </div>
                </div>
                <h4 className="fw-bold text-info mb-0 edu-subtitle">🏆 Achievements</h4>
              </div>

              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg mb-4 edu-card hover-lift">
                <div className="card-body p-4">
                  {/* ICFOSS Workshop */}
                  <div className="achievement-item mb-4 pb-4 border-bottom border-info border-opacity-25">
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-cpu text-info"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-light mb-1">
                          Machine Learning Workshop
                        </h6>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-calendar-event text-info me-2 small"></i>
                          <span className="text-info small">November 2024</span>
                          <span className="mx-2 text-light opacity-50">•</span>
                          <span className="badge bg-dark border border-info border-opacity-25 text-info px-2 py-1 small">
                            ICFOSS
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-light opacity-90 mb-0 small">
                      Participated in a 2-day Machine Learning workshop conducted by ICFOSS, 
                      gaining hands-on experience in Python and ML fundamentals.
                    </p>
                  </div>

                  {/* K-DISC Training */}
                  <div className="achievement-item">
                    <div className="d-flex align-items-start mb-3">
                      <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                        <i className="bi bi-lightbulb text-info"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold text-light mb-1">
                          Young Innovators Program 6.0
                        </h6>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-calendar-event text-info me-2 small"></i>
                          <span className="text-info small">2024</span>
                          <span className="mx-2 text-light opacity-50">•</span>
                          <span className="badge bg-dark border border-info border-opacity-25 text-info px-2 py-1 small">
                            K-DISC
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-light opacity-90 mb-0 small">
                      Completed VOS training under the Young Innovators Program 6.0 organized 
                      by K-DISC, focusing on innovation and practical skills development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Gained from Achievements */}
              <div className="mb-4">
                <h6 className="fw-bold text-light mb-3">
                  <i className="bi bi-tools text-info me-2"></i>
                  Skills Gained
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {['Machine Learning', 'Python Programming', 'Data Analysis', 'Innovation', 'Problem Solving', 'Team Collaboration'].map((skill, index) => (
                    <span key={index} className="badge bg-dark bg-opacity-25 border border-info border-opacity-25 text-info px-3 py-2 skill-badge hover-glow">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= LANGUAGES ================= */}
            <div>
              <div className="d-flex align-items-center mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="me-3">
                  <div className="bg-info bg-opacity-10 rounded-circle p-3">
                    <i className="bi bi-translate text-info fs-3"></i>
                  </div>
                </div>
                <h4 className="fw-bold text-info mb-0 edu-subtitle">🗣️ Languages</h4>
              </div>

              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg edu-card hover-lift">
                <div className="card-body p-4">
                  {/* English */}
                  <div className="language-item mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="bi bi-globe text-info"></i>
                        </div>
                        <h6 className="fw-bold text-light mb-0">English</h6>
                      </div>
                      <span className="badge bg-info px-3 py-1">Professional</span>
                    </div>
                    <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <div 
                        className="progress-bar bg-info" 
                        role="progressbar" 
                        style={{ width: '95%' }}
                        aria-valuenow="95" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="text-light opacity-75 mt-2 mb-0 small">
                      Fluent in reading, writing, and speaking
                    </p>
                  </div>

                  {/* Malayalam */}
                  <div className="language-item">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                          <i className="bi bi-globe-asia-australia text-info"></i>
                        </div>
                        <h6 className="fw-bold text-light mb-0">Malayalam</h6>
                      </div>
                      <span className="badge bg-success px-3 py-1">Native</span>
                    </div>
                    <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{ width: '100%' }}
                        aria-valuenow="100" 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <p className="text-light opacity-75 mt-2 mb-0 small">
                      Native speaker with complete proficiency
                    </p>
                  </div>

                  {/* Language Proficiency Info */}
                  <div className="mt-4 pt-3 border-top border-info border-opacity-25">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-info-circle text-info me-2"></i>
                      <p className="text-light opacity-75 mb-0 small">
                        Comfortable working in both English and Malayalam environments
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Skills Gained Section */}
        <div className="mt-5 pt-4 border-top border-info border-opacity-25 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center mb-4">
            <h4 className="fw-bold text-info mb-3">
              <i className="bi bi-stars me-2"></i>
              Technical & Professional Skills
            </h4>
            <p className="text-light opacity-75">
              Skills developed through education, internships, and achievements
            </p>
          </div>
          <div className="row g-3">
            {[
              { skill: 'React.js', icon: 'bi-braces', category: 'Frontend' },
              { skill: 'Node.js', icon: 'bi-code-slash', category: 'Backend' },
              { skill: 'MongoDB', icon: 'bi-database', category: 'Database' },
              { skill: 'Python', icon: 'bi-filetype-py', category: 'Programming' },
              { skill: 'REST APIs', icon: 'bi-plug', category: 'Integration' },
              { skill: 'Git & GitHub', icon: 'bi-git', category: 'Version Control' },
              { skill: 'Machine Learning', icon: 'bi-cpu', category: 'AI/ML' },
              { skill: 'Problem Solving', icon: 'bi-lightbulb', category: 'Soft Skills' },
              { skill: 'Team Collaboration', icon: 'bi-people', category: 'Soft Skills' },
              { skill: 'Innovation', icon: 'bi-rocket-takeoff', category: 'Soft Skills' }
            ].map((item, index) => (
              <div className="col-6 col-md-4 col-lg-3" key={index}>
                <div className="bg-dark bg-opacity-25 border border-info border-opacity-25 rounded-3 p-3 text-center hover-glow">
                  <i className={`bi ${item.icon} text-info fs-4 mb-2`}></i>
                  <h6 className="text-light mb-1">{item.skill}</h6>
                  <span className="badge bg-dark border border-info border-opacity-25 text-info px-2 py-1 small">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline View for Mobile */}
        <div className="d-lg-none mt-5">
          <div className="text-center mb-4">
            <h5 className="fw-bold text-info">
              <i className="bi bi-timeline me-2"></i>
              Journey Timeline
            </h5>
          </div>
          <div className="position-relative">
            {/* Timeline Line */}
            <div className="position-absolute start-50 translate-middle-x h-100 border-start border-info border-opacity-25"></div>
            
            {/* Timeline Items */}
            {[
              { year: '2020-2022', title: 'Higher Secondary', icon: 'bi-book' },
              { year: '2022-2025', title: 'BCA Degree', icon: 'bi-mortarboard' },
              { year: 'Feb-Apr 2025', title: 'RISS Internship', icon: 'bi-briefcase' },
              { year: 'Nov 2024', title: 'ICFOSS Workshop', icon: 'bi-cpu' },
              { year: '2024', title: 'K-DISC Program', icon: 'bi-award' },
              { year: '2025-2026', title: 'MERN Training', icon: 'bi-stack' }
            ].map((item, index) => (
              <div key={index} className="timeline-item mb-4 position-relative">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-circle p-2">
                      <i className={`bi ${item.icon} text-info`}></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="text-light fw-bold mb-1">{item.title}</h6>
                    <p className="text-info mb-0 small">{item.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-5">
          <a 
            href="/" 
            className="btn btn-outline-info btn-lg px-4 hover-scale"
            style={{ transition: 'all 0.3s ease' }}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Back to Home
          </a>
        </div>
      </div>

      {/* Add the CSS animations from your home.css */}
      <style jsx>{`
        /* Reuse the same animation classes from your home page */
        .edu-card {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .edu-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .edu-item, .achievement-item, .language-item, .timeline-item {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.4s ease-out;
        }
        
        .edu-item.animate-in,
        .achievement-item.animate-in,
        .language-item.animate-in,
        .timeline-item.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .edu-title {
          opacity: 0;
          transform: translateY(-20px);
          animation: slideDown 0.8s ease-out forwards;
        }
        
        .edu-subtitle {
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.5s ease-out;
        }
        
        .edu-subtitle.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .skill-badge {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.3s ease-out;
        }
        
        .skill-badge.animate-in {
          opacity: 1;
          transform: scale(1);
        }
        
        /* Delay animations for each item */
        .edu-card:nth-child(1) { transition-delay: 0.1s; }
        .edu-card:nth-child(2) { transition-delay: 0.2s; }
        .edu-item:nth-child(1) { transition-delay: 0.1s; }
        .edu-item:nth-child(2) { transition-delay: 0.2s; }
        .edu-item:nth-child(3) { transition-delay: 0.3s; }
        .edu-item:nth-child(4) { transition-delay: 0.4s; }
        .achievement-item:nth-child(1) { transition-delay: 0.1s; }
        .achievement-item:nth-child(2) { transition-delay: 0.2s; }
        .language-item:nth-child(1) { transition-delay: 0.1s; }
        .language-item:nth-child(2) { transition-delay: 0.2s; }
        
        /* Hover effects matching home page */
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(13, 202, 240, 0.2);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 20px rgba(13, 202, 240, 0.3);
          transform: translateY(-2px);
        }
        
        .glow-effect {
          animation: glow 2s ease-in-out infinite alternate;
        }
        
        @keyframes glow {
          from {
            box-shadow: 0 0 5px rgba(13, 202, 240, 0.5);
          }
          to {
            box-shadow: 0 0 15px rgba(13, 202, 240, 0.8);
          }
        }
        
        @keyframes slideDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover-scale {
          transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        /* Progress bar animation */
        .progress-bar {
          transition: width 1.5s ease-in-out;
        }
        
        /* Timeline styling */
        .timeline-item {
          padding-left: 20px;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          background-color: #0dcaf0;
          border-radius: 50%;
          border: 3px solid rgba(13, 202, 240, 0.2);
        }
      `}</style>
    </div>
  );
}

export default Education;