import React, { useEffect, useState } from "react";

function Resume() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading resume...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!resume) return <p>No resume found.</p>;

  return (
    <div>
      <h2>My Resume</h2>
      <p>
        <strong>Filename:</strong> {resume.filename}
      </p>

      {/* Download link */}
      <a
        href={`http://localhost:4000${resume.filepath}`}
        target="_blank"
        rel="noopener noreferrer"
        download={resume.filename}
        style={{
          display: "inline-block",
          marginBottom: "20px",
          padding: "8px 12px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        Download Resume
      </a>

      {/* PDF Preview */}
      <div style={{ border: "1px solid #ccc", height: "600px" }}>
        <iframe
          src={`http://localhost:4000${resume.filepath}`}
          title="Resume Preview"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}

export default Resume;
