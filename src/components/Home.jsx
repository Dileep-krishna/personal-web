import React, { useState, useEffect, useRef } from "react";
import { getAllSkillAPI, getProjectAPI, loginAPI } from "../services/allAPI";
import axios from "axios";
import robot from "./robot.png";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../components/home.css";

const Home = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userData, setUserData] = useState(null);
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    tools: [],
    programmingLanguage: []
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
        // Initialize all categories with empty arrays first
        const organizedSkills = {
          frontend: [],
          backend: [],
          tools: [],
          programmingLanguage: []
        };

        // Check if skillsData is an array or object
        if (Array.isArray(skillsData)) {
          // If it's an array, categorize by skill.category
          skillsData.forEach(skill => {
            if (skill.category) {
              switch (skill.category.toLowerCase()) {
                case 'frontend':
                  organizedSkills.frontend.push(skill);
                  break;
                case 'backend':
                  organizedSkills.backend.push(skill);
                  break;
                case 'tools':
                  organizedSkills.tools.push(skill);
                  break;
                case 'programminglanguage':
                  organizedSkills.programmingLanguage.push(skill);
                  break;
                default:
                  // Try to match other possible formats
                  if (skill.category.includes('programming') || skill.category.includes('language')) {
                    organizedSkills.programmingLanguage.push(skill);
                  } else if (skill.category.includes('frontend')) {
                    organizedSkills.frontend.push(skill);
                  } else if (skill.category.includes('backend')) {
                    organizedSkills.backend.push(skill);
                  } else {
                    organizedSkills.tools.push(skill);
                  }
              }
            }
          });
        } else if (typeof skillsData === 'object') {
          // If it's already an object with categories
          organizedSkills.frontend = skillsData.frontend || [];
          organizedSkills.backend = skillsData.backend || [];
          organizedSkills.tools = skillsData.tools || [];
          organizedSkills.programmingLanguage = skillsData.programmingLanguage || [];
        }

        setSkills(organizedSkills);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
      setSkills({
        frontend: [],
        backend: [],
        tools: [],
        programmingLanguage: []
      });
    }
  };

