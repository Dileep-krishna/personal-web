import React, { useState, useEffect } from "react";

const Home = () => {
  // State for dynamic data (will be fetched from backend)
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUserData({
        name: "Dileep Krishna",
        title: "MERN Stack Developer",
        email: "dileep@gmail.com",
        phone: "+91 98765 43210",
        location: "India",
        linkedin: "https://linkedin.com/in/your-profile",
        description: "I'm a BCA student and aspiring MERN Stack Developer. I enjoy building modern, responsive web applications and learning new technologies.",
        degree: "BCA",
        profileImage: "blob:https://web.whatsapp.com/3a5d532f-7420-48f8-b590-759dec60b1d3"
      });

      setSkills({
        frontend: [
          { name: "HTML5 & CSS3", level: 90 },
          { name: "JavaScript (ES6+)", level: 85 },
          { name: "React.js", level: 80 },
          { name: "Redux / Context API", level: 75 },
          { name: "Figma", level: 85 },
          { name: "Bootstrap / Tailwind", level: 85 }
        ],
        backend: [
          { name: "Node.js", level: 80 },
          { name: "Express.js", level: 75 },
          { name: "MongoDB & Mongoose", level: 75 },
          { name: "JWT / RBAC / OAuth2", level: 70 },
          { name: "REST API", level: 70 }
        ],
        tools: [
          { name: "Git & GitHub", level: 85 },
          { name: "Postman", level: 80 },
          { name: "VS Code", level: 90 },
          { name: "Vercel / Netlify", level: 75 },
          { name: "MongoDB Atlas", level: 75 }
        ]
      });

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light">
      {/* Hero Section */}
      <section 
        className="container-fluid bg-dark d-flex align-items-center min-vh-100"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
        id="home"
      >
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <h5 className="text-info mb-2">Hello, I'm</h5>
              <h1 className="fw-bold display-4 mb-3">{userData.name}</h1>
              <h2 className="text-info mb-4">{userData.title}</h2>
              <p className="lead mb-4 text-light">
                I build responsive, user-friendly web applications using
                React, Node.js, Express, and MongoDB.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <a href="/project" className="btn btn-info btn-lg px-4">
                  <i className="bi bi-code-slash me-2"></i>View Projects
                </a>
                <a href="#contact" className="btn btn-outline-info btn-lg px-4">
                  <i className="bi bi-envelope me-2"></i>Contact Me
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-center">
              <div className="position-relative d-inline-block">
                <img
                  src=""
                  alt="Profile"
                  className="img-fluid rounded-circle shadow-lg"
                  style={{ 
                    width: '350px',
                    height: '350px',
                    objectFit: 'cover',
                    border: '5px solid #0dcaf0'
                  }}
                />
                <div className="position-absolute bottom-0 end-0 bg-info rounded-circle p-2 border border-3 border-dark">
                  <i className="bi bi-check-circle-fill text-dark fs-4"></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="text-center mt-5">
            <a href="#about" className="text-info text-decoration-none">
              <i className="bi bi-chevron-down fs-4"></i>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
<section
  id="about"
  className="container-fluid d-flex align-items-center min-vh-0"
  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }}
