import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function AdminHome() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animated background effect
  useEffect(() => {
    setIsLoaded(true);
    
    // Create floating particles
    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "admin-particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.width = `${Math.random() * 5 + 2}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      
      document.querySelector('.admin-container')?.appendChild(particle);
      
      setTimeout(() => particle.remove(), 5000);
    };

    // Initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 200);
    }

    // Continuous particles
    const interval = setInterval(createParticle, 800);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Animated confirm dialog
    Swal.fire({
      title: "<span class='animated-text'>Logout?</span>",
      html: `<div class="swal-animation">
              <p class="swal-text">Do you want to logout from admin panel?</p>
              <div class="pulse-circle"></div>
            </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      background: "#1a1a1a",
      color: "#fff",
      customClass: {
        popup: 'animated-swal'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin");

        // Success animation
        Swal.fire({
          icon: "success",
          title: "<span class='success-text'>Logged out successfully</span>",
          timer: 1200,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#fff",
          willClose: () => {
            // Fade out animation before navigation
            document.querySelector('.admin-container')?.classList.add('fade-out');
            setTimeout(() => {
              navigate("/");
            }, 500);
          }
        });
      }
    });
  };

  return (
    <div className={`admin-container container-fluid bg-dark min-vh-100 text-light p-4 ${isLoaded ? 'loaded' : ''}`}>
      {/* Animated background elements */}
      <div className="admin-bg-animation"></div>
      <div className="grid-overlay"></div>
      
      {/* Header with animation */}
      <div className="d-flex justify-content-between align-items-center mb-4 fade-in-down">
        <h2 className="fw-bold text-info admin-title glitch" data-text="Admin Dashboard">
          Admin Dashboard
        </h2>
        <button 
          className="btn btn-outline-danger logout-btn animated-hover"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          <span className="btn-text">Logout</span>
          <span className="btn-sparkle"></span>
        </button>
      </div>

      {/* Welcome Card with animation */}
      <div className="card bg-secondary bg-opacity-25 border border-info mb-4 slide-in-left">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div className="welcome-icon">
              <i className="bi bi-hand-wave text-info"></i>
            </div>
            <div className="ms-3">
              <h4 className="text-info mb-2">
                <span className="typewriter">Welcome, Admin</span> 
                <span className="wave-animation">👋</span>
              </h4>
              <p className="text-light opacity-75 fade-in-text">
                Manage your profile, projects and skills from here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Cards with staggered animation */}
      <div className="row g-4 cards-container">
        {[
          {
            id: 1,
            icon: "bi-person-badge",
            title: "Profile Management",
            description: "Update admin profile details",
            route: "/admin-profile",
            delay: "0.1s"
          },
          {
            id: 2,
            icon: "bi-kanban",
            title: "Projects",
            description: "Add / Edit / Delete projects",
            route: "/admin-project",
            delay: "0.2s"
          },
          {
            id: 3,
            icon: "bi-tools",
            title: "Skills",
            description: "Manage skill sets",
            route: "/admin-skill",
            delay: "0.3s"
          }
        ].map((card, index) => (
          <div className="col-md-4" key={card.id}>
            <div 
              className="card bg-dark border border-info h-100 dashboard-card"
              style={{ animationDelay: card.delay }}
              onMouseEnter={(e) => e.currentTarget.classList.add('card-hover')}
              onMouseLeave={(e) => e.currentTarget.classList.remove('card-hover')}
            >
              <div className="card-body text-center">
                {/* Animated icon */}
                <div className="card-icon">
                  <i className={`bi ${card.icon} fs-1 text-info icon-animate`}></i>
                  <div className="icon-glow"></div>
                </div>
                
                {/* Title with animation */}
                <h5 className="mt-3 card-title">{card.title}</h5>
                
                {/* Description with fade-in */}
                <p className="text-muted mb-3 card-desc">{card.description}</p>
                
                {/* Animated button */}
                <button
                  className="btn btn-outline-info btn-sm manage-btn"
                  onClick={() => navigate(card.route)}
                >
                  <span className="btn-content">
                    <span>Manage</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </span>
                  <span className="btn-underline"></span>
                </button>
              </div>
              
              {/* Corner decoration */}
              <div className="card-corner top-left"></div>
              <div className="card-corner top-right"></div>
              <div className="card-corner bottom-left"></div>
              <div className="card-corner bottom-right"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar at bottom */}
      <div className="mt-5 pt-4 border-top border-secondary">
        <div className="row text-center">
          <div className="col-md-3">
            <div className="stat-item">
              <div className="stat-number text-info counter" data-target="3">0</div>
              <div className="stat-label text-muted">Sections</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <div className="stat-number text-info">
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="stat-label text-muted">Secured</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <div className="stat-number text-info counter" data-target="24">0</div>
              <div className="stat-label text-muted">Hours</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-item">
              <div className="stat-number text-info">
                <i className="bi bi-lightning-charge"></i>
              </div>
              <div className="stat-label text-muted">Fast</div>
            </div>
          </div>
        </div>
      </div>
        <style jsx>{`
        /* AdminHome.css */

/* Container animations */
.admin-container {
  position: relative;
  overflow-x: hidden;
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.admin-container.loaded {
  opacity: 1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-out {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* Background animations */
.admin-bg-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(13, 202, 240, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(220, 53, 69, 0.05) 0%, transparent 50%);
  animation: bgFloat 20s ease-in-out infinite;
  z-index: -1;
}

@keyframes bgFloat {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(20px, 20px);
  }
  66% {
    transform: translate(-20px, -20px);
  }
}

.grid-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(13, 202, 240, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(13, 202, 240, 0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: gridMove 40s linear infinite;
  z-index: -1;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(30px, 30px);
  }
}

/* Particle animation */
.admin-particle {
  position: absolute;
  background: rgba(13, 202, 240, 0.2);
  border-radius: 50%;
  pointer-events: none;
  animation: adminParticleFloat 5s linear forwards;
  z-index: 0;
}

@keyframes adminParticleFloat {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 0;
  }
}

/* Header animations */
.fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.admin-title {
  position: relative;
  display: inline-block;
}

.admin-title.glitch::before,
.admin-title.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.admin-title.glitch::before {
  animation: glitch-effect 3s infinite;
  color: #ff6b6b;
  z-index: -1;
}

.admin-title.glitch::after {
  animation: glitch-effect 2s infinite reverse;
  color: #17a2b8;
  z-index: -2;
}

@keyframes glitch-effect {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

/* Logout button animation */
.logout-btn {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
}

.logout-btn .btn-sparkle {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent 20%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 80%
  );
  transform: rotate(30deg);
  animation: sparkle 3s infinite;
}

@keyframes sparkle {
  0% {
    transform: translateX(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) rotate(30deg);
  }
}

/* Welcome card animation */
.slide-in-left {
  animation: slideInLeft 0.8s ease-out;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.welcome-icon {
  font-size: 2rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.typewriter {
  display: inline-block;
  overflow: hidden;
  border-right: 2px solid #0dcaf0;
  white-space: nowrap;
  animation: typing 3.5s steps(15, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: #0dcaf0; }
}

.wave-animation {
  display: inline-block;
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

.fade-in-text {
  animation: fadeInText 1s ease-out 1s both;
}

@keyframes fadeInText {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.75;
  }
}

/* Dashboard cards animation */
.cards-container {
  animation: cardsAppear 0.5s ease-out forwards;
}

@keyframes cardsAppear {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dashboard-card {
  position: relative;
  transition: all 0.4s ease;
  opacity: 0;
  animation: cardFadeIn 0.6s ease-out forwards;
  overflow: hidden;
}

@keyframes cardFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-card.card-hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(13, 202, 240, 0.2);
  border-color: #0dcaf0 !important;
}

.card-icon {
  position: relative;
  display: inline-block;
}

.icon-animate {
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.dashboard-card:hover .icon-animate {
  transform: scale(1.2);
}

.icon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(13, 202, 240, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.dashboard-card:hover .icon-glow {
  opacity: 1;
}

.card-title {
  position: relative;
  padding-bottom: 10px;
  transition: color 0.3s ease;
}

.card-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #0dcaf0;
  transition: width 0.3s ease;
}

.dashboard-card:hover .card-title::after {
  width: 50px;
}

.card-desc {
  transition: all 0.3s ease;
}

.dashboard-card:hover .card-desc {
  color: #fff !important;
}

/* Manage button animation */
.manage-btn {
  position: relative;
  overflow: hidden;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.manage-btn:hover {
  transform: translateY(-2px);
  background-color: #0dcaf0;
  color: #000 !important;
}

.btn-content {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}

.btn-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #0dcaf0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.manage-btn:hover .btn-underline {
  transform: scaleX(1);
}

/* Card corners animation */
.card-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #0dcaf0;
  opacity: 0;
  transition: all 0.3s ease;
}

.card-corner.top-left {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.card-corner.top-right {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.card-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.card-corner.bottom-right {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

.dashboard-card:hover .card-corner {
  opacity: 1;
  width: 20px;
  height: 20px;
}

/* Stats animation */
.stat-item {
  padding: 15px;
  transition: all 0.3s ease;
  border-radius: 10px;
}

.stat-item:hover {
  background: rgba(13, 202, 240, 0.1);
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-number i {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* SweetAlert custom animations */
.animated-swal {
  animation: swalPop 0.3s ease-out;
}

@keyframes swalPop {
  from {
    opacity: 0;
    transform: scale(0.8) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

.animated-text {
  display: inline-block;
  animation: textGlow 2s infinite;
}

@keyframes textGlow {
  0%, 100% {
    text-shadow: 0 0 5px #fff;
  }
  50% {
    text-shadow: 0 0 20px #ff6b6b, 0 0 30px #ff6b6b;
  }
}

.swal-animation {
  position: relative;
}

.pulse-circle {
  width: 50px;
  height: 50px;
  border: 3px solid #3085d6;
  border-radius: 50%;
  margin: 20px auto;
  animation: pulseCircle 1.5s infinite;
}

@keyframes pulseCircle {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

.success-text {
  display: inline-block;
  animation: successBounce 0.5s ease-out;
}

@keyframes successBounce {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Counter animation */
.counter {
  transition: all 0.5s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .typewriter {
    white-space: normal;
    border-right: none;
    animation: none;
  }
  
  .admin-title.glitch {
    font-size: 1.5rem;
  }
  
  .dashboard-card {
    margin-bottom: 20px;
  }
}
        `}</style>
    </div>
  );
}

export default AdminHome;