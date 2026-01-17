import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Resume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/getResume")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch resume");
        return res.json();
      })
      .then((data) => {
        setResume(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setResume(null);
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => setFadeIn(true), 100);
      });
  }, []);

  const handleBack = () => {
    navigate("/home");
  };

  if (loading)
    return (
      <div
        style={{
          backgroundImage:
            "url(https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2024/04/ai_resume_builder.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.1)",
            padding: "40px",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "6px solid rgba(255, 255, 255, 0.3)",
              borderTop: "6px solid #ffffff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px auto",
            }}
          />
          <p
            style={{
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            Loading resume...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );

  const containerStyle = {
    backgroundImage:
      "url(https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2024/04/ai_resume_builder.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "40px 20px",
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.8s ease, transform 0.8s ease",
  };

  const backButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
    padding: "12px 24px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  };

  const titleStyle = {
    color: "#ffffff",
    fontSize: "48px",
    fontWeight: "700",
    marginBottom: "10px",
    textAlign: "center",
    letterSpacing: "1px",
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
  };

  const subtitleStyle = {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "18px",
    textAlign: "center",
    marginBottom: "40px",
    fontStyle: "italic",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  };

  const filenameStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "15px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    marginBottom: "30px",
    backdropFilter: "blur(10px)",
  };

  const filenameTextStyle = {
    color: "#ffffff",
    fontSize: "16px",
    margin: "0",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  };

  const downloadButtonStyle = {
    display: "inline-block",
    marginBottom: "40px",
    padding: "16px 32px",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: "white",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "600",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.3)",
  };

  const previewContainerStyle = {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    height: "700px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(5px)",
  };

  const errorStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    maxWidth: "500px",
    margin: "100px auto",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const errorTextStyle = {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "20px",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
  };

  const noResumeStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: "40px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    maxWidth: "500px",
    margin: "100px auto",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const noResumeTextStyle = {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "500",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
  };

  const contentContainerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px",
  };

  if (error)
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <div
            style={{
              fontSize: "48px",
              color: "#ffffff",
              marginBottom: "20px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            ⚠️
          </div>
          <p style={errorTextStyle}>Error: {error}</p>
          <button
            onClick={handleBack}
            style={{
              ...backButtonStyle,
              marginTop: "20px",
              marginBottom: "0",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
              e.target.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.color = "#ffffff";
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );

  if (!resume)
    return (
      <div style={containerStyle}>
        <div style={noResumeStyle}>
          <div
            style={{
              fontSize: "48px",
              color: "#ffffff",
              marginBottom: "20px",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            📄
          </div>
          <p style={noResumeTextStyle}>No resume found.</p>
          <button
            onClick={handleBack}
            style={{
              ...backButtonStyle,
              marginTop: "20px",
              marginBottom: "0",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
              e.target.style.color = "#ffffff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.color = "#ffffff";
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );

  return (
    <div style={containerStyle}>
      <div style={contentContainerStyle}>
        <button
          onClick={handleBack}
          style={backButtonStyle}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
            e.target.style.color = "#ffffff";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
            e.target.style.color = "#ffffff";
          }}
        >
          ← Back
        </button>

        <h2 style={titleStyle}>My Resume</h2>
        <p style={subtitleStyle}>Professional Portfolio & Experience</p>

        <div style={filenameStyle}>
          <p style={filenameTextStyle}>
            <strong>Filename:</strong> {resume.filename}
          </p>
        </div>

        <div style={{ textAlign: "center" }}>
          <a
            href={`http://localhost:4000${resume.filepath}`}
            target="_blank"
            rel="noopener noreferrer"
            download={resume.filename}
            style={downloadButtonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            📥 Download Resume
          </a>
        </div>

        <div style={previewContainerStyle}>
          <iframe
            src={`http://localhost:4000${resume.filepath}`}
            title="Resume Preview"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Resume;