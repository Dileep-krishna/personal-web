import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Button, Modal, Container } from "react-bootstrap";
import { getAllCertificatesAPI } from "../services/allAPI";
import SERVERURL from "../services/serverUrl";
import { FaArrowLeft, FaDownload, FaExpand, FaTimes, FaFilePdf, FaCertificate, FaStar, FaRocket, FaTrophy, FaFire, FaMagic, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';

function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true); // Always show confetti
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getFullFileUrl = (fileUrl) => {
    if (!fileUrl) return "";
    return (
      SERVERURL +
      "/" +
      fileUrl
        .replace(/^Imguploads/i, "imguploads")
        .replace(/\\/g, "/")
        .replace(/ /g, "%20")
    );
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getAllCertificatesAPI();
        if (Array.isArray(response)) {
          setCertificates(response);
          console.log("Certificates fetched:", response);
        } else {
          console.warn("Unexpected response format:", response);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
        setTimeout(() => setAnimateIn(true), 100);
      }
    };

    fetchCertificates();
  }, []);

  const handleOpenModal = (cert) => {
    setSelectedCert(cert);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => setSelectedCert(null), 300);
  };

  const handleBack = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/motivational-composition-goal-achievement_23-2150490000.jpg?w=2000')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Responsive Celebration Effects */}
        <div className="infinite-celebration">
          {[...Array(isMobile ? 20 : 50)].map((_, i) => (
            <div
              key={i}
              className="celebration-particle"
              style={{
                position: "absolute",
                fontSize: `${isMobile ? 8 : 10 + Math.random() * 20}px`,
                color: ['#667eea', '#764ba2', '#ffd200', '#38ef7d', '#f7971e'][i % 5],
                animation: `particleFloat ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: 1,
                opacity: isMobile ? 0.5 : 0.7,
              }}
            >
              {['⭐', '✨', '🎉', '🎊', '🏆', '💫', '🌟', '🔥'][i % 8]}
            </div>
          ))}
        </div>

        <div style={{ zIndex: 2, textAlign: "center", position: "relative", width: isMobile ? "90%" : "auto" }}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "20px",
              padding: isMobile ? "20px" : "40px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          >
            <Spinner
              animation="border"
              variant="light"
              style={{ width: isMobile ? "3rem" : "4rem", height: isMobile ? "3rem" : "4rem" }}
            />
            <h4
              className="mt-4 text-white"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
                fontWeight: "bold",
                fontSize: isMobile ? "1.2rem" : "1.5rem",
              }}
            >
              Loading Achievements...
            </h4>
            <p 
              className="text-light mt-2" 
              style={{ 
                textShadow: "0 1px 5px rgba(0,0,0,0.8)",
                fontSize: isMobile ? "0.9rem" : "1rem"
              }}
            >
              Preparing your success gallery
            </p>
          </div>
        </div>

        <style>{`
          @keyframes particleFloat {
            0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
            50% { transform: translateY(-30px) rotate(180deg) scale(1.2); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-photo/motivational-composition-goal-achievement_23-2150490000.jpg?w=2000')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: isMobile ? "scroll" : "fixed",
        minHeight: "100vh",
        padding: isMobile ? "10px" : "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Responsive Confetti */}
      {showConfetti && !isMobile && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={isMobile ? 100 : 300}
          gravity={0.05}
          colors={['#667eea', '#764ba2', '#11998e', '#38ef7d', '#f7971e', '#ffd200', '#ffffff']}
          style={{ position: 'fixed', zIndex: 1 }}
        />
      )}

      {/* Responsive Celebration Particles */}
      <div className="infinite-celebration-particles">
        {[...Array(isMobile ? 30 : 100)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="floating-particle"
            style={{
              position: "fixed",
              fontSize: `${isMobile ? 6 : 8 + Math.random() * 15}px`,
              color: i % 7 === 0 ? '#667eea' : 
                     i % 7 === 1 ? '#764ba2' : 
                     i % 7 === 2 ? '#ffd200' : 
                     i % 7 === 3 ? '#38ef7d' : 
                     i % 7 === 4 ? '#f7971e' : 
                     i % 7 === 5 ? '#ffffff' : '#ff6b6b',
              animation: `floatingParticle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: isMobile ? 0.4 : 0.6,
              zIndex: 2,
              filter: 'drop-shadow(0 0 5px currentColor)',
              display: isMobile ? (i < 15 ? 'block' : 'none') : 'block',
            }}
          >
            {['⭐', '✨', '🎉', '🎊', '🏆', '💫', '🌟', '🔥', '⚡', '💎'][i % 10]}
          </div>
        ))}
      </div>

      {/* Responsive Special Effects - Reduced on mobile */}
      {!isMobile && (
        <div className="special-effects">
          {/* Rotating Crowns */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`crown-${i}`}
              style={{
                position: "fixed",
                fontSize: "40px",
                color: "#ffd700",
                animation: `rotateCrown ${15 + i * 2}s linear infinite`,
                top: `${20 + i * 15}%`,
                left: `${10 + i * 15}%`,
                zIndex: 2,
                filter: 'drop-shadow(0 0 10px gold)',
              }}
            >
              <FaCrown />
            </div>
          ))}

          {/* Flying Rockets */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`rocket-${i}`}
              style={{
                position: "fixed",
                fontSize: "30px",
                color: "#667eea",
                animation: `flyRocket ${20 + i * 5}s linear infinite`,
                animationDelay: `${i * 3}s`,
                top: `${80 + i * 10}%`,
                left: `-50px`,
                zIndex: 2,
                transform: 'rotate(45deg)',
              }}
            >
              <FaRocket />
            </div>
          ))}

          {/* Magical Sparks */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`spark-${i}`}
              style={{
                position: "fixed",
                fontSize: "20px",
                color: "#38ef7d",
                animation: `magicSpark ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: 2,
                opacity: 0.8,
              }}
            >
              <FaMagic />
            </div>
          ))}
        </div>
      )}

      {/* Main Content Container */}
      <Container fluid className="px-0 px-md-3">
        <div
          style={{
            position: "relative",
            zIndex: 3,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: isMobile ? "20px" : "30px",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            margin: isMobile ? "10px" : "20px",
            padding: isMobile ? "15px" : "30px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            minHeight: "calc(100vh - 40px)",
            backdropFilter: "none",
          }}
        >
          {/* Responsive Back Button and Header */}
          <div
            className="d-flex flex-column flex-md-row align-items-center justify-content-center mb-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              borderRadius: "20px",
              padding: isMobile ? "15px" : "20px",
              border: "2px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Button
              variant="light"
              onClick={handleBack}
              className="me-md-3 mb-3 mb-md-0 d-flex align-items-center justify-content-center"
              style={{
                borderRadius: "50px",
                padding: isMobile ? "10px 20px" : "12px 25px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                color: "white",
                fontWeight: "bold",
                transition: "all 0.3s",
                boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateX(-5px) scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 10px 25px rgba(102, 126, 234, 0.7)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #764ba2, #667eea)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateX(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(102, 126, 234, 0.4)";
                  e.currentTarget.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
                }
              }}
            >
              <FaArrowLeft className="me-2" /> Back
            </Button>

            <div className="flex-grow-1 text-center">
              <h1
                className={`fw-bold mb-2 animate__animated animate__pulse animate__infinite ${isMobile ? 'h3' : 'display-5'}`}
                style={{
                  color: "white",
                  textShadow: "0 3px 15px rgba(0,0,0,0.8)",
                  letterSpacing: "1px",
                  fontSize: isMobile ? "1.8rem" : "inherit",
                }}
              >
                <FaCertificate className="me-3" style={{ color: "#ffd200" }} />
                {isMobile ? "ACHIEVEMENTS" : "ACHIEVEMENT GALLERY"}
              </h1>
              <p
                className="mb-0"
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                  fontSize: isMobile ? "0.9rem" : "1.1rem",
                }}
              >
                {certificates.length} Milestones of Excellence
              </p>
            </div>
          </div>

          {/* Responsive Achievement Counter */}
          <div className="d-flex justify-content-center align-items-center mb-4 mb-md-5">
            <Card
              className="shadow-lg text-center animate__animated animate__heartBeat animate__infinite"
              style={{
                padding: isMobile ? "20px 30px" : "30px 50px",
                background: "rgba(0, 0, 0, 0.6)",
                border: "3px solid rgba(255, 215, 0, 0.5)",
                borderRadius: "25px",
                color: "white",
                width: isMobile ? "90%" : "380px",
                position: "relative",
                overflow: "visible",
                boxShadow: "0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Glowing Effect */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "-10px",
                  right: "-10px",
                  bottom: "-10px",
                  background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)",
                  borderRadius: "30px",
                  zIndex: -1,
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />
              
              <FaTrophy 
                size={isMobile ? 50 : 70} 
                className="mb-3" 
                style={{ color: "#ffd700", filter: "drop-shadow(0 0 10px gold)" }} 
              />
              <h2
                className="fw-bold mb-2"
                style={{
                  color: "#ffffff",
                  textShadow: "0 5px 20px rgba(255, 215, 0, 0.8)",
                  background: "linear-gradient(45deg, #ffd700, #ffffff, #ffd700)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: isMobile ? "2.5rem" : "3.5rem",
                }}
              >
                {certificates.length}
              </h2>
              <p
                className="mb-2 fw-semibold"
                style={{
                  fontSize: isMobile ? "1rem" : "1.2rem",
                  color: "#ffd700",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                MILESTONES CONQUERED
              </p>
              <small className="text-light opacity-75" style={{ fontSize: isMobile ? "0.8rem" : "inherit" }}>
                Every click unleashes celebration!
              </small>
            </Card>
          </div>

          {certificates.length === 0 ? (
            <div
              className="text-center py-5"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "25px",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div
                className="mb-4"
                style={{
                  color: "#ffffff",
                  textShadow: "0 5px 15px rgba(0,0,0,0.8)",
                  fontSize: isMobile ? "3rem" : "4rem",
                }}
              >
                📄
              </div>
              <h3
                className={isMobile ? "h4" : "h3"}
                style={{
                  color: "white",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                Your Journey Begins Here
              </h3>
              <p
                className="text-light"
                style={{
                  opacity: 0.9,
                  fontSize: isMobile ? "0.9rem" : "inherit",
                }}
              >
                Start collecting achievements today!
              </p>
            </div>
          ) : (
            <Row className="g-3 g-md-4 justify-content-center">
              {certificates.map((cert, index) => {
                const fullUrl = getFullFileUrl(cert.fileUrl);
                const isImage = cert.fileType.startsWith("image");

                return (
                  <Col
                    key={cert._id}
                    xl={4}
                    lg={4}
                    md={6}
                    sm={12}
                    xs={12}
                    className="animate__animated animate__fadeInUp mb-3 mb-md-0"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animationDuration: "0.8s",
                    }}
                  >
                    {/* Responsive Certificate Frame */}
                    <div
                      className="certificate-frame position-relative h-100"
                      style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        borderRadius: isMobile ? "15px" : "25px",
                        border: "3px solid rgba(255, 255, 255, 0.2)",
                        cursor: "pointer",
                        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: "scale(1)",
                        overflow: "hidden",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                        position: "relative",
                        height: isMobile ? "auto" : "100%",
                        marginBottom: isMobile ? "15px" : "0",
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = "scale(1.08) translateY(-15px)";
                          e.currentTarget.style.boxShadow = "0 30px 60px rgba(102, 126, 234, 0.6)";
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
                          e.currentTarget.style.borderWidth = "4px";
                          
                          // Create particle burst effect
                          for(let i = 0; i < 10; i++) {
                            const particle = document.createElement('div');
                            particle.style.cssText = `
                              position: absolute;
                              width: 8px;
                              height: 8px;
                              background: radial-gradient(circle, #ffd200 0%, transparent 70%);
                              border-radius: 50%;
                              pointer-events: none;
                              animation: particleBurst 0.8s ease-out forwards;
                              left: ${Math.random() * 100}%;
                              top: ${Math.random() * 100}%;
                              z-index: 10;
                            `;
                            e.currentTarget.appendChild(particle);
                            setTimeout(() => particle.remove(), 800);
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
                          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                          e.currentTarget.style.borderWidth = "3px";
                        }
                      }}
                      onClick={() => handleOpenModal(cert)}
                    >
                      {/* Glowing Effect */}
                      <div
                        className="certificate-glow"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "radial-gradient(circle at center, rgba(255,215,0,0.1) 0%, transparent 70%)",
                          opacity: 0,
                          transition: "opacity 0.3s",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Certificate Badge */}
                      <div className="position-absolute top-0 end-0 m-2 m-md-3">
                        <span
                          className="badge px-2 px-md-3 py-1 py-md-2 fw-bold"
                          style={{
                            background: isImage 
                              ? "linear-gradient(135deg, #11998e, #38ef7d)" 
                              : "linear-gradient(135deg, #667eea, #764ba2)",
                            color: "white",
                            fontSize: isMobile ? "0.7rem" : "0.8rem",
                            border: "2px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
                          }}
                        >
                          {isImage ? "🏆 IMG" : "📄 PDF"}
                        </span>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-3 p-md-4 h-100 d-flex flex-column">
                        <div className="text-center mb-2 mb-md-3">
                          <div
                            className="mb-2"
                            style={{
                              color: isImage ? "#38ef7d" : "#667eea",
                              filter: "drop-shadow(0 0 10px currentColor)",
                              fontSize: isMobile ? "2.5rem" : "3.5rem",
                            }}
                          >
                            {isImage ? "🏆" : "📄"}
                          </div>
                          <h5
                            className={`fw-bold ${isMobile ? 'h6' : 'h5'}`}
                            title={cert.title}
                            style={{
                              color: "white",
                              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                              minHeight: isMobile ? "2.5rem" : "3rem",
                              fontSize: isMobile ? "0.9rem" : "1rem",
                            }}
                          >
                            {cert.title.length > (isMobile ? 30 : 40)
                              ? cert.title.substring(0, isMobile ? 30 : 40) + "..."
                              : cert.title}
                          </h5>
                        </div>

                        {/* Preview Area */}
                        <div
                          className="certificate-preview flex-grow-1 d-flex align-items-center justify-content-center mb-2 mb-md-3"
                          style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            borderRadius: "10px",
                            minHeight: isMobile ? "150px" : "200px",
                            overflow: "hidden",
                            border: "2px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {isImage ? (
                            <img
                              src={fullUrl}
                              alt={cert.title}
                              style={{
                                maxHeight: isMobile ? "150px" : "200px",
                                maxWidth: "100%",
                                objectFit: "contain",
                                borderRadius: "10px",
                                boxShadow: "0 10px 20px rgba(0,0,0,0.5)",
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.parentElement.innerHTML = `
                                  <div class="text-center text-light" style="padding: ${isMobile ? '10px' : '20px'};">
                                    <div class="mb-2" style="font-size: ${isMobile ? '2rem' : '3rem'}; color: #667eea;">📷</div>
                                    <small>Preview not available</small>
                                  </div>
                                `;
                              }}
                            />
                          ) : (
                            <div className="text-center">
                              <FaFilePdf
                                size={isMobile ? 60 : 80}
                                className="mb-2 mb-md-3"
                                style={{
                                  color: "#ff6b6b",
                                  filter: "drop-shadow(0 0 15px #ff6b6b)",
                                }}
                              />
                              <p className="text-light mb-0" style={{ fontSize: isMobile ? "0.9rem" : "inherit" }}>PDF Document</p>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2 mt-auto">
                          <Button
                            variant="primary"
                            size={isMobile ? "sm" : "sm"}
                            className="flex-grow-1 d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              background: "linear-gradient(135deg, #667eea, #764ba2)",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderRadius: "8px",
                              fontSize: isMobile ? "0.8rem" : "0.9rem",
                              boxShadow: "0 5px 15px rgba(102, 126, 234, 0.4)",
                              padding: isMobile ? "0.5rem" : "0.75rem",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(cert);
                            }}
                          >
                            <FaExpand className="me-2" /> {isMobile ? "VIEW" : "PREVIEW"}
                          </Button>
                          <Button
                            variant="warning"
                            size={isMobile ? "sm" : "sm"}
                            className="d-flex align-items-center justify-content-center fw-bold"
                            style={{
                              width: isMobile ? "40px" : "50px",
                              borderRadius: "8px",
                              background: "linear-gradient(135deg, #ffd200, #f7971e)",
                              border: "2px solid rgba(255,255,255,0.3)",
                              boxShadow: "0 5px 15px rgba(255, 215, 0, 0.4)",
                              padding: isMobile ? "0.5rem" : "0.75rem",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(fullUrl, "_blank");
                            }}
                          >
                            <FaDownload style={{ color: "white" }} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </Container>

      {/* Responsive Modal for Certificate Preview */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        size={isMobile ? "lg" : "xl"}
        centered
        className="animate__animated animate__zoomIn"
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        dialogClassName={isMobile ? "m-2" : ""}
      >
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            borderBottom: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <Modal.Title className={`fw-bold ${isMobile ? "h6" : ""}`} style={{ fontSize: isMobile ? "1rem" : "inherit" }}>
            <FaCertificate className="me-2" />
            {selectedCert?.title.length > (isMobile ? 30 : 50) 
              ? selectedCert?.title.substring(0, isMobile ? 30 : 50) + "..."
              : selectedCert?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="p-0"
          style={{
            maxHeight: isMobile ? "70vh" : "80vh",
            overflow: "auto",
          }}
        >
          {selectedCert && (
            <div
              className="certificate-viewer p-2 p-md-4"
              style={{
                background: "rgba(0,0,0,0.7)",
              }}
            >
              <div
                className="certificate-frame-large p-2 p-md-4"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "15px",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                }}
              >
                {selectedCert.fileType.startsWith("image") ? (
                  <img
                    src={getFullFileUrl(selectedCert.fileUrl)}
                    alt={selectedCert.title}
                    style={{
                      width: "100%",
                      maxHeight: isMobile ? "50vh" : "70vh",
                      objectFit: "contain",
                      borderRadius: "10px",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.6)",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="text-center py-5 text-light">
                          <div class="display-1 mb-3">❌</div>
                          <h5>Image not available</h5>
                          <p class="text-muted">Unable to load the certificate image</p>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="text-center py-4 py-md-5 text-light">
                    <FaFilePdf size={isMobile ? 70 : 100} className="text-danger mb-3 mb-md-4" style={{ filter: "drop-shadow(0 0 20px #dc3545)" }} />
                    <h4 className={`fw-bold ${isMobile ? "h5" : ""}`}>PDF Document</h4>
                    <p className="text-muted mb-3 mb-md-4" style={{ fontSize: isMobile ? "0.9rem" : "inherit" }}>
                      This certificate is in PDF format
                    </p>
                    <a
                      href={getFullFileUrl(selectedCert.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-danger fw-bold ${isMobile ? "btn-md" : "btn-lg"}`}
                      style={{
                        background: "linear-gradient(135deg, #dc3545, #c82333)",
                        border: "none",
                        padding: isMobile ? "10px 20px" : "12px 30px",
                        borderRadius: "50px",
                        boxShadow: "0 10px 25px rgba(220, 53, 69, 0.5)",
                      }}
                    >
                      <FaDownload className="me-2" /> {isMobile ? "OPEN" : "OPEN PDF"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            background: "rgba(0,0,0,0.8)",
            borderTop: "2px solid rgba(255,255,255,0.2)",
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            size={isMobile ? "sm" : "md"}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "2px solid rgba(255,255,255,0.3)",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <FaTimes className="me-2" /> CLOSE
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              window.open(getFullFileUrl(selectedCert?.fileUrl), "_blank")
            }
            size={isMobile ? "sm" : "md"}
            style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              border: "none",
              fontWeight: "bold",
              boxShadow: "0 5px 20px rgba(102, 126, 234, 0.5)",
            }}
          >
            <FaDownload className="me-2" /> DOWNLOAD
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
          }
          
          @keyframes particleBurst {
            0% { transform: translate(0, 0) scale(0); opacity: 1; }
            100% { transform: translate(var(--tx, 0), var(--ty, -50px)) scale(1.5); opacity: 0; }
          }
          
          @keyframes floatingParticle {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
          }
          
          @keyframes rotateCrown {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes flyRocket {
            0% { transform: translateX(-50px) rotate(45deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(calc(100vw + 100px)) rotate(45deg); opacity: 0; }
          }
          
          @keyframes magicSpark {
            0%, 100% { transform: scale(1); opacity: 0.3; }
            50% { transform: scale(1.5); opacity: 0.8; }
          }
          
          .certificate-frame:hover .certificate-glow {
            opacity: ${isMobile ? '0' : '1'};
          }
          
          .certificate-frame {
            animation: ${isMobile ? 'none' : 'gentleFloat 6s ease-in-out infinite'};
          }
          
          @keyframes gentleFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .certificate-frame {
              margin-bottom: 15px !important;
            }
            
            .display-5 {
              font-size: 1.8rem !important;
            }
            
            .display-4 {
              font-size: 2.5rem !important;
            }
            
            .display-3 {
              font-size: 2rem !important;
            }
          }
          
          @media (max-width: 576px) {
            .certificate-frame {
              border-radius: 15px !important;
              padding: 15px !important;
            }
            
            h1, .h1 {
              font-size: 1.5rem !important;
            }
            
            h2, .h2 {
              font-size: 1.8rem !important;
            }
            
            h3, .h3 {
              font-size: 1.3rem !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Certificate;