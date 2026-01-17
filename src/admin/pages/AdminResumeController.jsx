import { useState, useEffect } from "react";
import { Button, Modal, Form, Spinner, Alert, Card, Container } from "react-bootstrap";
import {
  uploadResumeAPI,
  getResumeAPI,
  updateResumeAPI,
  deleteResumeAPI,
} from "../../services/allAPI"; // Adjust path as needed
import { FaFilePdf, FaFileWord, FaUpload, FaEdit, FaTrash, FaEye } from "react-icons/fa";

function ResumeModal() {
  const [show, setShow] = useState(false);
  const [resume, setResume] = useState(null); // Loaded resume from backend
  const [file, setFile] = useState(null); // Selected file for upload/update
  const [isEditing, setIsEditing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Page background style
  const pageBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://png.pngtree.com/thumb_back/fw800/background/20230613/pngtree-professional-resume-templates-that-you-can-customize-image_2974655.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '40px 20px',
  };

  // Modal background style
  const modalBackgroundStyle = {
    backgroundImage: `linear-gradient(), url('https://png.pngtree.com/thumb_back/fw800/background/20230613/pngtree-professional-resume-templates-that-you-can-customize-image_2974655.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const handleClose = () => {
    console.log("Modal closed");
    setShow(false);
    setIsEditing(false);
    setFile(null);
    setError(null);
  };

  const handleShow = () => {
    console.log("Modal opened - fetching resume");
    setShow(true);
  };

  useEffect(() => {
    if (show) {
      setLoading(true);
      getResumeAPI()
        .then((res) => {
          console.log("Resume fetched:", res);
          setResume(res); // Set directly because backend returns resume object
        })
        .catch((err) => {
          console.error("Error fetching resume:", err);
          setResume(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [show]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
  };

  const handleSave = async () => {
    if (!file) {
      setError("Please select a file first.");
      console.warn("Save aborted: No file selected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!resume || !resume._id) {
        console.log("Uploading new resume...");
        const res = await uploadResumeAPI(file);
        console.log("Upload response:", res);
        setResume(res); // set response directly
      } else {
        console.log(`Updating resume ID: ${resume._id}...`);
        const res = await updateResumeAPI(resume._id, file);
        console.log("Update response:", res);
        setResume(res); // set response directly
      }
      setFile(null);
      setIsEditing(false);
      console.log("Save completed successfully");
    } catch (err) {
      console.error("Error saving resume:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!resume) {
      console.warn("Delete aborted: No resume to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete the resume?")) {
      console.log("Delete cancelled by user");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!resume._id) throw new Error("Resume ID missing, cannot delete.");
      console.log(`Deleting resume ID: ${resume._id}...`);
      await deleteResumeAPI(resume._id);
      console.log("Delete successful");
      setResume(null);
      setFile(null);
      setIsEditing(false);
    } catch (err) {
      console.error("Error deleting resume:", err);
      setError(err.message || "Failed to delete resume");
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (filename) => {
    if (filename?.toLowerCase().endsWith('.pdf')) return <FaFilePdf className="text-danger me-2" />;
    if (filename?.toLowerCase().endsWith('.doc') || filename?.toLowerCase().endsWith('.docx')) 
      return <FaFileWord className="text-primary me-2" />;
    return <FaFilePdf className="text-secondary me-2" />;
  };

  return (
    <div style={pageBackgroundStyle}>
      <Container className="text-center py-5">
        {/* Hero Section */}
        <div className="mb-5">
          <h1 className="text-white display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
            Resume Management Portal
          </h1>
          <p className="text-light lead mb-4 animate__animated animate__fadeInUp" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Upload, manage, and update your professional resume with ease. Keep your career documents organized and accessible.
          </p>
        </div>

        {/* Main Action Card */}
        <Card className="border-0 shadow-lg mb-5 animate__animated animate__zoomIn" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                maxWidth: '500px', 
                margin: '0 auto',
                borderRadius: '15px',
                overflow: 'hidden'
              }}>
          <Card.Body className="p-5">
            <div className="mb-4">
              <div className="display-1 text-primary mb-3">
                <FaFilePdf />
              </div>
              <h2 className="fw-bold mb-3">Your Professional Resume</h2>
              <p className="text-muted">
                Manage your resume in one place. Upload new versions, update existing files, or download when needed.
              </p>
            </div>
            
            <div className="d-flex justify-content-center my-4">
              <Button 
                variant="primary" 
                onClick={handleShow} 
                className="d-flex align-items-center gap-2 px-5 py-3 fw-bold"
                size="lg"
                style={{
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.4)';
                }}
              >
                <FaFilePdf /> Manage Resume
              </Button>
            </div>

            {/* Features List */}
            <div className="row mt-4 text-start">
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle p-2 me-3">
                    <FaUpload />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Easy Upload</h6>
                    <p className="text-muted small mb-0">Upload PDF, DOC, DOCX files</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-success text-white rounded-circle p-2 me-3">
                    <FaEye />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Preview & Download</h6>
                    <p className="text-muted small mb-0">View and download anytime</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-warning text-white rounded-circle p-2 me-3">
                    <FaEdit />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Easy Updates</h6>
                    <p className="text-muted small mb-0">Update your resume anytime</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="d-flex align-items-center">
                  <div className="bg-danger text-white rounded-circle p-2 me-3">
                    <FaTrash />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Safe Management</h6>
                    <p className="text-muted small mb-0">Secure delete option</p>
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Info Section */}
        <div className="text-white mt-5">
          <h4 className="mb-4">Why Manage Your Resume Here?</h4>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-3 h-100">
                <h5 className="fw-bold">Professional</h5>
                <p className="small mb-0">Keep your resume in professional formats</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-3 h-100">
                <h5 className="fw-bold">Accessible</h5>
                <p className="small mb-0">Access from anywhere, anytime</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-3 h-100">
                <h5 className="fw-bold">Secure</h5>
                <p className="small mb-0">Your documents are securely stored</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="bg-white bg-opacity-10 p-4 rounded-3 h-100">
                <h5 className="fw-bold">Organized</h5>
                <p className="small mb-0">All your career documents in one place</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal (same as before) */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header 
          closeButton 
          style={modalBackgroundStyle}
          className="border-bottom"
        >
          <Modal.Title className="fw-bold text-dark">Resume Management</Modal.Title>
        </Modal.Header>

        <Modal.Body 
          className="py-4"
          style={modalBackgroundStyle}
        >
          {loading && (
            <div className="text-center my-4 py-4">
              <Spinner animation="border" variant="primary" size="lg" />
              <p className="mt-3 text-muted">Loading resume information...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="d-flex align-items-center">
              <div className="me-2">⚠️</div>
              <div>{error}</div>
            </Alert>
          )}

          {!loading && (!resume || isEditing) && (
            <div className="border rounded p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <Form>
                <Form.Group>
                  <Form.Label className="fw-bold mb-3 d-flex align-items-center">
                    <FaUpload className="me-2 text-primary" /> Upload Resume
                  </Form.Label>
                  <div className="border-dashed p-5 text-center rounded" style={{ border: '2px dashed #007bff', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <Form.Control
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={loading}
                      className="form-control-lg mb-3"
                    />
                    <p className="text-muted mt-2 mb-0">
                      <small>Supported formats: PDF, DOC, DOCX (Max size: 5MB)</small>
                    </p>
                    {file && (
                      <div className="alert alert-success mt-3 p-2 d-inline-flex align-items-center">
                        <FaFilePdf className="me-2" />
                        <strong>{file.name}</strong>
                        <span className="ms-2 text-muted">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      </div>
                    )}
                  </div>
                </Form.Group>
              </Form>
            </div>
          )}

          {!loading && resume && !isEditing && (
            <Card className="border-0 shadow" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
              <Card.Body className="text-center p-5">
                <div className="display-1 text-primary mb-4">
                  {getFileIcon(resume.filename)}
                </div>
                <h4 className="fw-bold mb-3">{resume.filename}</h4>
                <p className="text-muted mb-4">
                  <i className="far fa-clock me-1"></i>
                  Last updated: {new Date(resume.updatedAt || Date.now()).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Button 
                    variant="primary" 
                    className="d-flex align-items-center gap-2 px-4"
                    href={`http://localhost:4000${resume.filepath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaEye /> View Resume
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="d-flex align-items-center gap-2 px-4"
                    href={`http://localhost:4000${resume.filepath}`}
                    download
                  >
                    <FaUpload /> Download
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>

        <Modal.Footer 
          className="border-top"
          style={modalBackgroundStyle}
        >
          {!loading && resume && !isEditing && (
            <div className="d-flex justify-content-between w-100">
              <Button 
                variant="warning" 
                onClick={() => setIsEditing(true)}
                className="d-flex align-items-center gap-2 px-4"
              >
                <FaEdit /> Edit / Update
              </Button>
              <Button 
                variant="danger" 
                onClick={handleDelete}
                className="d-flex align-items-center gap-2 px-4"
              >
                <FaTrash /> Delete
              </Button>
            </div>
          )}

          {!loading && (isEditing || !resume) && (
            <Button
              variant="success"
              onClick={handleSave}
              disabled={!file || loading}
              className="px-4 d-flex align-items-center gap-2"
            >
              <FaUpload /> {loading ? "Saving..." : "Save Resume"}
            </Button>
          )}

          <Button variant="secondary" onClick={handleClose} disabled={loading}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ResumeModal;