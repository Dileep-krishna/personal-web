import React, { useState, useEffect, useRef } from "react";
import { getAllSkillAPI, getProjectAPI } from "../services/allAPI";
import axios from "axios";
import robot from "./robot.png";
import "./index.css";
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    tools: []
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [description, setDescription] = useState("");
  const [showRobot, setShowRobot] = useState(false);
  const robotTimerRef = useRef(null);

  const ADMIN_ID = "695e53041570a0de247b4d89";

  const fetchSkills = async () => {
    try {
      const response = await getAllSkillAPI();
      if (response) {
        const skillsData = response.data || response;
        setSkills({
          frontend: skillsData.frontend || [],
          backend: skillsData.backend || [],
          tools: skillsData.tools || []
        });
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills({
        frontend: [],
        backend: [],
        tools: []
      });
    }
  };

  const fetchProjects = async () => {
    try {
      setProjectLoading(true);
      const response = await getProjectAPI();
      if (response && response.data) {
        const projectsData = response.data.slice(0, 5);
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setProjectLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !showRobot) {
        setShowRobot(true);
        
        if (robotTimerRef.current) {
          clearTimeout(robotTimerRef.current);
        }
        
        robotTimerRef.current = setTimeout(() => {
          setShowRobot(false);
        }, 5000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (robotTimerRef.current) {
        clearTimeout(robotTimerRef.current);
      }
    };
  }, [showRobot]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        try {
          const res = await axios.get(`http://localhost:4000/admin/profile/${ADMIN_ID}`);
          const data = res.data;
          setDescription(data.description || "");
          setProfileImage(data.profile ? `http://localhost:4000/${data.profile}` : "");
        } catch (error) {
          console.error("Error fetching admin profile:", error);
        }

        await fetchSkills();
        await fetchProjects();

        setUserData({
          name: "Dileep Krishna",
          title: "MEARN Stack Developer",
          email: "dileepkrishna7178@gmail.com",
          phone: "+91 8590206267",
          location: "India",
          linkedin: "https://linkedin.com/in/dileepkrishna-t",
          description: "I'm a BCA student and aspiring MEARN Stack Developer. I enjoy building modern, responsive web applications and learning new technologies.",
          degree: "BCA",
          profileImage: ""
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container-fluid bg-dark text-light min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-info" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-info">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light">
      {/* Robot Component */}
      <div className={`robot-container ${showRobot ? 'visible' : ''}`}>
        <div className="contact-text">
          <svg width="300" height="150" viewBox="0 0 300 150">
            <text x="150" y="75" textAnchor="middle" fill="#00ff00" fontSize="20" fontWeight="800" letterSpacing="4">
         
            </text>
          </svg>
        </div>
        <img 
          src={robot}
          alt="Robot Assistant" 
          className="robot"
        />
        {/* <button 
          className="robot-hand-btn"
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
  
        </button> */}
      </div>

      {/* Hero Section */}
      <section
        className="container-fluid bg-dark d-flex align-items-center min-vh-100"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.9)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
          overflow: 'hidden'
        }}
        id="home"
      >
        <div className="container py-5 position-relative z-1">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
              <h5 className="text-info mb-2 animate-slide-up">
                <span className="badge bg-info bg-opacity-10 border border-info rounded-pill px-3 py-1">
                  Hello, I'm
                </span>
              </h5>
              <h1 className="fw-bold display-4 mb-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                {userData.name}
                <span className="text-info animate-blink">_</span>
              </h1>
              <h2 className="text-info mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <i className="bi bi-code-slash me-2"></i>
                {userData.title}
              </h2>
              <p className="lead mb-4 text-light animate-slide-up" style={{ animationDelay: '0.6s' }}>
                {description || "No description available."}
              </p>

              <div className="d-flex gap-3 mt-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <a href="#contact" className="btn btn-info btn-lg px-4">
                  <i className="bi bi-chat-dots me-2"></i>Get In Touch
                </a>
                <a href="#projects" className="btn btn-outline-info btn-lg px-4">
                  <i className="bi bi-briefcase me-2"></i>View Projects
                </a>
              </div>

              <div className="mt-4 d-flex gap-3 animate-slide-up" style={{ animationDelay: '1s' }}>
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="text-info fs-5">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href={`mailto:${userData.email}`} className="text-info fs-5">
                  <i className="bi bi-envelope"></i>
                </a>
                <a href={`tel:${userData.phone}`} className="text-info fs-5">
                  <i className="bi bi-telephone"></i>
                </a>
                <a href='https://github.com/Dileep-krishna' className="text-info fs-5">
                  <i className="bi bi-github"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-6 text-center">
              <div className="position-relative d-inline-block animate-scale">
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-info border-3 animate-pulse"></div>
                <img
                  src={profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                  alt="Profile"
                  className="img-fluid rounded-circle shadow-lg position-relative"
                  style={{
                    width: '350px',
                    height: '350px',
                    objectFit: 'cover',
                    border: '5px solid #0dcaf0',
                    boxShadow: '0 0 30px rgba(13, 202, 240, 0.3)'
                  }}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-5 animate-bounce">
            <a href="#about" className="text-info text-decoration-none">
              <i className="bi bi-chevron-down fs-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="container-fluid py-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h5 className="text-info mb-2">
                <i className="bi bi-person-circle me-2"></i>
                Who Am I?
              </h5>
              <h2 className="fw-bold display-5 text-light mb-4">
                About <span className="text-info">Me</span>
              </h2>

              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4 mb-4 shadow-lg">
                <p className="lead text-light mb-0">
                  <i className="bi bi-quote text-info fs-4 me-2"></i>
                  {userData.description}
                </p>
              </div>

              <p className="text-light mb-4">
                I specialize in building modern full-stack web applications using{" "}
                <span className="text-info fw-bold">React, Node.js, Express, Angular and MongoDB</span>.
                I enjoy turning complex problems into simple, elegant solutions.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-4">
                {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Bootstrap', 'Angular'].map((tech, index) => (
                  <span key={index} className="badge bg-info bg-opacity-10 border border-info text-info px-3 py-2">
                    <i className="bi bi-check-circle me-2"></i>
                    {tech}
                  </span>
                ))}
              </div>

              <a href="#contact" className="btn btn-info btn-lg mt-3 shadow">
                <i className="bi bi-chat-dots me-2"></i>Let's Connect
              </a>
            </div>

            <div className="col-lg-6">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4 shadow-lg hover-lift">
                <div className="card-header bg-transparent border-bottom border-info border-opacity-25 pb-3 mb-3">
                  <h5 className="fw-bold mb-0 text-info">
                    <i className="bi bi-person-badge me-2"></i>Personal Info
                  </h5>
                </div>

                <div className="row g-3">
                  {[
                    { label: "Name", value: userData.name, icon: "bi-person-fill", color: "text-info" },
                    { label: "Education", value: userData.degree, icon: "bi-mortarboard-fill", color: "text-info" },
                    { label: "Role", value: userData.title, icon: "bi-briefcase-fill", color: "text-info" },
                    { label: "Location", value: userData.location, icon: "bi-geo-alt-fill", color: "text-info" },
                    { label: "Email", value: userData.email, icon: "bi-envelope-fill", color: "text-info" },
                    { label: "Phone", value: userData.phone, icon: "bi-telephone-fill", color: "text-info" }
                  ].map((item, index) => (
                    <div className="col-6" key={index}>
                      <div className="p-3 rounded-3 border border-info border-opacity-25 bg-dark bg-opacity-25 hover-glow">
                        <div className="d-flex align-items-center">
                          <div className={`${item.color} me-3`}>
                            <i className={`bi ${item.icon} fs-4`}></i>
                          </div>
                          <div>
                            <h6 className="text-light mb-1 small">{item.label}</h6>
                            <p className="text-light opacity-75 mb-0 small">{item.value}</p>
                          </div>
                        </div>
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
      <section className="container-fluid py-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
        id="skills"
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5 className="text-info mb-2">
              <i className="bi bi-stars me-2"></i>
              My Expertise
            </h5>
            <h2 className="fw-bold display-5 text-light mb-3">
              Technical <span className="text-info">Skills</span>
            </h2>
            <p className="text-light opacity-75">Technologies I work with and my proficiency levels</p>
          </div>

          <div className="row g-4">
            {[
              {
                title: "Frontend Development",
                skills: skills.frontend,
                icon: "bi-display",
                color: "primary",
                delay: "0s"
              },
              {
                title: "Backend Development",
                skills: skills.backend,
                icon: "bi-server",
                color: "info",
                delay: "0.1s"
              },
              {
                title: "Tools & Platforms",
                skills: skills.tools,
                icon: "bi-wrench",
                color: "success",
                delay: "0.2s"
              }
            ].map((category, catIndex) => (
              <div className="col-md-4" key={catIndex}>
                <div
                  className="card bg-dark bg-opacity-50 border border-info border-opacity-25 h-100 shadow-lg hover-lift"
                  style={{ animationDelay: category.delay }}
                >
                  <div className="card-header bg-transparent border-bottom border-info border-opacity-25 pb-3">
                    <div className="d-flex align-items-center">
                      <div className={`bg-${category.color} bg-opacity-10 rounded-circle p-3 me-3`}>
                        <i className={`bi ${category.icon} text-${category.color} fs-4`}></i>
                      </div>
                      <h5 className="fw-bold mb-0 text-light">
                        {category.title}
                      </h5>
                    </div>
                  </div>

                  <div className="card-body">
                    {category.skills.length === 0 ? (
                      <div className="text-center py-4">
                        <i className="bi bi-tools text-info fs-1 mb-3"></i>
                        <p className="text-light">No skills added yet.</p>
                      </div>
                    ) : (
                      category.skills.map((skill, skillIndex) => (
                        <div key={skill._id || skillIndex} className="mb-4">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center">
                              <div className={`bg-${category.color} bg-opacity-10 rounded-circle p-2 me-2`}>
                                <i className={`bi bi-code-slash text-${category.color}`}></i>
                              </div>
                              <span className="text-light fw-semibold">{skill.name}</span>
                            </div>
                            <span className={`badge bg-${category.color} px-3 py-1`}>{skill.level}%</span>
                          </div>
                          <div className="progress" style={{ height: '10px', borderRadius: '5px' }}>
                            <div
                              className={`progress-bar bg-${category.color}`}
                              style={{
                                width: `${skill.level}%`,
                                borderRadius: '5px'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="card-footer bg-transparent border-top border-info border-opacity-25 pt-3">
                    <small className="text-info opacity-75">
                      <i className="bi bi-info-circle me-1"></i>
                      {category.skills.length} skills listed
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5 pt-4 border-top border-info border-opacity-25">
            <div className="col-12">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-light mb-2">Ready to take your project to the next level?</h5>
                    <p className="text-light opacity-75 mb-0">
                      Let's work together to build something amazing with these technologies.
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <a href="#contact" className="btn btn-info btn-lg">
                      <i className="bi bi-lightning-charge me-2"></i>
                      Start Project
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="container-fluid py-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5 className="text-info mb-2">
              <i className="bi bi-fire me-2"></i>
              Trending Now
            </h5>
            <h2 className="fw-bold display-5 text-light mb-3">
              Featured <span className="text-info">Projects</span>
            </h2>
            <p className="text-light opacity-75">Explore my latest work with reels-like experience</p>
          </div>

          {projectLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading projects...</span>
              </div>
              <p className="text-info mt-3">Loading awesome projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-5">
              <i className="bi bi-folder2-open text-info fs-1 mb-3"></i>
              <h5 className="text-light">No projects found</h5>
              <p className="text-light opacity-75">Check back soon for amazing projects!</p>
            </div>
          ) : (
            <>
              <div className="row g-4 justify-content-center">
                {projects.map((project, index) => (
                  <div className="col-lg-4 col-md-6" key={project._id || project.id || index}>
                    <div className="card bg-dark bg-opacity-75 border border-info border-opacity-25 rounded-4 shadow-lg overflow-hidden h-100 hover-lift">
                      <div className="position-relative">
                        <div className="project-image-container" style={{ height: '200px', overflow: 'hidden' }}>
                          {project.image ? (
                            <img
                              src={`http://localhost:4000/imguploads/${project.image}`}
                              alt={project.title}
                              className="img-fluid w-100 h-100"
                              style={{
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                              }}
                            />
                          ) : (
                            <div className="w-100 h-100 bg-info bg-opacity-10 d-flex align-items-center justify-content-center">
                              <i className="bi bi-laptop text-info fs-1"></i>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="card-body p-4 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 className="text-light fw-bold mb-0">
                            {project.title}
                            <span className="text-info blink-effect">_</span>
                          </h5>
                          <div className="d-flex gap-2">
                            {project.live && project.live !== '#' && (
                              <i className="bi bi-rocket-takeoff text-success fs-5 float-effect"></i>
                            )}
                            {project.github && project.github !== '#' && (
                              <i className="bi bi-github text-light fs-5"></i>
                            )}
                          </div>
                        </div>

                        <p className="text-light opacity-75 mb-4 flex-grow-1" style={{ fontSize: '0.9rem' }}>
                          {project.description && project.description.length > 120
                            ? `${project.description.substring(0, 120)}...`
                            : project.description || 'A fantastic project showcasing modern web development skills.'}
                        </p>

                        {project.technologies && project.technologies.length > 0 && (
                          <div className="mb-4">
                            <h6 className="text-info mb-2">
                              <i className="bi bi-tags me-1"></i>
                              Technologies
                            </h6>
                            <div className="d-flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className="badge bg-info bg-opacity-10 border border-info border-opacity-25 text-info px-2 py-1 glow-effect"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="badge bg-dark border border-info border-opacity-25 text-info px-2 py-1 glow-effect">
                                  +{project.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="d-flex gap-2 mt-3 pt-3 border-top border-light border-opacity-25">
                          <button
                            className="btn btn-outline-info btn-sm flex-fill hover-scale"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.github && project.github !== '#') {
                                window.open(project.github, '_blank');
                              }
                            }}
                            disabled={!project.github || project.github === '#'}
                          >
                            <i className="bi bi-github me-1"></i>
                            Code
                          </button>

                          <button
                            className="btn btn-sm flex-fill hover-scale"
                            style={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                              color: 'white',
                              position: 'relative',
                              overflow: 'hidden'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (project.live && project.live !== '#') {
                                window.open(project.live, '_blank');
                              }
                            }}
                            disabled={!project.live || project.live === '#'}
                          >
                            <span className="position-relative z-1">
                              <i className="bi bi-rocket-takeoff me-1 rocket-effect"></i>
                              Live....
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="card-footer bg-transparent border-top border-info border-opacity-25 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-info bg-opacity-10 p-1 me-2 pulse-effect">
                              <i className="bi bi-person-circle text-info"></i>
                            </div>
                            <small className="text-light">
                              By {userData.name}
                            </small>
                          </div>
                          <small className="text-info">
                            <i className="bi bi-clock me-1"></i>
                            {project.date || 'Recent'}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-5">
                <a href="/project" className="btn btn-outline-info btn-lg px-5 hover-scale bounce-effect">
                  <i className="bi bi-grid-3x3-gap me-2"></i>
                  View All Projects
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-5"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5 className="text-info mb-2">
              <i className="bi bi-chat-left-dots me-2"></i>
              Get In Touch
            </h5>
            <h2 className="fw-bold display-5 text-light mb-3">
              Contact <span className="text-info">Me</span>
            </h2>
            <p className="text-light opacity-75">Feel free to reach out for collaborations or just a friendly hello</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg overflow-hidden">
                <div className="row g-0">
                  <div className="col-lg-5 bg-dark bg-opacity-75 p-4">
                    <h4 className="text-light fw-bold mb-4">
                      <i className="bi bi-info-circle me-2"></i>
                      Contact Information
                    </h4>

                    {[
                      {
                        icon: "bi-envelope-fill",
                        title: "Email",
                        value: userData.email,
                        link: `mailto:${userData.email}`,
                        color: "info"
                      },
                      {
                        icon: "bi-telephone-fill",
                        title: "Phone",
                        value: userData.phone,
                        link: `tel:${userData.phone}`,
                        color: "info"
                      },
                      {
                        icon: "bi-geo-alt-fill",
                        title: "Location",
                        value: userData.location,
                        color: "info"
                      },
                      {
                        icon: "bi-linkedin",
                        title: "LinkedIn",
                        value: "View Profile",
                        link: userData.linkedin,
                        color: "info"
                      }
                    ].map((item, index) => (
                      <div key={index} className="d-flex align-items-center mb-4 p-3 rounded-3 bg-dark bg-opacity-50 border border-info border-opacity-25 hover-glow">
                        <div className={`bg-${item.color} bg-opacity-10 rounded-circle p-3 me-3`}>
                          <i className={`bi ${item.icon} text-${item.color} fs-4`}></i>
                        </div>
                        <div>
                          <h6 className="text-light mb-1 small">{item.title}</h6>
                          {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener noreferrer"
                              className={`text-${item.color} text-decoration-none`}>
                              {item.value}
                            </a>
                          ) : (
                            <span className={`text-${item.color}`}>{item.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-7 p-4">
                    <h4 className="text-light fw-bold mb-4">
                      <i className="bi bi-send me-2"></i>
                      Send a Message
                    </h4>

                    <form>
                      <div className="row g-3">
                        <div className="col-12"></div>
                      </div>
                    </form>

                    <div className="mt-4 p-3 rounded-3 bg-dark bg-opacity-25 border border-info border-opacity-25">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-lightning text-info fs-4 me-3"></i>
                        <div>
                          <h6 className="text-light mb-1">Quick Response Guaranteed</h6>
                          <p className="text-info small mb-0">I typically respond within 24 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-center py-5 border-top border-info">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start mb-3 mb-lg-0">
              <h5 className="text-light mb-2">
                <i className="bi bi-person-circle me-2 text-info"></i>
                {userData.name}
              </h5>
              <p className="text-info small mb-0">
                <i className="bi bi-code-slash me-1"></i>
                {userData.title}
              </p>
            </div>

            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-center gap-4">
                {[
                  {
                    platform: 'linkedin',
                    url: userData.linkedin || '#',
                    icon: 'bi-linkedin'
                  },
                  {
                    platform: 'github',
                    url: 'https://github.com/Dileep-krishna',
                    icon: 'bi-github'
                  },
                  {
                    platform: 'instagram',
                    url: '#',
                    icon: 'bi-instagram'
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info fs-5 border border-info border-opacity-25 rounded-circle p-2 hover-lift d-flex align-items-center justify-content-center"
                    style={{
                      width: '45px',
                      height: '45px',
                      transition: 'all 0.3s ease'
                    }}
                    title={social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <a
                href="#home"
                className="btn btn-outline-info d-inline-flex align-items-center"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <i className="bi bi-arrow-up-circle me-2"></i>
                Back to Top
              </a>
            </div>
          </div>

          <div className="border-top border-info border-opacity-25 mt-4 pt-4">
            <p className="text-light mb-0">
              <i className="bi bi-c-circle me-1 text-info"></i>
              © {new Date().getFullYear()} {userData.name}. All rights reserved. |
              Made with <i className="bi bi-heart-fill text-danger mx-1"></i> and React
              <i className="bi bi-react text-info ms-2"></i>
            </p>
          </div>
        </div>
      </footer>

<style jsx>{`
.robot-container {
  position: absolute;
  bottom: 170px;
  right: end;
  z-index: 999;
  text-align: end;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.robot-container.visible {
  opacity: 1;
  pointer-events: auto;
  animation: robotPeek 7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.robot-container.hiding {
  animation: robotDisappear 0.8s ease-out forwards;
  pointer-events: none;
}

@keyframes robotPeek {
  0% {
    right: -2000px;
    opacity: 0;
  }
  60% {
    right: 0px;
    opacity: 1;
  }
  80% {
    right: -3px;
  }
  100% {
    right: -4px;
    opacity: 1;
  }
}

@keyframes robotDisappear {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(100px) scale(0.8);
  }
}

.robot {
  width: 340px;
  animation: robotFloat 2.5s ease-in-out infinite;
  transform-origin: end;
  filter: drop-shadow(0 10px 25px rgba(0,188,212,0.4));
}

@media (max-width: 768px) {
  .robot-container {
    bottom: -310px;
    right: 20px;
  }
}


}
  /* Your existing animations - UNCHANGED */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @keyframes scale-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-slide-up {
    animation: slide-up 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-scale {
    animation: scale-in 0.8s ease-out forwards;
  }
  
  .animate-blink {
    animation: blink 1s infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s infinite;
  }
  
  .animate-bounce {
    animation: bounce 2s infinite;
  }
  
  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(13, 202, 240, 0.2) !important;
  }
  
  .hover-glow {
    transition: all 0.3s ease;
  }
  
  .hover-glow:hover {
    border-color: rgba(13, 202, 240, 0.5) !important;
    box-shadow: 0 0 15px rgba(13, 202, 240, 0.2);
  }
  
  .project-image-container img {
    transition: transform 0.5s ease;
  }
  
  .project-image-container:hover img {
    transform: scale(1.1);
  }

  @keyframes fire {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px rgba(13, 202, 240, 0.5); }
    50% { box-shadow: 0 0 15px rgba(13, 202, 240, 0.8); }
  }

  @keyframes rocket {
    0% { transform: translateX(0); }
    25% { transform: translateX(3px); }
    75% { transform: translateX(-3px); }
    100% { transform: translateX(0); }
  }

  .fire-effect {
    animation: fire 1s infinite;
  }

  .blink-effect {
    animation: blink 1s infinite;
  }

  .float-effect {
    animation: float 3s ease-in-out infinite;
  }

  .glow-effect {
    animation: glow 2s infinite;
    transition: all 0.3s ease;
  }

  .glow-effect:hover {
    transform: scale(1.05);
    background-color: rgba(13, 202, 240, 0.2) !important;
  }

  .rocket-effect {
    animation: rocket 1s infinite;
    display: inline-block;
  }

  .bounce-effect {
    animation: bounce 2s infinite;
  }

  .hover-scale {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-scale:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(13, 202, 240, 0.3);
  }
`}</style>
    </div>
  );
};

export default Home;