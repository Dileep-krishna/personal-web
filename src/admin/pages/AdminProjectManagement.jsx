import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Badge, Modal, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminProjects() {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // State for add project form
  const [addProjects, setAddProjects] = useState({
    title: "",
    image: null,
    description: "",
    github: "",
    live: "",
    id: ""
  });

  // State for edit project form
  const [editProject, setEditProject] = useState({
    _id: "",
    title: "",
    image: null,
    description: "",
    github: "",
    live: "",
    id: "",
    existingImage: ""
  });

  const handleAddProject = async () => {
    if (!addProjects.title || !addProjects.description || !addProjects.image) {
      alert("Title, Description, and Image are required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", addProjects.title);
      formData.append("description", addProjects.description);
      formData.append("github", addProjects.github);
      formData.append("live", addProjects.live);
      formData.append("image", addProjects.image);
      formData.append("id", addProjects.id);

      const res = await axios.post(
        "http://localhost:4000/add-project",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Project added response data:", res.data);

      if (res.data) {
        alert("Project added successfully!");
        setProjects(prevProjects => [...prevProjects, res.data]);
      }

      setAddProjects({
        title: "",
        image: null,
        description: "",
        github: "",
        live: "",
        id: ""
      });

      handleClose();
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error.message);
      alert("Failed to add project");
    }
  };

  const [projects, setProjects] = useState([]);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllProject = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:4000/all-project?page=${pageNumber}&limit=${limit}`);

      console.log("FULL RES 👉", res);
      console.log("DATA 👉", res.data.data);
      console.log("SUCCESS 👉", res.data.success);

      if (res.data.success === true) {
        if (pageNumber === 1) {
          setProjects(res.data.data);
        } else {
          setProjects(prevProjects => [...prevProjects, ...res.data.data]);
        }
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", editProject.title);
      formData.append("description", editProject.description);
      formData.append("github", editProject.github);
      formData.append("live", editProject.live);
      formData.append("id", editProject.id);
      
      // Only append new image if it exists
      if (editProject.image) {
        formData.append("image", editProject.image);
      }

      // ========== FIXED ROUTE ==========
      const res = await axios.put(
        `http://localhost:4000/update/${editProject._id}`, // Changed from /update-project to /update
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data) {
        alert("Project updated successfully!");
        // Update the project in the state
        setProjects(prevProjects => 
          prevProjects.map(project => 
            project._id === editProject._id ? res.data : project
          )
        );
        handleClose2();
      }
    } catch (error) {
      console.error("Error updating project:", error.response?.data || error.message);
          console.error("Full error object:", error);
    console.error("Error response:", error.response);
    console.error("Error updating project:", error.response?.data || error.message);
    alert(`Failed to update project: ${error.response?.data || error.message}`);
      alert("Failed to update project");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // ========== FIXED ROUTE ==========
        const res = await axios.delete(`http://localhost:4000/delete/${id}`); // Changed from /delete-project to /delete
        
        if (res.status === 200) {
          alert("Project deleted successfully!");
          setProjects(prevProjects => prevProjects.filter(project => project._id !== id));
        }
      } catch (error) {
        console.error("Error deleting project:", error.response?.data || error.message);
        alert("Failed to delete project");
      }
    }
  };

  // Function to open edit modal with project data
  const openEditModal = (project) => {
    setEditProject({
      _id: project._id,
      title: project.title,
      description: project.description,
      github: project.github || "",
      live: project.live || "",
      id: project.id,
      existingImage: project.image
    });
    handleShow2();
  };

  useEffect(() => {
    getAllProject(1);
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <Container fluid>
        <div className="d-flex flex-column flex-lg-row">
          {/* LEFT ADMIN PANEL - Premium Redesign */}
          <div className="col-lg-3 pe-lg-4 mb-4">
            <div className="sticky-top pt-4" style={{ top: "20px" }}>
              <Card className="border-0 shadow-lg" style={{ 
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                      <div style={{
                        width: "80px",
                        height: "80px",
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 15px"
                      }}>
                        <i className="bi bi-shield-lock-fill text-white fs-3"></i>
                      </div>
                      <Badge bg="warning" className="position-absolute top-0 start-75 translate-middle" pill>Admin</Badge>
                    </div>
                    <h3 className="text-white fw-bold mt-2">Project Dashboard</h3>
                    <p className="text-light opacity-75">Manage your portfolio projects</p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleShow}
                    variant="primary"
                    className="w-100 mb-3"
                    style={{
                      background: "linear-gradient(45deg, #00b09b, #96c93d)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Project
                  </Button>

                  {/* Stats Card */}
                  <Card className="border-0 shadow mb-4" style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "15px"
                  }}>
                    <Card.Body>
                      <h5 className="text-dark fw-bold mb-3">
                        <i className="bi bi-graph-up me-2 text-primary"></i>
                        Dashboard Stats
                      </h5>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Total Projects</span>
                        <Badge bg="primary" pill className="fs-6 px-3 py-2">
                          {projects.length}
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Published</span>
                        <Badge bg="success" pill>
                          {projects.filter(p => p.status === "Published").length}
                        </Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Drafts</span>
                        <Badge bg="warning" pill>
                          {projects.filter(p => p.status !== "Published").length}
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>

                  <Link to="/" className="text-decoration-none">
                    <Button variant="outline-light" className="w-100" style={{
                      borderRadius: "10px",
                      padding: "12px",
                      borderWidth: "2px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255, 255, 255, 0.1)";
                      e.target.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.transform = "translateX(0)";
                    }}>
                      <i className="bi bi-arrow-left me-2"></i>
                      Back to Home
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          </div>

          {/* RIGHT PROJECT GRID - Premium Redesign */}
          <div className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="text-white fw-bold">Project Portfolio</h2>
                <p className="text-light opacity-75">Manage and organize your work</p>
              </div>
              <div className="d-flex">
                <Button variant="outline-light" className="me-2">
                  <i className="bi bi-filter me-1"></i> Filter
                </Button>
                <Button variant="outline-light">
                  <i className="bi bi-sort-down me-1"></i> Sort
                </Button>
              </div>
            </div>

            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="light" />
                <p className="text-light mt-2">Loading projects...</p>
              </div>
            )}

            {!loading && projects.length === 0 && (
              <Card className="border-0 shadow text-center" style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px"
              }}>
                <Card.Body className="py-5">
                  <i className="bi bi-folder-x text-light" style={{ fontSize: "4rem", opacity: 0.5 }}></i>
                  <h4 className="text-white mt-3">No Projects Found</h4>
                  <p className="text-light opacity-75">Add your first project to get started</p>
                  <Button variant="primary" onClick={handleShow}>
                    <i className="bi bi-plus-circle me-1"></i> Create Project
                  </Button>
                </Card.Body>
              </Card>
            )}

            <Row xs={1} md={2} lg={3} className="g-4">
              {projects.map((project) => (
                <Col key={project._id}>
                  <Card className="h-100 shadow border-0" style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    background: "rgba(255, 255, 255, 0.95)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.1)";
                  }}>
                    <div style={{ position: "relative" }}>
                      <Card.Img
                        src={`http://localhost:4000/imguploads/${project.image}`}
                        style={{ 
                          height: "200px", 
                          objectFit: "cover",
                          width: "100%"
                        }}
                      />
                      <Badge 
                        bg={project.status === "Published" ? "success" : "warning"}
                        className="position-absolute top-0 end-0 m-3"
                        style={{ 
                          borderRadius: "10px",
                          padding: "5px 15px",
                          fontSize: "0.9rem"
                        }}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    <Card.Body className="pb-0">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <Card.Title className="fw-bold text-dark" style={{ fontSize: "1.2rem" }}>
                          {project.title}
                        </Card.Title>
                      </div>
                      
                      <Card.Text className="text-muted mb-4" style={{
                        fontSize: "0.9rem",
                        lineHeight: "1.5",
                        maxHeight: "60px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {project.description}
                      </Card.Text>
                      
                      <div className="d-flex justify-content-between mt-auto">
                        <Button 
                          onClick={() => openEditModal(project)} 
                          variant="primary"
                          style={{
                            borderRadius: "8px",
                            padding: "8px 20px",
                            background: "linear-gradient(45deg, #667eea, #764ba2)",
                            border: "none"
                          }}
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </Button>
                        
                        <Button 
                          onClick={() => handleDelete(project._id)} 
                          variant="outline-danger"
                          style={{
                            borderRadius: "8px",
                            padding: "8px 20px",
                            borderWidth: "2px"
                          }}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                    
                    <Card.Footer className="text-center text-muted py-3" style={{
                      background: "rgba(0, 0, 0, 0.02)",
                      borderTop: "1px solid rgba(0, 0, 0, 0.1)"
                    }}>
                      <small className="d-flex align-items-center justify-content-center">
                        <i className="bi bi-hash me-1"></i>
                        Project ID: {project.id}
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-5">
                <nav>
                  <ul className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
                        <button 
                          className="page-link" 
                          onClick={() => getAllProject(pageNum)}
                          style={{
                            background: page === pageNum ? "linear-gradient(45deg, #667eea, #764ba2)" : "white",
                            border: "none",
                            color: page === pageNum ? "white" : "#333",
                            margin: "0 5px",
                            borderRadius: "8px",
                            padding: "8px 15px"
                          }}
                        >
                          {pageNum}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </Container>

      {/* Add Project Modal - Premium Redesign */}
      <Modal 
        show={show} 
        onHide={handleClose}
        centered
        dialogClassName="modal-premium"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ 
            background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "15px 15px 0 0",
            padding: "1.5rem 1.5rem 0.5rem"
          }}
        >
          <Modal.Title className="text-white">
            <i className="bi bi-plus-circle me-2"></i>
            Add New Project
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: addProjects.image ? "none" : "linear-gradient(45deg, #667eea, #764ba2)",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "3px solid #667eea"
            }}>
              {addProjects.image ? (
                <img
                  src={URL.createObjectURL(addProjects.image)}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <i className="bi bi-cloud-upload text-white fs-1"></i>
              )}
            </div>
            <Form.Group className="mt-3">
              <Form.Label className="btn btn-outline-primary btn-sm rounded-pill">
                <i className="bi bi-camera me-1"></i> Upload Image
                <Form.Control
                  onChange={(e) =>
                    setAddProjects({ ...addProjects, image: e.target.files[0] })
                  }
                  type="file"
                  accept="image/*,video/*"
                  className="d-none"
                />
              </Form.Label>
            </Form.Group>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Project Title</Form.Label>
              <Form.Control
                value={addProjects.title}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, title: e.target.value })
                }
                type="text"
                placeholder="Enter project title"
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa"
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Description</Form.Label>
              <Form.Control
                value={addProjects.description}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, description: e.target.value })
                }
                as="textarea"
                rows={3}
                placeholder="Describe your project..."
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa",
                  resize: "none"
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-dark">
                    <i className="bi bi-github me-1"></i> GitHub
                  </Form.Label>
                  <Form.Control
                    value={addProjects.github}
                    onChange={(e) =>
                      setAddProjects({ ...addProjects, github: e.target.value })
                    }
                    type="text"
                    placeholder="GitHub repository link"
                    className="border-0 shadow-sm"
                    style={{ 
                      borderRadius: "10px",
                      padding: "12px",
                      background: "#f8f9fa"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-dark">
                    <i className="bi bi-globe me-1"></i> Live Demo
                  </Form.Label>
                  <Form.Control
                    value={addProjects.live}
                    onChange={(e) =>
                      setAddProjects({ ...addProjects, live: e.target.value })
                    }
                    type="text"
                    placeholder="Live project URL"
                    className="border-0 shadow-sm"
                    style={{ 
                      borderRadius: "10px",
                      padding: "12px",
                      background: "#f8f9fa"
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Project ID</Form.Label>
              <Form.Control
                value={addProjects.id}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, id: e.target.value })
                }
                type="text"
                placeholder="Enter unique project ID"
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa"
                }}
              />
              <Form.Text className="text-muted">
                Use a unique identifier for this project
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose}
            style={{
              borderRadius: "10px",
              padding: "10px 25px",
              borderWidth: "2px"
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleAddProject}
            style={{
              background: "linear-gradient(45deg, #00b09b, #96c93d)",
              border: "none",
              borderRadius: "10px",
              padding: "10px 30px",
              fontWeight: "600"
            }}
          >
            <i className="bi bi-check-circle me-1"></i>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Project Modal */}
      <Modal 
        show={show2} 
        onHide={handleClose2}
        centered
        dialogClassName="modal-premium"
      >
        <Modal.Header 
          closeButton 
          className="border-0 pb-0"
          style={{ 
            background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
            borderRadius: "15px 15px 0 0",
            padding: "1.5rem 1.5rem 0.5rem"
          }}
        >
          <Modal.Title className="text-white">
            <i className="bi bi-pencil-square me-2"></i>
            Edit Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: editProject.image ? "none" : "linear-gradient(45deg, #ff7e5f, #feb47b)",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "3px solid #ff7e5f"
            }}>
              {editProject.image ? (
                <img
                  src={URL.createObjectURL(editProject.image)}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : editProject.existingImage ? (
                <img
                  src={`http://localhost:4000/imguploads/${editProject.existingImage}`}
                  alt="Current"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <i className="bi bi-image text-white fs-1"></i>
              )}
            </div>
            <Form.Group className="mt-3">
              <Form.Label className="btn btn-outline-warning btn-sm rounded-pill">
                <i className="bi bi-camera me-1"></i> Change Image
                <Form.Control
                  onChange={(e) =>
                    setEditProject({ ...editProject, image: e.target.files[0] })
                  }
                  type="file"
                  accept="image/*"
                  className="d-none"
                />
              </Form.Label>
            </Form.Group>
          </div>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Project Title</Form.Label>
              <Form.Control
                value={editProject.title}
                onChange={(e) =>
                  setEditProject({ ...editProject, title: e.target.value })
                }
                type="text"
                placeholder="Enter project title"
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa"
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Description</Form.Label>
              <Form.Control
                value={editProject.description}
                onChange={(e) =>
                  setEditProject({ ...editProject, description: e.target.value })
                }
                as="textarea"
                rows={3}
                placeholder="Describe your project..."
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa",
                  resize: "none"
                }}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-dark">
                    <i className="bi bi-github me-1"></i> GitHub
                  </Form.Label>
                  <Form.Control
                    value={editProject.github}
                    onChange={(e) =>
                      setEditProject({ ...editProject, github: e.target.value })
                    }
                    type="text"
                    placeholder="GitHub repository link"
                    className="border-0 shadow-sm"
                    style={{ 
                      borderRadius: "10px",
                      padding: "12px",
                      background: "#f8f9fa"
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold text-dark">
                    <i className="bi bi-globe me-1"></i> Live Demo
                  </Form.Label>
                  <Form.Control
                    value={editProject.live}
                    onChange={(e) =>
                      setEditProject({ ...editProject, live: e.target.value })
                    }
                    type="text"
                    placeholder="Live project URL"
                    className="border-0 shadow-sm"
                    style={{ 
                      borderRadius: "10px",
                      padding: "12px",
                      background: "#f8f9fa"
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold text-dark">Project ID</Form.Label>
              <Form.Control
                value={editProject.id}
                onChange={(e) =>
                  setEditProject({ ...editProject, id: e.target.value })
                }
                type="text"
                placeholder="Enter unique project ID"
                className="border-0 shadow-sm"
                style={{ 
                  borderRadius: "10px",
                  padding: "12px",
                  background: "#f8f9fa"
                }}
              />
              <Form.Text className="text-muted">
                Use a unique identifier for this project
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button 
            variant="outline-secondary" 
            onClick={handleClose2}
            style={{
              borderRadius: "10px",
              padding: "10px 25px",
              borderWidth: "2px"
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="warning"
            onClick={handleEdit}
            style={{
              background: "linear-gradient(45deg, #ff7e5f, #feb47b)",
              border: "none",
              borderRadius: "10px",
              padding: "10px 30px",
              fontWeight: "600",
              color: "white"
            }}
          >
            <i className="bi bi-check-circle me-1"></i>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminProjects;