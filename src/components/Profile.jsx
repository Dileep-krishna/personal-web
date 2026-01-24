import React, { useEffect, useState } from "react";
// 🤖 place image in same folder
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
 
function Profile() {
  const [showLinks, setShowLinks] = useState(false);
  

  useEffect(() => {
    // 1️⃣ Show social links first
    const linksTimer = setTimeout(() => {
      setShowLinks(true);
    }, 200);
        Swal.fire({
      title: "Welcome 🚀",
      text: "Explore My Portfolio.....",
      icon: "success",
      confirmButtonText: "Let's Go 😎",
      timer: 800,
      showConfirmButton: false,
    });

    // 2️⃣ Show robot after links
  
    return () => {
      clearTimeout(linksTimer);

    };
  }, []);
const navigate = useNavigate();

const handleHome = async () => {
  Swal.fire({
    title: "Welcome 🚀",
    text: "Redirecting to Home Page",
    icon: "success",
    confirmButtonText: "Let's Go 😎",
    timer: 1500,
    showConfirmButton: false
  }).then(() => {
    navigate("/home");
  });
};
//  Swal.fire({
//    title: "Welcome 🚀",
//     text: "Explore My Portfolio.....",
//     icon: "success",
//     confirmButtonText: "Let's Go 😎",
//     timer: 900,
//     showConfirmButton: false
//  })
   
 

  return (
    
    <div className="app"  style={{
    backgroundImage:
      "url(https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2018/11/dark-wallpapers.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  }}>
      <div className="container">
        {/* Decorative Elements */}
        <div className="decoration"></div>
        <div className="decoration"></div>
        <div className="decoration"></div>
        <div className="decoration"></div>

        <header className="header">
          <h1 className="title">Welcome to My Portfolio...</h1>
          <p className="subtitle">Connect with me through these platforms</p>
        </header>

        {/* Social Links */}
        <div className={`social-links ${showLinks ? "visible" : ""}`}>
          <a
            href="https://linkedin.com/in/dileepkrishna-t"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
          >
            <span>LinkedIn</span>
          </a>

         

          <a
            href="https://github.com/Dileep-krishna"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link github"
          >
            <span>GitHub</span>
          </a>

          <a
            href="https://instagram.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link instagram"
          >
            <span>Instagram</span>
          </a>
        </div>
<button onClick={handleHome} className="btn rounded-pill fs-5 mt-5 px-5 py-3 d-flex align-items-center justify-content-center gap-3 position-relative overflow-hidden mx-auto"
        style={{
          background: "rgba(255, 193, 7, 0.15)",
          backdropFilter: "blur(12px)",
          border: "2px solid rgba(255, 193, 7, 0.3)",
          transition: "all 0.4s ease",
          fontFamily: "'Inter', sans-serif",
          fontWeight: "700",
          color: "#FFD700",
          textShadow: "0 2px 10px rgba(255, 215, 0, 0.3)",
          boxShadow: "0 8px 32px rgba(255, 193, 7, 0.2)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 193, 7, 0.25)";
          e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.6)";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 15px 40px rgba(255, 193, 7, 0.35)";
          e.currentTarget.style.color = "#FFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 193, 7, 0.15)";
          e.currentTarget.style.borderColor = "rgba(255, 193, 7, 0.3)";
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(255, 193, 7, 0.2)";
          e.currentTarget.style.color = "#FFD700";
        }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" 
       style={{transition: "transform 0.3s ease"}}>
    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
  </svg>
  <span style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.1rem",
    letterSpacing: "1px",
    background: "linear-gradient(90deg, #FFD700, #FFF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }}>
    See What I Build
  </span>
</button>
      </div>

      {/* 🤖 Robot Side Assistant (appears AFTER links) */}
    
    </div>
  );
}

export default Profile;