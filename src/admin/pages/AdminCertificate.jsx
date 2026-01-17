import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Spinner, Container, Alert, Badge } from "react-bootstrap";
import {
  addCertificateAPI,
  getAllCertificatesAPI,
  deleteCertificateAPI,
} from "../../services/allAPI";
import SERVERURL from "../../services/serverUrl";
import { FaTrash, FaEye, FaUpload, FaCertificate, FaFilePdf, FaImage } from "react-icons/fa";

function AdminCertificate() {
  const [certificates, setCertificates] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fix file URL to full absolute path
  function getFullFileUrl(fileUrl) {
    if (!fileUrl) return "";
    const fixedUrl = fileUrl
      .replace(/^Imguploads/i, "imguploads")
      .replace(/\\/g, "/")
      .replace(/ /g, "%20");
    return `${SERVERURL}/${fixedUrl}`;
  }

  /* ================= FETCH CERTIFICATES ================= */
  const fetchCertificates = async () => {
    try {
      const response = await getAllCertificatesAPI();
      console.log("Fetch certificates response:", response);

      if (Array.isArray(response)) {
        // Backend returns array directly
        setCertificates(response);
        console.log("Certificates state set:", response);
      } else if (response?.success && Array.isArray(response.data)) {
        // Backend returns wrapped response
        setCertificates(response.data);
        console.log("Certificates state set:", response.data);
      } else {
        console.warn("Fetch failed or unexpected format:", response);
        setCertificates([]);
      }
    } catch (error) {
      console.error("Fetch certificates error:", error);
      setCertificates([]);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  /* ================= UPLOAD ================= */
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !file) {
      alert("Please provide both title and file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await addCertificateAPI(formData);
      console.log("Upload response:", response);

      if (response?.success) {
        setCertificates((prev) => [response.data, ...prev]);
        setTitle("");
        setFile(null);
      } else {
        alert("Upload failed. See console for details.");
        console.warn("Unexpected upload response:", response);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      const response = await deleteCertificateAPI(id);
      console.log("Delete response:", response);

      if (response?.success) {
        setCertificates((prev) => prev.filter((c) => c._id !== id));
        alert("Deleted successfully");
      } else {
        alert("Delete failed. See console.");
        console.warn("Unexpected delete response:", response);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete error. See console.");
    }
  };

  return (
    <Container className="py-4">
      {/* Header Section */}
      <div className="mb-4">
        <h2 className="fw-bold text-primary d-flex align-items-center">
          <FaCertificate className="me-3" />
          Certificate Management
        </h2>
        <p className="text-muted">Manage your professional certificates and achievements</p>
      </div>

      {/* Upload Form Card */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-light">
          <h5 className="mb-0 d-flex align-items-center">
            <FaUpload className="me-2" />
            Upload New Certificate
          </h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpload}>
            <Row className="g-3 align-items-end">
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Certificate Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter certificate title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="fw-semibold">Certificate File</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="py-2"
                  />
                  <Form.Text className="text-muted">
                    Supports: Images (JPG, PNG) and PDF files
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-100 py-2"
                  variant="primary"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" animation="border" className="me-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload className="me-2" />
                      Upload
                    </>
                  )}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Stats Card */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-3">
          <Row className="text-center">
            <Col md={4}>
              <div className="p-3">
                <h3 className="fw-bold text-primary">{certificates.length}</h3>
                <p className="text-muted mb-0">Total Certificates</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3">
                <h3 className="fw-bold text-success">
                  {certificates.filter(c => c.fileType.startsWith('image')).length}
                </h3>
                <p className="text-muted mb-0">Image Files</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3">
                <h3 className="fw-bold text-danger">
                  {certificates.filter(c => c.fileType.includes('pdf')).length}
                </h3>
                <p className="text-muted mb-0">PDF Files</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Certificates Grid */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          Your Certificates <Badge bg="secondary" className="ms-2">{certificates.length}</Badge>
        </h5>
      </div>

      {certificates.length === 0 ? (
        <Alert variant="info" className="text-center py-4">
          <div className="display-4 mb-3">📄</div>
          <h5>No certificates uploaded yet</h5>
          <p className="mb-0">Start by uploading your first certificate using the form above.</p>
        </Alert>
      ) : (
        <Row className="g-4">
          {certificates.map((cert) => {
            const fullUrl = getFullFileUrl(cert.fileUrl);
            const isImage = cert.fileType.startsWith("image");
            const isPDF = cert.fileType.includes("pdf");

            return (
              <Col key={cert._id} md={4} lg={3}>
                <Card className="shadow-sm border h-100">
                  <div className="position-relative">
                    {isImage ? (
                      <Card.Img
                        variant="top"
                        src={fullUrl}
                        style={{ height: "180px", objectFit: "cover" }}
                        alt={cert.title}
                        onError={(e) => {
                          console.error("Image load failed:", fullUrl);
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `
                            <div class="text-center py-5 bg-light">
                              <FaImage className="text-muted mb-2" size={40} />
                              <p class="text-muted small">Image not available</p>
                            </div>
                          `;
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center justify-content-center bg-light"
                        style={{ height: "180px" }}
                      >
                        <FaFilePdf size={60} className="text-danger mb-2" />
                        <span className="text-muted small">PDF Document</span>
                      </div>
                    )}
                    <Badge
                      bg={isImage ? "success" : "danger"}
                      className="position-absolute top-0 end-0 m-2"
                    >
                      {isImage ? "IMG" : "PDF"}
                    </Badge>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title
                      className="fw-semibold mb-2"
                      style={{ fontSize: "0.95rem" }}
                      title={cert.title}
                    >
                      {cert.title.length > 50 ? cert.title.substring(0, 50) + "..." : cert.title}
                    </Card.Title>
                    <div className="mt-auto">
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="flex-grow-1 d-flex align-items-center justify-content-center"
                          href={fullUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaEye className="me-2" />
                          View
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(cert._id)}
                          className="d-flex align-items-center justify-content-center"
                          style={{ width: "40px" }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>

                  <Card.Footer className="bg-transparent border-top">
                    <small className="text-muted">
                      Uploaded: {new Date(cert.createdAt || Date.now()).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-top">
        <p className="text-muted small">
          <strong>Note:</strong> All certificates are stored securely. You can upload images (JPG, PNG) and PDF files.
          Maximum file size is 5MB.
        </p>
      </div>
    </Container>
  );
}

export default AdminCertificate;