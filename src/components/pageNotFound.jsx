import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// We'll create this CSS file

function PageNotFound() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  // Floating animation for background elements
  useEffect(() => {
    const createFloatingElement = () => {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.querySelector(".page-not-found-container")?.appendChild(element);
      
      // Remove element after animation completes
      setTimeout(() => element.remove(), 5000);
    };

    // Create initial floating elements
    for (let i = 0; i < 15; i++) {
      setTimeout(createFloatingElement, i * 300);
    }

    // Continuous creation of floating elements
    const interval = setInterval(createFloatingElement, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-not-found-container container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark text-light position-relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="animated-gradient"></div>
      
      {/* Floating particles background */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>

      <div className="text-center position-relative z-3">
        {/* Animated 404 text with glitch effect */}
        <h1 className="display-1 fw-bold text-danger glitch" data-text="404">
          404
        </h1>
        
        {/* Fade-in animation for subtitle */}
        <h3 className="mb-3 fade-in">Page Not Found</h3>
        
        {/* Typewriter animation for description */}
        <p className="text-muted mb-4 typewriter">
          The page you are looking for does not exist or you don't have access.
        </p>

        {/* Animated button with hover effects */}
        <button
          className={`btn btn-outline-info animated-button ${hover ? 'pulse' : ''}`}
          onClick={() => navigate("/")}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span className="button-text">Go to Home</span>
          <span className="button-icon">→</span>
        </button>

        {/* Optional: Animated graphic */}
        <div className="mt-5">
          <div className="broken-link-animation">
            <div className="chain"></div>
            <div className="broken-chain"></div>
          </div>
        </div>
      </div>

      {/* Floating elements will be injected here by useEffect */}
         <style jsx>{`
         /* PageNotFound.css */

/* Container styles */
.page-not-found-container {
  background: linear-gradient(-45deg, #0f0f23, #1a1a2e, #16213e, #0f3460);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

/* Animated gradient background */
.animated-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%);
  animation: pulse 8s ease-in-out infinite;
}

/* Gradient animation */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Pulse animation for gradient */
@keyframes pulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

/* Floating particles */
.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s linear infinite;
}

@keyframes float {
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
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Floating elements animation */
.floating-element {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(23, 162, 184, 0.3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 2;
  animation: floatElement 5s linear forwards;
}

@keyframes floatElement {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

/* Glitch effect for 404 text */
.glitch {
  position: relative;
  animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.glitch::before {
  animation: glitch-anim 5s infinite linear alternate-reverse;
  color: #0dcaf0;
  z-index: -1;
}

.glitch::after {
  animation: glitch-anim2 1s infinite linear alternate-reverse;
  color: #ff6b6b;
  z-index: -2;
}

@keyframes glitch-anim {
  0% { clip: rect(42px, 9999px, 44px, 0); }
  5% { clip: rect(12px, 9999px, 59px, 0); }
  10% { clip: rect(48px, 9999px, 29px, 0); }
  15% { clip: rect(42px, 9999px, 73px, 0); }
  20% { clip: rect(63px, 9999px, 27px, 0); }
  25% { clip: rect(34px, 9999px, 55px, 0); }
  30% { clip: rect(86px, 9999px, 73px, 0); }
  35% { clip: rect(20px, 9999px, 20px, 0); }
  40% { clip: rect(26px, 9999px, 60px, 0); }
  45% { clip: rect(25px, 9999px, 66px, 0); }
  50% { clip: rect(57px, 9999px, 98px, 0); }
  55% { clip: rect(5px, 9999px, 46px, 0); }
  60% { clip: rect(82px, 9999px, 31px, 0); }
  65% { clip: rect(54px, 9999px, 27px, 0); }
  70% { clip: rect(28px, 9999px, 99px, 0); }
  75% { clip: rect(45px, 9999px, 69px, 0); }
  80% { clip: rect(23px, 9999px, 85px, 0); }
  85% { clip: rect(54px, 9999px, 84px, 0); }
  90% { clip: rect(45px, 9999px, 47px, 0); }
  95% { clip: rect(37px, 9999px, 20px, 0); }
  100% { clip: rect(4px, 9999px, 91px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  5% { clip: rect(52px, 9999px, 74px, 0); }
  10% { clip: rect(79px, 9999px, 85px, 0); }
  15% { clip: rect(75px, 9999px, 5px, 0); }
  20% { clip: rect(67px, 9999px, 61px, 0); }
  25% { clip: rect(14px, 9999px, 79px, 0); }
  30% { clip: rect(1px, 9999px, 66px, 0); }
  35% { clip: rect(86px, 9999px, 30px, 0); }
  40% { clip: rect(23px, 9999px, 98px, 0); }
  45% { clip: rect(85px, 9999px, 72px, 0); }
  50% { clip: rect(71px, 9999px, 75px, 0); }
  55% { clip: rect(2px, 9999px, 48px, 0); }
  60% { clip: rect(30px, 9999px, 16px, 0); }
  65% { clip: rect(59px, 9999px, 50px, 0); }
  70% { clip: rect(41px, 9999px, 62px, 0); }
  75% { clip: rect(2px, 9999px, 82px, 0); }
  80% { clip: rect(47px, 9999px, 73px, 0); }
  85% { clip: rect(3px, 9999px, 27px, 0); }
  90% { clip: rect(40px, 9999px, 86px, 0); }
  95% { clip: rect(45px, 9999px, 73px, 0); }
  100% { clip: rect(22px, 9999px, 99px, 0); }
}

@keyframes glitch-skew {
  0% { transform: skew(0deg); }
  10% { transform: skew(2deg); }
  20% { transform: skew(-2deg); }
  30% { transform: skew(1deg); }
  40% { transform: skew(-1deg); }
  50% { transform: skew(0.5deg); }
  60% { transform: skew(-0.5deg); }
  70% { transform: skew(0.25deg); }
  80% { transform: skew(-0.25deg); }
  90% { transform: skew(0.1deg); }
  100% { transform: skew(0deg); }
}

/* Fade-in animation for subtitle */
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

.fade-in {
  animation: fadeIn 1s ease-out 0.5s both;
}

/* Typewriter animation for description */
.typewriter {
  overflow: hidden;
  border-right: 2px solid rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
  animation-fill-mode: both;
}

@keyframes typing {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes blink-caret {
  from, to { border-color: transparent; }
  50% { border-color: rgba(255, 255, 255, 0.75); }
}

/* Animated button */
.animated-button {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 12px 30px;
  border-width: 2px;
  font-weight: 600;
  letter-spacing: 1px;
}

.animated-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(13, 202, 240, 0.3);
}

.animated-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.animated-button:hover::before {
  left: 100%;
}

.button-icon {
  margin-left: 10px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.animated-button:hover .button-icon {
  transform: translateX(5px);
}

/* Pulse animation for button */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 0.5s ease-in-out;
}

/* Broken link animation */
.broken-link-animation {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
}

.chain {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid rgba(255, 107, 107, 0.5);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
}

.broken-chain {
  position: absolute;
  width: 80px;
  height: 80px;
  border: 3px solid transparent;
  border-top: 3px solid #ff6b6b;
  border-radius: 50%;
  animation: rotate 8s linear infinite reverse;
}

.broken-chain::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .typewriter {
    white-space: normal;
    border-right: none;
    animation: none;
  }
  
  .glitch {
    font-size: 3rem;
  }
}
         
         `}</style>
    </div>
  );
}

export default PageNotFound;