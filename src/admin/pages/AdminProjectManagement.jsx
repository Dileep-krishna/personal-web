import React, { useEffect, useState } from "react";
import { Button, Card, Row, Col, Container, Badge, Modal, Form } from "react-bootstrap";
import { Await, Link } from "react-router-dom";

import axios from "axios"; // You can remove if using addProjectAPI instead
import { getProjectAPI } from "../../services/allAPI";

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
    id:""
  });

  // Add Project handler
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

      // Using axios directly; replace with addProjectAPI(formData) if you want
      const res = await axios.post("http://localhost:4000/add-project", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Project added:", res.data);
      alert("Project added successfully!");

      // Reset form and close modal
      setAddProjects({
        title: "",
        image: null,
        description: "",
        github: "",
        live: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding project:", error.response?.data || error.message);
      alert("Failed to add project");
    }
  };
  const [projectss, setProjectss] = useState([]);


const getAllProject = async () => {
  try {
    const result = await getProjectAPI();
    console.log(result);

    if (result.status === 200) {
      setProjectss(result.data);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(()=>{
   getAllProject()
    
},[])

  const projects = [
    {
      id: 1,
      title: "Gamers-Connect",
      image:
        "https://marketplace.canva.com/EAE-rfspHQM/1/0/1600w/canva-blue-and-purple-cyberpunk-game-zone-desktop-background-QUVVB5lzUWo.jpg",
      status: "Published",
    },
    {
      id: 2,
      title: "Bookstore",
      image:
        "https://mir-s3-cdn-cf.behance.net/project_modules/1400/ac0719152551919.63218886992b6.gif",
      status: "Draft",
    },
  ];

  return (
    <div
      style={{
        backgroundImage:
          "url(https://wallpapers.com/images/high/gray-best-laptop-beside-iphone-aav9zfw3u9lzah0n.webp)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <Container fluid>
        <div className="d-flex flex-column flex-lg-row">
          {/* LEFT ADMIN PANEL */}
          <div className="col-lg-3 pe-lg-4 mb-4">
            <div className="sticky-top pt-4" style={{ top: "20px" }}>
              <h2 className="text-warning fw-bold">Admin Panel</h2>
              <p className="text-light">Manage all projects</p>

              <Button
                type="button"
                onClick={handleShow}
                variant="success"
                className="w-100 mb-4"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Project
              </Button>

              <div className="text-light mb-4">
                <h5 className="text-warning">Stats</h5>
                <p>
                  Total Projects: <strong>{projects.length}</strong>
                </p>
                <p>
                  Published: <strong className="text-success">1</strong>
                </p>
                <p>
                  Drafts: <strong className="text-warning">1</strong>
                </p>
              </div>

              <Link to="/" className="text-decoration-none">
                <Button variant="danger" className="w-100">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
{/*here */}
          {/* RIGHT PROJECT GRID */}
          <div className="col-lg-9">
            <Row xs={1} md={2} className="g-4">
              {projects.map((project) => (
                <Col key={project.id}>
                  <Card className="h-100 shadow border-0">
                    <Card.Img
                      src={project.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />

                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Title>{project.title}</Card.Title>
                        <Badge
                          bg={project.status === "Published" ? "success" : "warning"}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <Button onClick={handleShow2} variant="primary">
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </Button>

                        <Button variant="danger">
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>

                    <Card.Footer className="text-center text-muted">
                      Project ID: {project.id}
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>

      {/* Add Project Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="projectTitle">
              <Form.Control
                value={addProjects.title}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, title: e.target.value })
                }
                type="text"
                placeholder="Title"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectDescription">
              <Form.Control
                value={addProjects.description}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, description: e.target.value })
                }
                as="textarea"
                rows={3}
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="githubLink">
              <Form.Control
                value={addProjects.github}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, github: e.target.value })
                }
                type="text"
                placeholder="GitHub Link"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="liveLink">
              <Form.Control
                value={addProjects.live}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, live: e.target.value })
                }
                type="text"
                placeholder="Live Link"
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="id">
              <Form.Control
                value={addProjects.id}
                onChange={(e) =>
                  setAddProjects({ ...addProjects, id: e.target.value })
                }
                type="text"
                placeholder="enter project id number"
              />
            </Form.Group>

            <div className="text-center mb-3">
              {/* Preview image if file selected */}
              {addProjects.image ? (
                <img
                  src={URL.createObjectURL(addProjects.image)}
                  alt="Preview"
                  className="rounded-circle mb-2"
                  width={120}
                  height={120}
                />
              ) : (
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#ddd",
                    marginBottom: 8,
                    display: "inline-block",
                  }}
                />
              )}
              <div>
                <Form.Control
                  onChange={(e) =>
                    setAddProjects({ ...addProjects, image: e.target.files[0] })
                  }
                  type="file"
                  accept="image/*,video/*"
                />
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              handleAddProject();
            }}
          >
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Project Modal (unchanged) */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="projectTitle">
              <Form.Control type="text" placeholder="Title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="projectDescription">
              <Form.Control as="textarea" rows={3} placeholder="Description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="githubLink">
              <Form.Control type="text" placeholder="GitHub Link" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="liveLink">
              <Form.Control type="text" placeholder="Live Link" />
            </Form.Group>

            <div className="text-center mb-3">
              <img
                src=""
                alt="Admin Avatar"
                className="rounded-circle mb-2"
                width={120}
                height={120}
              />
              <div>
                <Form.Control type="file" />
              </div>
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>

          <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminProjects;