const fetchProjects = async () => {
  try {
    setProjectLoading(true);
    const response = await getProjectAPI();
    if (response && response.data) {
      // First, sort the projects by ID in ascending order (1, 2, 3...)
      const sortedProjects = response.data.sort((a, b) => {
        // Convert IDs to numbers for proper numeric sorting
        const idA = a.id ? parseInt(a.id.toString().trim()) : 999999;
        const idB = b.id ? parseInt(b.id.toString().trim()) : 999999;
        
        // Handle NaN cases
        if (isNaN(idA) && isNaN(idB)) return 0;
        if (isNaN(idA)) return 1; // Projects without ID go last
        if (isNaN(idB)) return -1; // Projects with ID come first
        
        // Ascending order: 1, 2, 3...
        return idA - idB;
      });
      
      // Then take the first 5 projects
      const projectsData = sortedProjects.slice(0, 5);
      
      // Log for debugging
      console.log("Sorted projects:", projectsData.map(p => ({
        id: p.id,
        title: p.title,
        parsedId: p.id ? parseInt(p.id.toString().trim()) : 'N/A'
      })));
      
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

        // Robot will disappear after 3 seconds
        robotTimerRef.current = setTimeout(() => {
          setShowRobot(false);
        }, 1000); // 3s + 0.8s animation duration
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //login api
  const navigate = useNavigate();

  const handleLogin = async () => {
    const reqBody = { email, password };

    try {
      const result = await loginAPI(reqBody);

      // since result IS response.data in your case
      if (result?.admin) {

        // store admin (optional but recommended)
        localStorage.setItem("admin", JSON.stringify(result.admin));

        Swal.fire({
          icon: "success",
          title: "Login Successful 🎉",
          text: "Welcome Admin",
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate("/admin-home"); // home page
        }, 1500);

      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed, Admin Can Access This Login ",
          text: "Invalid credentials"
        });
      }

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later"
      });
    }
  };
  ;
  // Add this useEffect for enhanced smooth scrolling
  useEffect(() => {
    // Function for smooth scrolling
    const smoothScrollTo = (targetId) => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const headerHeight = 80; // Adjust based on your header height
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition - headerHeight;
      const duration = 1000; // 1 second
      let start = null;

      // Easing function for smooth acceleration/deceleration
      const easeInOutCubic = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Attach smooth scroll to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        const targetId = href.substring(1);
        if (targetId) {
          e.preventDefault();
          smoothScrollTo(targetId);
        }
      });
    });
  

    // Add scroll progress indicator
    const createScrollProgress = () => {
      const progressBar = document.createElement('div');
      progressBar.className = 'scroll-progress-bar';
      progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, #0dcaf0, #667eea);
      z-index: 9999;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(13, 202, 240, 0.5);
    `;
      document.body.appendChild(progressBar);

      const updateProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
      };

      window.addEventListener('scroll', updateProgress);

      return () => {
        window.removeEventListener('scroll', updateProgress);
        progressBar.remove();
      };
    };

    // Initialize scroll progress
    const cleanupProgress = createScrollProgress();

    return () => {
      // Cleanup
      cleanupProgress();
    };
  }, []);

  // Add this useEffect for scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) return;

      const sectionTop = aboutSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // When section is 50% visible
      if (sectionTop < windowHeight * 0.5) {
        // Add animate-in class to all animated elements
        const animatedElements = aboutSection.querySelectorAll(
          '.about-left, .about-right, .about-subtitle, .about-title, ' +
          '.about-quote, .about-description, .tech-highlight, .about-tech, ' +
          '.about-button, .about-card, .card-header-animate, .card-title-animate, ' +
          '.info-grid, .info-item, .tech-badge'
        );

        animatedElements.forEach(el => el.classList.add('animate-in'));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on load in case section is already visible
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add this to your existing scroll animation useEffect or create a new one
  useEffect(() => {
    // Update the handleSkillsScroll function in your useEffect
    const handleSkillsScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (!skillsSection) return;

      const sectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // When section is 50% visible
      if (sectionTop < windowHeight * 0.5) {
        // Add animate-in class to section
        skillsSection.classList.add('animate-in');

        // Add animate-in class to all animated elements
        const animatedElements = skillsSection.querySelectorAll(
          '.skills-subtitle, .skills-description, .skill-category, ' +
          '.skills-cta, .skill-card, .skill-card-header, .skill-icon-container, ' +
          '.skill-category-title, .skill-item, .skill-card-footer, ' +
          '.cta-title, .cta-description, .cta-button, .no-skills'
        );

        animatedElements.forEach(el => el.classList.add('animate-in'));

        // Animate progress bars
        const progressBars = skillsSection.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
          const level = bar.getAttribute('data-level') || 0;
          // Directly set the width instead of using CSS variable
          setTimeout(() => {
            bar.style.width = `${level}%`;
          }, 800); // Match the CSS transition delay
        });
      }
    };

    window.addEventListener('scroll', handleSkillsScroll);
    // Trigger once on load
    handleSkillsScroll();

  

    return () => window.removeEventListener('scroll', handleSkillsScroll);
  }, []);
  // Add this function outside the JSX
const scrollToProjects = () => {
  console.log('Scrolling to projects');
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  } else {
    // If on a different page, navigate to home first
    navigate('/');
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
};

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
        <button onClick={handleShow} className="btn ">
          <img
            src={robot}
            alt="Robot Assistant"
            className="robot"
          />
        </button>
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




<div className="d-flex p-3 me-2 gap-3 mt-4" style={{ animationDelay: '0.8s' }}>
  <button 
    onClick={() => {
      console.log('Navigating to education');
      navigate('/education');
    }}
    className="btn btn-info btn-lg px-4 animate-slide-up"
    style={{ animationDelay: '0.8s' }}
  >
    <i className="bi bi-chat-dots me-2"></i>See Education & Internships
  </button>
  
  <button 
    onClick={scrollToProjects}
    className="btn btn-outline-info btn-lg px-4 animate-slide-up"
    style={{ animationDelay: '0.8s' }}
  >
    <i className="bi bi-briefcase me-2"></i>View Projects
  </button>
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
            <div className="col-lg-6 mb-5 mb-lg-0 about-left">
              <h5 className="text-info mb-2 about-subtitle">
                <i className="bi bi-person-circle me-2"></i>
                Who Am I?
              </h5>
              <h2 className="fw-bold display-5 text-light mb-4 about-title">
                About <span className="text-info tech-highlight">Me</span>
              </h2>

              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4 mb-4 shadow-lg about-quote">
                <p className="lead text-light mb-0">
                  <i className="bi bi-quote text-info fs-4 me-2"></i>
                  {userData.description}
                </p>
              </div>

              <p className="text-light mb-4 about-description">
                I specialize in building modern full-stack web applications using{" "}
                <span className="text-info fw-bold tech-highlight">React, Node.js, Express, Angular and MongoDB</span>.
                I enjoy turning complex problems into simple, elegant solutions.
              </p>

              <div className="d-flex flex-wrap gap-2 mb-4 about-tech">
                {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'Bootstrap', 'Angular'].map((tech, index) => (
                  <span key={index} className="badge bg-info bg-opacity-10 border border-info text-info px-3 py-2 tech-badge">
                    <i className="bi bi-check-circle me-2"></i>
                    {tech}
                  </span>
                ))}
              </div>

              <a href="#contact" className="btn btn-info btn-lg mt-3 shadow about-button">
                <i className="bi bi-chat-dots me-2"></i>Let's Connect
              </a>
            </div>

            <div className="col-lg-6 about-right">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4 shadow-lg hover-lift about-card">
                <div className="card-header bg-transparent border-bottom border-info border-opacity-25 pb-3 mb-3 card-header-animate">
                  <h5 className="fw-bold mb-0 text-info card-title-animate">
                    <i className="bi bi-person-badge me-2"></i>Personal Info
                  </h5>
                </div>

                <div className="row g-3 info-grid">
                  {[
                    { label: "Name", value: userData.name, icon: "bi-person-fill", color: "text-info" },
                    { label: "Education", value: userData.degree, icon: "bi-mortarboard-fill", color: "text-info" },
                    { label: "Role", value: userData.title, icon: "bi-briefcase-fill", color: "text-info" },
                    { label: "Location", value: userData.location, icon: "bi-geo-alt-fill", color: "text-info" },
                    { label: "Email", value: userData.email, icon: "bi-envelope-fill", color: "text-info" },
                    { label: "Phone", value: userData.phone, icon: "bi-telephone-fill", color: "text-info" }
                  ].map((item, index) => (
                    <div className="col-6 info-item" key={index}>
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
      <section className="container-fluid py-5 skills-section"
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
            <h5 className="text-info mb-2 skills-subtitle">
              <i className="bi bi-stars me-2"></i>
              My Expertise
            </h5>
            <h2 className="fw-bold display-5 text-light mb-3 skills-title">
              <span className="skills-typing">Technical </span>
              <span className="text-info skills-highlight">Skills</span>
            </h2>
            <p className="text-light opacity-75 skills-description">
              Technologies I work with and my proficiency levels
            </p>
          </div>

          <div className="row g-4 skills-container">
            {[
              {
                title: "Programming Languages",
                skills: skills.programmingLanguage || [],
                icon: "bi-filetype-jsx",
                color: "primary",
                hexColor: "#0d6efd",
                rgbaColor: "rgba(13, 110, 253, 0.12)",
                rgbaBorder: "rgba(13, 110, 253, 0.25)",
                delay: "0.1s",
                index: 1
              },
              {
                title: "Frontend Development",
                skills: skills.frontend || [],
                icon: "bi-display",
                color: "primary",
                hexColor: "#0d6efd",
                rgbaColor: "rgba(13, 110, 253, 0.12)",
                rgbaBorder: "rgba(13, 110, 253, 0.25)",
                delay: "0.2s",
                index: 2
              },
              {
                title: "Backend Development",
                skills: skills.backend || [],
                icon: "bi-server",
                color: "info",
                hexColor: "#0dcaf0",
                rgbaColor: "rgba(13, 202, 240, 0.12)",
                rgbaBorder: "rgba(13, 202, 240, 0.25)",
                delay: "0.3s",
                index: 3
              },
              {
                title: "Tools & Platforms",
                skills: skills.tools || [],
                icon: "bi-wrench",
                color: "success",
                hexColor: "#198754",
                rgbaColor: "rgba(25, 135, 84, 0.12)",
                rgbaBorder: "rgba(25, 135, 84, 0.25)",
                delay: "0.4s",
                index: 4
              }
            ].map((category, catIndex) => (
              <div className="col-md-4 skill-category" key={catIndex} data-index={category.index}>
                <div
                  className="card bg-dark bg-opacity-50 border border-info border-opacity-25 h-100 shadow-lg hover-lift skill-card"
                >
                  <div className="card-header bg-transparent border-bottom border-info border-opacity-25 pb-3 skill-card-header">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle p-3 me-3 skill-icon-container"
                        style={{
                          backgroundColor: category.rgbaColor,
                          border: `1px solid ${category.rgbaBorder}`
                        }}
                      >
                        <i
                          className={`bi ${category.icon} fs-4 skill-icon`}
                          style={{ color: category.hexColor }}
                        ></i>
                      </div>
                      <h5 className="fw-bold mb-0 text-light skill-category-title">
                        {category.title}
                      </h5>
                    </div>
                  </div>

                  <div className="card-body skill-card-body">
                    {(!category.skills || category.skills.length === 0) ? (
                      <div className="text-center py-4 no-skills">
                        <i className="bi bi-tools text-info fs-1 mb-3 skill-empty-icon"></i>
                        <p className="text-light">No skills added yet.</p>
                      </div>
                    ) : (
                      category.skills.map((skill, skillIndex) => (
                        <div key={skill._id || skillIndex} className="mb-4 skill-item">
                          <div className="d-flex justify-content-between align-items-center mb-2 skill-item-header">
                            <div className="d-flex align-items-center">
                              <div
                                className="rounded-circle p-2 me-2 skill-item-icon"
                                style={{
                                  backgroundColor: category.rgbaColor,
                                  border: `1px solid ${category.rgbaBorder}`
                                }}
                              >
                                <i
                                  className="bi bi-code-slash"
                                  style={{ color: category.hexColor }}
                                ></i>
                              </div>
                              <span className="text-light fw-semibold skill-name">{skill.name}</span>
                            </div>
                            <span
                              className="badge px-3 py-1 skill-level"
                              style={{
                                backgroundColor: category.hexColor,
                                color: "white"
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                          <div className="progress skill-progress" style={{
                            height: '10px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)'
                          }}>
                            <div
                              className="skill-progress-bar"
                              style={{
                                width: '0%',
                                borderRadius: '5px',
                                backgroundColor: category.hexColor,
                                height: '100%',
                                transition: 'width 0.8s ease-out'
                              }}
                              data-level={skill.level}
                            ></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="card-footer bg-transparent border-top border-info border-opacity-25 pt-3 skill-card-footer">
                    <small className="text-info opacity-75">
                      <i className="bi bi-info-circle me-1"></i>
                      <span className="skill-count">{category.skills?.length || 0}</span> skills listed
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row mt-5 pt-4 border-top border-info border-opacity-25 skills-cta">
            <div className="col-12">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 p-4 skills-cta-card">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-light mb-2 cta-title">Ready to take your project to the next level?</h5>
                    <p className="text-light opacity-75 mb-0 cta-description">
                      Let's work together to build something amazing with these technologies.
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0">
                    <a href="#contact" className="btn btn-info btn-lg cta-button">
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

      {/* Additional Programming Skills Section */}
      <section className="container-fluid py-5 additional-skills-section"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.95)), url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
        id="additional-skills"
      >
        <div className="container py-5">
          <div className="text-center mb-5">
            <h5 className="text-info mb-2">
              <i className="bi bi-code-slash me-2"></i>
              Additional Technical Skills
            </h5>
            <h2 className="fw-bold display-5 text-light mb-3">
              <span>More </span>
              <span className="text-info">Programming Languages</span>
            </h2>
            <p className="text-light opacity-75">
              Other programming languages and technologies I work with
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card bg-dark bg-opacity-50 border border-info border-opacity-25 rounded-4 shadow-lg p-4">
                <div className="row g-4">
                  {[
                    {
                      name: "JavaScript",
                      level: 90,
                      icon: "bi-filetype-js",
                      color: "#F0DB4F",
                      description: "Modern ES6+, Async/Await, Promises"
                    },
                    {
                      name: "TypeScript",
                      level: 80,
                      icon: "bi-filetype-ts",
                      color: "#007ACC",
                      description: "Interfaces, Types, Generics"
                    },
                    {
                      name: "Python",
                      level: 85,
                      icon: "bi-filetype-py",
                      color: "#3776AB",
                      description: "Django, Flask, Data Analysis"
                    },
                    {
                      name: "Java",
                      level: 75,
                      icon: "bi-filetype-java",
                      color: "#007396",
                      description: "Spring Boot, OOP, Multithreading"
                    },
                    {
                      name: "C++",
                      level: 70,
                      icon: "bi-filetype-cpp",
                      color: "#00599C",
                      description: "STL, Algorithms, Data Structures"
                    },
                    {
                      name: "SQL",
                      level: 85,
                      icon: "bi-database",
                      color: "#CC2927",
                      description: "MySQL, PostgreSQL, Query Optimization"
                    }
                  ].map((skill, index) => (
                    <div className="col-md-4 col-sm-6" key={index}>
                      <div className="card bg-dark bg-opacity-25 border border-info border-opacity-25 rounded-4 h-100 p-3 hover-lift">
                        <div className="d-flex align-items-center mb-3">
                          <div
                            className="rounded-circle p-2 me-3"
                            style={{
                              backgroundColor: `${skill.color}20`,
                              border: `1px solid ${skill.color}40`
                            }}
                          >
                            <i className={`bi ${skill.icon} fs-4`} style={{ color: skill.color }}></i>
                          </div>
                          <div>
                            <h5 className="text-light mb-0">{skill.name}</h5>
                            <span
                              className="badge px-3 py-1 mt-1"
                              style={{
                                backgroundColor: skill.color,
                                color: "white"
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                        <p className="text-light opacity-75 small mb-0">
                          {skill.description}
                        </p>
                        <div className="progress mt-3" style={{
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: '0%',
                              backgroundColor: skill.color,
                              transition: 'width 1s ease-out'
                            }}
                            data-level={skill.level}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-5 pt-4 border-top border-info border-opacity-25">
                  <p className="text-light mb-3">
                    <i className="bi bi-lightbulb text-info me-2"></i>
                    Always learning new languages and technologies to stay current with industry trends
                  </p>
                  <a href="#contact" className="btn btn-outline-info">
                    <i className="bi bi-chat-left-text me-2"></i>
                    Discuss a project using these technologies
                  </a>
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
          {projects
            // Create a copy of the array to avoid mutating the original
            .slice()
            // Sort projects by numeric ID in ascending order (1, 2, 3...)
            .sort((a, b) => {
              // Debug logging to see what's happening
              console.log('Sorting:', {
                aTitle: a.title,
                aId: a.id,
                aIdType: typeof a.id,
                bTitle: b.title,
                bId: b.id,
                bIdType: typeof b.id
              });
              
              // Parse IDs as numbers, handle empty/undefined/null cases
              const idA = a.id ? parseInt(a.id.toString().trim()) : 999999;
              const idB = b.id ? parseInt(b.id.toString().trim()) : 999999;
              
              // If both are not numbers, keep original order
              if (isNaN(idA) && isNaN(idB)) return 0;
              // If A is not a number, put it at the end
              if (isNaN(idA)) return 1;
              // If B is not a number, put it at the end
              if (isNaN(idB)) return -1;
              
              console.log('Parsed IDs:', { idA, idB, result: idA - idB });
              return idA - idB; // Ascending order: 1, 2, 3...
            })
            // Map through sorted projects
            .map((project) => {
              // Get the project ID as a number
              const projectId = project.id ? parseInt(project.id.toString().trim()) : null;
              const displayId = !isNaN(projectId) ? projectId : 'N/A';
              
              return (
                <div className="col-lg-4 col-md-6" key={project._id || project.id || displayId}>
                  <div className="card bg-dark bg-opacity-75 border border-info border-opacity-25 rounded-4 shadow-lg overflow-hidden h-100 hover-lift">
                    <div className="position-relative">
                      {/* Project number badge - shows actual ID */}
                      {!isNaN(projectId) && (
                        <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 1 }}>
                          <span className="badge bg-info bg-opacity-90 border border-info px-3 py-2 rounded-pill fw-bold shadow">
                            Project #{displayId}
                          </span>
                        </div>
                      )}
                      
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
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                        <div>
                          <h5 className="text-light fw-bold mb-1">
                            {project.title}
                            <span className="text-info blink-effect ms-1">_</span>
                          </h5>
                          {/* Show ID under title */}
                          <small className="text-info opacity-75">
                            <i className="bi bi-hash me-1"></i>
                            ID: {displayId}
                          </small>
                        </div>
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
                          style={{ transition: 'all 0.3s ease' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
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
                            overflow: 'hidden',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (project.live && project.live !== '#') {
                              window.open(project.live, '_blank');
                            }
                          }}
                          disabled={!project.live || project.live === '#'}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <span className="position-relative z-1">
                            <i className="bi bi-rocket-takeoff me-1 rocket-effect"></i>
                            Live Demo
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
              );
            })}
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

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="glass-modal"
      >
        <Modal.Header
          closeButton
          className="bg-dark bg-opacity-75 border-bottom border-info border-opacity-25"
        >
          <Modal.Title className="text-info fw-bold">
            <i className="bi bi-person-circle me-2"></i>
            Admin Login
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="bg-dark bg-opacity-50 text-light p-4">
          <div className="row">
            {/* Left Side - Login Form */}
            <div className="col-lg-6">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block mb-3">
                  <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle border border-info border-3 animate-pulse"></div>
                  <i className="bi bi-person-badge text-info" style={{ fontSize: '3.5rem' }}></i>
                </div>
                <h5 className="text-info mb-2">
                  <i className="bi bi-shield-lock me-2"></i>
                  Secure Login
                </h5>
                <p className="text-light opacity-75 small">
                  Admin can Access personalized dashboard
                </p>
              </div>

              <form>
                {/* Email Input */}
                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-light mb-2">
                    <i className="bi bi-envelope me-2 text-info"></i>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-info border-opacity-25">
                      <i className="bi bi-at text-info"></i>
                    </span>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control bg-dark bg-opacity-25 border border-info border-opacity-25 text-light"
                      id="email"
                      placeholder="name@example.com"
                      style={{
                        borderLeft: 'none',
                        boxShadow: '0 0 10px rgba(13, 202, 240, 0.1)'
                      }}
                    />
                  </div>
                  <div className="form-text text-info opacity-75">
                    <i className="bi bi-info-circle me-1"></i>
                    Enter your registered email
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label htmlFor="password" className="form-label text-light mb-2">
                    <i className="bi bi-key me-2 text-info"></i>
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-info border-opacity-25">
                      <i className="bi bi-lock text-info"></i>
                    </span>
                    <input value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control bg-dark bg-opacity-25 border border-info border-opacity-25 text-light"
                      id="password"
                      placeholder="••••••••"
                      style={{
                        borderLeft: 'none',
                        boxShadow: '0 0 10px rgba(13, 202, 240, 0.1)'
                      }}
                    />
                    <button
                      className="btn btn-outline-info border-info border-opacity-25"
                      type="button"
                      id="togglePassword"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                  <div className="form-text text-info opacity-75">
                    <i className="bi bi-shield-check me-1"></i>
                    Minimum 8 characters with special characters
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input bg-dark border-info"
                      type="checkbox"
                      id="rememberMe"
                    />
                    <label className="form-check-label text-light opacity-75" htmlFor="rememberMe">
                      <i className="bi bi-check-circle me-1"></i>
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-info text-decoration-none hover-glow">
                    <i className="bi bi-question-circle me-1"></i>
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button onClick={handleLogin}
                  type="button"
                  className="btn btn-info w-100 py-3 mb-3 shadow-lg hover-scale"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Only Admin Can Login to Dashboard
                </button>


              </form>
            </div>

            {/* Right Side - Features & Info */}
            <div className="col-lg-6 border-start border-info border-opacity-25 ps-lg-4">
              <div className="h-100 d-flex flex-column justify-content-center">
                <h5 className="text-info mb-4">
                  <i className="bi bi-stars me-2"></i>
                  Dashboard Features
                </h5>

                {[
                  {
                    icon: 'bi-speedometer2',
                    title: 'Analytics Dashboard',
                    desc: 'Real-time project metrics and insights'
                  },
                  {
                    icon: 'bi-folder-plus',
                    title: 'Project Management',
                    desc: 'Create and manage all your projects'
                  },
                  {
                    icon: 'bi-bar-chart',
                    title: 'Performance Reports',
                    desc: 'Detailed analytics and progress tracking'
                  },
                  {
                    icon: 'bi-bell',
                    title: 'Smart Notifications',
                    desc: 'Stay updated with important alerts'
                  }
                ].map((feature, index) => (
                  <div key={index} className="d-flex align-items-start mb-3 p-3 rounded-3 bg-dark bg-opacity-25 border border-info border-opacity-25 hover-glow">
                    <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                      <i className={`bi ${feature.icon} text-info`}></i>
                    </div>
                    <div>
                      <h6 className="text-light mb-1">{feature.title}</h6>
                      <p className="text-light opacity-75 small mb-0">{feature.desc}</p>
                    </div>
                  </div>
                ))}


              </div>
            </div>
          </div>
        </Modal.Body>


      </Modal>
    </div>
  );
};

export default Home;