>
  <div className="container py-5">
    <div className="row align-items-center">

      {/* About Text */}
      <div className="col-lg-6 mb-5 mb-lg-0">
        <h5 className="text-info mb-2">Who Am I?</h5>
        <h2 className="fw-bold display-5 text-light mb-4">
          About <span className="text-info">Me</span>
        </h2>

        <p className="lead text-light mb-4">
          {userData.description}
        </p>

        <p className="text-light">
          I specialize in building modern full-stack web applications using{" "}
          <strong className="text-info">
            React, Node.js, Express, and MongoDB
          </strong>.
          I enjoy turning complex problems into simple, elegant solutions.
        </p>

        <a href="#contact" className="btn btn-info btn-lg mt-3">
          <i className="bi bi-chat-dots me-2"></i>Let's Connect
        </a>
      </div>

      {/* Personal Info Card */}
      <div className="col-lg-6">
        <div className=" border border-info border-opacity-25 rounded-4 p-4 ">
          <h5 className="fw-bold mb-4 text-info">
            <i className="bi bi-person-badge me-2"></i>Personal Info
          </h5>

          <div className="row g-3">
            {[
              { label: "Name", value: userData.name, icon: "bi-person" },
              { label: "Education", value: userData.degree, icon: "bi-mortarboard" },
              { label: "Role", value: userData.title, icon: "bi-briefcase" },
              { label: "Location", value: userData.location, icon: "bi-geo-alt" }
            ].map((item, index) => (
              <div className="col-6" key={index}>
                <div className="p-3 rounded-3 border border-info border-opacity-25">
                  <i className={`bi ${item.icon} text-info fs-5`}></i>
                  <h6 className="text-light mt-2 mb-1">{item.label}</h6>
                  <p className="text-light opacity-75 mb-0">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  </div>
</section>



      {/* Skills Section */}
      <section  className="container-fluid d-flex align-items-center min-vh-0"
  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} id="skills ">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">
            <i className="bi bi-tools text-info me-2"></i>
            My Skills
          </h2>

          <div className="row g-4">
            {/* Frontend */}
            <div className="col-md-4">
              <div  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} className="card border-info h-100 shadow">
                <div className="card-body">
                  <h5 className="fw-bold mb-4 text-info">
                    <i className="bi bi-display me-2"></i>
                    Frontend
                  </h5>
                  {skills.frontend.map((skill, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-light">{skill.name}</span>
                        <span className="text-info">{skill.level}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="col-md-4">
              <div  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} className="card  border-info h-100 shadow">
                <div className="card-body">
                  <h5 className="fw-bold mb-4 text-info">
                    <i className="bi bi-server me-2"></i>
                    Backend
                  </h5>
                  {skills.backend.map((skill, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-light">{skill.name}</span>
                        <span className="text-info">{skill.level}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="col-md-4">
              <div  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} className="card  border-info h-100 shadow">
                <div className="card-body">
                  <h5 className="fw-bold mb-4 text-info">
                    <i className="bi bi-wrench me-2"></i>
                    Tools & Platforms
                  </h5>
                  {skills.tools.map((skill, index) => (
                    <div key={index} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-light">{skill.name}</span>
                        <span className="text-info">{skill.level}%</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar bg-info" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} id="contact" className="py-5">
        <div className="container py-5">
          <h2 className="text-center fw-bold mb-5">
            <i className="bi bi-envelope text-info me-2"></i>
            Contact Me
          </h2>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div  style={{
    backgroundImage:
      "linear-gradient(rgba(14, 13, 13, 0.75), rgba(0,0,0,0.75)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  }} className="card  border-info shadow">
                <div className="card-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info rounded-circle p-3 me-3">
                          <i className="bi bi-envelope-fill text-dark fs-4"></i>
                        </div>
                        <div>
                          <h6 className="text-light mb-1">Email</h6>
                          <a href={`mailto:${userData.email}`} className="text-info text-decoration-none">
                            {userData.email}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info rounded-circle p-3 me-3">
                          <i className="bi bi-phone-fill text-dark fs-4"></i>
                        </div>
                        <div>
                          <h6 className="text-light mb-1">Phone</h6>
                          <a href={`tel:${userData.phone}`} className="text-info text-decoration-none">
                            {userData.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info rounded-circle p-3 me-3">
                          <i className="bi bi-geo-alt-fill text-dark fs-4"></i>
                        </div>
                        <div>
                          <h6 className="text-light mb-1">Location</h6>
                          <span className="text-info">{userData.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-4">
                        <div className="bg-info rounded-circle p-3 me-3">
                          <i className="bi bi-linkedin text-dark fs-4"></i>
                        </div>
                        <div>
                          <h6 className="text-light mb-1">LinkedIn</h6>
                          <a 
                            href={userData.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-info text-decoration-none"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Optional: Add a contact form here */}
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-4 border-top border-info">
        <div className="container">
          <p className="text-light mb-0">
            © {new Date().getFullYear()} {userData.name}. All rights reserved.
          </p>
          <div className="mt-3">
            <a href="#home" className="text-info text-decoration-none mx-3">
              <i className="bi bi-arrow-up-circle fs-4"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;